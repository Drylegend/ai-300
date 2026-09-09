"""
Agent 2: Placement.
Moves normalized files from staging into the canonical project folder structure,
creates or updates meta.json, and refuses to silently overwrite existing files.
"""

import json
import shutil
import re
from pathlib import Path
from typing import Optional, List, Dict, Any, Set
from orchestrator.config import DAYS_DIR, LABS_DIR
from orchestrator.logger import log_agent, log_warn, log_success


class Agent2Placement:
    """Agent 2 implementation."""

    def __init__(self):
        self.touched_files: Set[Path] = set()

    def place_day_file(
        self,
        staged_file: Path,
        day_number: int,
        slot_type: str,
        transcript_index: Optional[int] = None,
    ) -> Optional[Path]:
        """
        Places a staged file into content/days/day-XX/.
        slot_type: 'transcript', 'summary'
        """
        day_folder_name = f"day-{day_number:02d}"
        day_dir = DAYS_DIR / day_folder_name

        # Determine the file extension from the staged file
        ext = staged_file.suffix.lower()  # .md or .html

        if slot_type == "transcript":
            idx = transcript_index or 1
            target_dir = day_dir / "transcripts"
            target_file = target_dir / f"transcript-{idx}{ext}"
        elif slot_type == "summary":
            target_dir = day_dir
            target_file = target_dir / f"summary{ext}"
        else:
            target_dir = day_dir
            target_file = target_dir / staged_file.name

        placed = self._move_with_confirmation(staged_file, target_file)

        # If this is an HTML file, also copy the images/ subfolder from staging
        if placed and ext == ".html":
            self._copy_images_from_staging(staged_file.parent, target_file.parent)

        return placed

    def place_lab_file(
        self,
        staged_file: Path,
        platform: str,
        lab_id: str,
        slot_type: str,
    ) -> Optional[Path]:
        """
        Places a staged file into content/labs/<platform>/<lab_id>/.
        slot_type: 'notes', 'doodle'
        """
        lab_dir = LABS_DIR / platform / lab_id
        if slot_type == "notes":
            target_file = lab_dir / "notes.md"
        elif slot_type == "doodle":
            ext = staged_file.suffix.lower()
            target_file = lab_dir / f"doodle{ext}"
        else:
            target_file = lab_dir / staged_file.name

        placed = self._move_with_confirmation(staged_file, target_file)

        # If this is an HTML notes file, also copy the images/ subfolder from staging
        if placed and staged_file.suffix.lower() == ".html":
            self._copy_images_from_staging(staged_file.parent, target_file.parent)

        return placed

    def ensure_day_metadata(
        self,
        day_number: int,
        title: Optional[str] = None,
        subtitle: Optional[str] = None,
        description: Optional[str] = None,
    ) -> Path:
        """
        Ensures meta.json exists for the day, creating or updating it.
        """
        day_dir = DAYS_DIR / f"day-{day_number:02d}"
        day_dir.mkdir(parents=True, exist_ok=True)
        meta_file = day_dir / "meta.json"

        data: Dict[str, Any] = {
            "day": day_number,
            "title": f"Day {day_number}",
            "subtitle": subtitle or f"Session topics for Day {day_number}",
            "description": description or f"Class notes and session content for Day {day_number}.",
        }

        if meta_file.exists():
            try:
                existing = json.loads(meta_file.read_text(encoding="utf-8"))
                existing["day"] = day_number
                if title:
                    existing["title"] = title
                if subtitle:
                    existing["subtitle"] = subtitle
                if description:
                    existing["description"] = description
                data = existing
            except Exception as e:
                log_warn(f"Could not read existing meta.json, regenerating: {e}")

        meta_file.write_text(json.dumps(data, indent=2) + "\n", encoding="utf-8")
        self.touched_files.add(meta_file)
        log_agent("Agent 2", f"Metadata saved: {meta_file.relative_to(meta_file.parents[3])}")
        return meta_file

    def ensure_day_links(
        self,
        day_number: int,
        links: List[Dict[str, str]],
    ) -> Optional[Path]:
        """
        Creates or updates links.json for a day.
        """
        if not links:
            return None

        day_dir = DAYS_DIR / f"day-{day_number:02d}"
        day_dir.mkdir(parents=True, exist_ok=True)
        links_file = day_dir / "links.json"

        existing_links = []
        if links_file.exists():
            try:
                existing_links = json.loads(links_file.read_text(encoding="utf-8"))
            except Exception:
                existing_links = []

        # Merge links by URL
        seen_urls = {item.get("url") for item in existing_links if "url" in item}
        for link in links:
            if link.get("url") not in seen_urls:
                existing_links.append(link)
                seen_urls.add(link.get("url"))

        links_file.write_text(json.dumps(existing_links, indent=2) + "\n", encoding="utf-8")
        self.touched_files.add(links_file)
        log_agent("Agent 2", f"Links saved: {links_file.relative_to(links_file.parents[3])}")
        return links_file

    def ensure_lab_metadata(
        self,
        platform: str,
        lab_number: int,
        lab_id: str,
        title: str,
        source_url: Optional[str] = None,
    ) -> Path:
        """
        Ensures meta.json exists for a lab, creating or updating it.
        """
        lab_dir = LABS_DIR / platform / lab_id
        lab_dir.mkdir(parents=True, exist_ok=True)
        meta_file = lab_dir / "meta.json"

        data = {
            "platform": platform,
            "id": lab_id,
            "number": lab_number,
            "title": title or f"Lab {lab_number}",
            "sourceUrl": source_url or "",
            "status": "not-started",
        }

        if meta_file.exists():
            try:
                existing = json.loads(meta_file.read_text(encoding="utf-8"))
                existing.update({k: v for k, v in data.items() if v})
                data = existing
            except Exception:
                pass

        meta_file.write_text(json.dumps(data, indent=2) + "\n", encoding="utf-8")
        self.touched_files.add(meta_file)
        log_agent("Agent 2", f"Lab metadata saved: {meta_file.relative_to(meta_file.parents[4])}")
        return meta_file

    def _move_with_confirmation(self, staged_file: Path, target_file: Path) -> Optional[Path]:
        """Moves staged_file to target_file, asking for confirmation if target already exists."""
        target_file.parent.mkdir(parents=True, exist_ok=True)

        if target_file.exists():
            print(f"\n[!] Notice: Destination already exists: {target_file}")
            ans = input("    Overwrite this file? (y/N): ").strip().lower()
            if ans not in {"y", "yes"}:
                log_warn(f"Skipped overwriting existing file: {target_file.name}")
                return None

        # Copy from staging to target
        shutil.copy2(staged_file, target_file)
        self.touched_files.add(target_file)
        log_agent("Agent 2", f"Placed file: {target_file.name} -> {target_file.parent}")
        return target_file

    def _copy_images_from_staging(self, staging_dir: Path, target_dir: Path):
        """Copies images/ subfolder from staging to target directory if it exists."""
        staging_images = staging_dir / "images"
        if not staging_images.exists() or not staging_images.is_dir():
            return

        target_images = target_dir / "images"
        target_images.mkdir(parents=True, exist_ok=True)

        copied_count = 0
        for img_file in staging_images.iterdir():
            if img_file.is_file():
                dest = target_images / img_file.name
                shutil.copy2(img_file, dest)
                self.touched_files.add(dest)
                copied_count += 1

        if copied_count > 0:
            log_agent("Agent 2", f"Copied {copied_count} images to {target_images}")

    def get_touched_files(self) -> List[Path]:
        """Returns all destination files touched in this session."""
        return sorted(list(self.touched_files))
