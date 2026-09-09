"""
Agent 4: Validation.
Validates file existence, non-emptiness, format correctness (JSON, Markdown, Image),
cross-checks folder integrity, and outputs a formatted pass/fail terminal report.
"""

import json
import re
from pathlib import Path
from typing import List, Dict, Any, Tuple
from orchestrator.config import IMAGE_EXTENSIONS
from orchestrator.logger import log_agent, log_error, get_logger


class ValidationResult:
    def __init__(self):
        self.items: List[Tuple[Path, bool, str]] = []

    def add(self, path: Path, passed: bool, message: str):
        self.items.append((path, passed, message))

    @property
    def all_passed(self) -> bool:
        return all(passed for _, passed, _ in self.items)

    @property
    def passed_count(self) -> int:
        return sum(1 for _, passed, _ in self.items if passed)

    @property
    def failed_count(self) -> int:
        return sum(1 for _, passed, _ in self.items if not passed)


class Agent4Validation:
    """Agent 4 implementation."""

    def validate_plan(
        self,
        expected_files: List[Path],
        day_number: int = None,
        platform: str = None,
        lab_id: str = None,
    ) -> ValidationResult:
        """
        Validates all expected files and runs cross-checks.
        """
        result = ValidationResult()
        log_agent("Agent 4", f"Starting validation on {len(expected_files)} files...")

        for file_path in expected_files:
            self._validate_single_file(file_path, result)

        # Cross-checks
        if day_number is not None:
            self._cross_check_day(day_number, result)

        if platform and lab_id:
            self._cross_check_lab(platform, lab_id, result)

        self._print_report(result)
        return result

    def _validate_single_file(self, path: Path, result: ValidationResult):
        # 1. Existence check
        if not path.exists():
            result.add(path, False, "File does not exist")
            return

        # 2. Non-empty check
        try:
            size = path.stat().st_size
            if size == 0:
                result.add(path, False, "File is empty (0 bytes)")
                return
        except Exception as e:
            result.add(path, False, f"Could not check file size: {e}")
            return

        ext = path.suffix.lower()

        # 3. docx check
        if ext == ".docx":
            try:
                import docx
                doc = docx.Document(path)
                result.add(path, True, f"Valid Word document ({len(doc.paragraphs)} paragraphs, {size} bytes)")
            except Exception as e:
                result.add(path, False, f"Invalid or corrupted docx: {e}")
            return

        # 4. JSON check
        if ext == ".json":
            try:
                data = json.loads(path.read_text(encoding="utf-8"))
                if path.name == "meta.json":
                    if isinstance(data, dict) and ("day" in data or "id" in data):
                        result.add(path, True, f"Valid JSON metadata ({size} bytes)")
                    else:
                        result.add(path, False, "meta.json missing 'day' or 'id' key")
                elif path.name == "links.json":
                    if isinstance(data, list):
                        result.add(path, True, f"Valid links JSON with {len(data)} items")
                    else:
                        result.add(path, False, "links.json root must be a list")
                else:
                    result.add(path, True, f"Valid JSON ({size} bytes)")
            except Exception as e:
                result.add(path, False, f"Invalid JSON syntax: {e}")
            return

        # 5. Markdown check
        if ext in {".md", ".txt"}:
            try:
                text = path.read_text(encoding="utf-8")
                if not text.strip():
                    result.add(path, False, "Markdown content contains only whitespace")
                else:
                    lines = text.strip().splitlines()
                    result.add(path, True, f"Valid Markdown ({len(lines)} lines, {size} bytes)")
            except UnicodeDecodeError:
                result.add(path, False, "File is not valid UTF-8 text")
            except Exception as e:
                result.add(path, False, f"Error reading Markdown: {e}")
            return

        # 6. HTML check
        if ext == ".html":
            try:
                text = path.read_text(encoding="utf-8")
                if not text.strip():
                    result.add(path, False, "HTML content contains only whitespace")
                elif "<" not in text:
                    result.add(path, False, "HTML file contains no tags")
                else:
                    result.add(path, True, f"Valid HTML ({size} bytes)")
            except UnicodeDecodeError:
                result.add(path, False, "File is not valid UTF-8 text")
            except Exception as e:
                result.add(path, False, f"Error reading HTML: {e}")
            return

        # 7. Image check
        if ext in IMAGE_EXTENSIONS:
            if ext == ".svg":
                try:
                    svg_content = path.read_text(encoding="utf-8", errors="ignore")
                    if "<svg" in svg_content.lower():
                        result.add(path, True, f"Valid SVG vector graphic ({size} bytes)")
                    else:
                        result.add(path, False, "SVG missing <svg> root element")
                except Exception as e:
                    result.add(path, False, f"Error reading SVG: {e}")
            else:
                try:
                    from PIL import Image
                    with Image.open(path) as img:
                        img.verify()
                    result.add(path, True, f"Valid image asset ({size} bytes)")
                except Exception as e:
                    result.add(path, False, f"Invalid or corrupted image: {e}")
            return

        # Fallback
        result.add(path, True, f"File verified ({size} bytes)")

    def _cross_check_day(self, day_number: int, result: ValidationResult):
        from orchestrator.config import DAYS_DIR
        day_dir = DAYS_DIR / f"day-{day_number:02d}"
        if not day_dir.exists():
            return

        meta_file = day_dir / "meta.json"
        if meta_file.exists():
            try:
                data = json.loads(meta_file.read_text(encoding="utf-8"))
                if data.get("day") != day_number:
                    result.add(
                        meta_file,
                        False,
                        f"Day mismatch: meta.json specifies day={data.get('day')}, but folder is day-{day_number:02d}",
                    )
            except Exception:
                pass

        # Check transcripts sequential numbering
        transcripts_dir = day_dir / "transcripts"
        if transcripts_dir.exists():
            indices = []
            for f in transcripts_dir.iterdir():
                m = re.match(r"^transcript-(\d+)\.(docx|md|html)$", f.name)
                if m:
                    indices.append(int(m.group(1)))
            if indices:
                indices.sort()
                expected = list(range(1, max(indices) + 1))
                if indices != expected:
                    missing = set(expected) - set(indices)
                    result.add(
                        transcripts_dir,
                        False,
                        f"Transcript numbering has gaps: missing transcript-{list(missing)}",
                    )
                else:
                    result.add(
                        transcripts_dir,
                        True,
                        f"All {len(indices)} transcripts sequentially ordered (1..{max(indices)})",
                    )

    def _cross_check_lab(self, platform: str, lab_id: str, result: ValidationResult):
        from orchestrator.config import LABS_DIR
        lab_dir = LABS_DIR / platform / lab_id
        meta_file = lab_dir / "meta.json"
        if meta_file.exists():
            try:
                data = json.loads(meta_file.read_text(encoding="utf-8"))
                if data.get("id") != lab_id:
                    result.add(
                        meta_file,
                        False,
                        f"Lab ID mismatch: meta.json specifies '{data.get('id')}', folder is '{lab_id}'",
                    )
                if data.get("platform") != platform:
                    result.add(
                        meta_file,
                        False,
                        f"Platform mismatch: meta.json specifies '{data.get('platform')}', folder is '{platform}'",
                    )
            except Exception:
                pass

    def _print_report(self, result: ValidationResult):
        lines = [
            "",
            "=" * 64,
            "AGENT 4: VALIDATION REPORT",
            "=" * 64,
        ]

        for path, passed, msg in result.items:
            # Display relative path for brevity
            try:
                from orchestrator.config import WORKSPACE_ROOT
                display_path = path.relative_to(WORKSPACE_ROOT)
            except Exception:
                display_path = path.name

            status = "[PASS]" if passed else "[FAIL]"
            lines.append(f"{status:<7} {str(display_path):<40} {msg}")

        lines.append("=" * 64)
        if result.all_passed:
            lines.append(f"Result: ALL CHECKS PASSED ({result.passed_count}/{len(result.items)})")
        else:
            lines.append(
                f"Result: VALIDATION FAILED ({result.failed_count} failures out of {len(result.items)} checks)"
            )
            lines.append("Halted before Git Push: resolve issues above before committing.")
        lines.append("=" * 64 + "\n")

        report_text = "\n".join(lines)
        print(report_text)
        logger = get_logger()
        logger.info(report_text)
