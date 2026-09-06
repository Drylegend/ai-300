"""
Agent 1: Normalize & Convert.
Converts raw files (.docx, .doc, .md, .txt) to clean Markdown,
handles image assets safely, renames to canonical filenames,
and works strictly inside a staging directory without mutating originals.
"""

import shutil
import uuid
import re
from pathlib import Path
from typing import Optional
from orchestrator.config import STAGING_DIR, DOC_EXTENSIONS, IMAGE_EXTENSIONS
from orchestrator.logger import log_agent, log_warn, log_error


class ConversionError(Exception):
    """Raised when file conversion fails or file type is unsupported."""
    pass


class Agent1NormalizeConvert:
    """Agent 1 implementation."""

    def __init__(self, run_id: Optional[str] = None):
        self.run_id = run_id or uuid.uuid4().hex[:8]
        self.staging_dir = STAGING_DIR / f"run_{self.run_id}"
        self.staging_dir.mkdir(parents=True, exist_ok=True)
        log_agent("Agent 1", f"Staging directory initialized at: {self.staging_dir}")

    def process_file(self, source_path: Path, canonical_name: str) -> Path:
        """
        Normalizes and converts source_path into the staging directory with canonical_name.
        Returns the path to the staged, normalized file.
        """
        if not source_path.exists():
            raise ConversionError(f"Source file does not exist: {source_path}")

        ext = source_path.suffix.lower()
        log_agent("Agent 1", f"Processing: {source_path.name} (type: {ext}) -> {canonical_name}")

        # Staging target
        dest_path = self.staging_dir / canonical_name

        if ext in {".docx", ".doc"}:
            md_content = self.convert_docx_to_markdown(source_path)
            dest_path.write_text(md_content, encoding="utf-8")
        elif ext in {".md", ".txt"}:
            content = source_path.read_text(encoding="utf-8", errors="replace")
            cleaned = self._clean_markdown_text(content)
            dest_path.write_text(cleaned, encoding="utf-8")
        elif ext in IMAGE_EXTENSIONS:
            # Preserve original image extension for doodle files
            actual_canonical = canonical_name
            if actual_canonical.startswith("doodle"):
                actual_canonical = f"doodle{ext}"
                dest_path = self.staging_dir / actual_canonical
            shutil.copy2(source_path, dest_path)
            self._validate_image(dest_path)
        else:
            raise ConversionError(
                f"Unsupported file extension '{ext}'. Expected one of: "
                f"{', '.join(sorted(DOC_EXTENSIONS | IMAGE_EXTENSIONS))}"
            )

        log_agent("Agent 1", f"Normalized to staging: {dest_path.name} ({dest_path.stat().st_size} bytes)")
        return dest_path

    def convert_docx_to_markdown(self, docx_path: Path) -> str:
        """Converts .docx to clean Markdown preserving headings, lists, bold/italic, and tables."""
        try:
            from docx import Document
        except ImportError:
            raise ConversionError("python-docx is not installed. Please install it with 'pip install python-docx'.")

        try:
            doc = Document(str(docx_path))
        except Exception as e:
            # Check if it was an older binary .doc format
            if docx_path.suffix.lower() == ".doc":
                raise ConversionError(
                    f"Could not parse binary .doc file '{docx_path.name}'. "
                    "Please save/export the file as .docx or .md and try again."
                )
            raise ConversionError(f"Failed to parse docx file '{docx_path.name}': {e}")

        md_blocks = []

        # Iterate body elements in document order
        for element in doc.element.body:
            tag = element.tag.split("}")[-1] if "}" in element.tag else element.tag
            if tag == "p":
                # Find matching paragraph
                p = self._find_paragraph_by_element(doc, element)
                if p:
                    rendered_p = self._render_paragraph(p)
                    if rendered_p.strip():
                        md_blocks.append(rendered_p)
            elif tag == "tbl":
                table = self._find_table_by_element(doc, element)
                if table:
                    rendered_tbl = self._render_table(table)
                    if rendered_tbl.strip():
                        md_blocks.append(rendered_tbl)

        result = "\n\n".join(md_blocks) + "\n"
        return self._clean_markdown_text(result)

    def _find_paragraph_by_element(self, doc, element):
        for p in doc.paragraphs:
            if p._p == element:
                return p
        return None

    def _find_table_by_element(self, doc, element):
        for t in doc.tables:
            if t._tbl == element:
                return t
        return None

    def _render_paragraph(self, paragraph) -> str:
        text = ""
        for run in paragraph.runs:
            run_text = run.text
            if not run_text:
                continue

            # If formatted, keep leading and trailing whitespace outside markup
            if (run.bold or run.italic) and run_text.strip():
                leading_ws = run_text[: len(run_text) - len(run_text.lstrip())]
                trailing_ws = run_text[len(run_text.rstrip()) :]
                core = run_text.strip()

                if run.bold and run.italic:
                    core = f"***{core}***"
                elif run.bold:
                    core = f"**{core}**"
                elif run.italic:
                    core = f"*{core}*"

                run_text = f"{leading_ws}{core}{trailing_ws}"

            text += run_text

        text = text.strip()
        if not text:
            return ""

        style_name = (paragraph.style.name or "").lower()

        # Headings
        if "heading 1" in style_name:
            return f"# {text}"
        elif "heading 2" in style_name:
            return f"## {text}"
        elif "heading 3" in style_name:
            return f"### {text}"
        elif "heading 4" in style_name:
            return f"#### {text}"
        elif "heading 5" in style_name:
            return f"##### {text}"
        elif "heading 6" in style_name:
            return f"###### {text}"
        elif "list bullet" in style_name or "bullet" in style_name:
            return f"- {text}"
        elif "list number" in style_name or "number" in style_name:
            return f"1. {text}"

        return text

    def _render_table(self, table) -> str:
        rows_data = []
        for row in table.rows:
            row_cells = [cell.text.replace("\n", " ").strip() for cell in row.cells]
            rows_data.append(row_cells)

        if not rows_data:
            return ""

        col_count = max(len(r) for r in rows_data)
        lines = []

        # Header row
        header = rows_data[0] + [""] * (col_count - len(rows_data[0]))
        lines.append("| " + " | ".join(header) + " |")
        lines.append("| " + " | ".join(["---"] * col_count) + " |")

        # Body rows
        for row in rows_data[1:]:
            padded = row + [""] * (col_count - len(row))
            lines.append("| " + " | ".join(padded) + " |")

        return "\n".join(lines)

    def _clean_markdown_text(self, text: str) -> str:
        # Standardize newlines
        text = text.replace("\r\n", "\n").replace("\r", "\n")
        # Collapse 3+ consecutive newlines to 2
        text = re.sub(r"\n{3,}", "\n\n", text)
        return text.strip() + "\n"

    def _validate_image(self, path: Path):
        ext = path.suffix.lower()
        if ext == ".svg":
            # Simple SVG sanity check
            content = path.read_text(encoding="utf-8", errors="ignore")
            if "<svg" not in content.lower():
                raise ConversionError(f"SVG image file '{path.name}' is invalid or corrupted.")
            return

        try:
            from PIL import Image
            with Image.open(path) as img:
                img.verify()
        except Exception as e:
            raise ConversionError(f"Image verification failed for '{path.name}': {e}")

    def cleanup_staging(self):
        """Cleans up temporary staging folder."""
        try:
            if self.staging_dir.exists():
                shutil.rmtree(self.staging_dir, ignore_errors=True)
                log_agent("Agent 1", f"Staging directory removed: {self.staging_dir.name}")
        except Exception as e:
            log_warn(f"Failed to remove staging directory: {e}")
