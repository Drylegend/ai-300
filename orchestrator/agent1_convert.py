"""
Agent 1: Normalize & Convert.
Preserves .docx files in their native .docx format without converting to HTML or Markdown.
Markdown/text files pass through cleaned.
Image assets are validated and copied safely.
Works strictly inside a staging directory without mutating originals.
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
        Normalizes and stages source_path into the staging directory with canonical_name.
        Returns the path to the staged file.

        For .docx inputs: preserves native .docx format (canonical_name ends in .docx).
        For .md/.txt inputs: canonical_name ends in .md.
        """
        if not source_path.exists():
            raise ConversionError(f"Source file does not exist: {source_path}")

        ext = source_path.suffix.lower()
        log_agent("Agent 1", f"Processing: {source_path.name} (type: {ext}) -> {canonical_name}")

        dest_path = self.staging_dir / canonical_name

        if ext == ".docx":
            # Preserve native docx format
            self._validate_docx(source_path)
            shutil.copy2(source_path, dest_path)
        elif ext == ".doc":
            raise ConversionError(
                f"Binary .doc file '{source_path.name}' is not supported. "
                "Please save/export the file as .docx and try again."
            )
        elif ext in {".md", ".txt"}:
            content = source_path.read_text(encoding="utf-8", errors="replace")
            cleaned = self._clean_markdown_text(content)
            dest_path.write_text(cleaned, encoding="utf-8")
        elif ext in IMAGE_EXTENSIONS:
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

    def _validate_docx(self, path: Path):
        """Validate that a .docx file is a readable Word document."""
        try:
            import docx
            doc = docx.Document(path)
            # Basic sanity check
            _ = len(doc.paragraphs)
        except Exception as e:
            raise ConversionError(f"Failed to read docx file '{path.name}': {e}")

    def _clean_markdown_text(self, text: str) -> str:
        """Clean up markdown/text content: normalize newlines, collapse blanks."""
        text = text.replace("\r\n", "\n").replace("\r", "\n")
        text = re.sub(r"\n{3,}", "\n\n", text)
        return text.strip() + "\n"

    def _validate_image(self, path: Path):
        """Validate that an image file is not corrupted."""
        ext = path.suffix.lower()
        if ext == ".svg":
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
