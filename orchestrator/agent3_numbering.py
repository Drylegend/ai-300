"""
Agent 3: Numbering & Dedup.
Scans existing directories to propose the next sequential day or lab number,
and confirms overrides to prevent accidental overwrites.
"""

import re
import json
from pathlib import Path
from typing import Tuple, List, Set
from orchestrator.config import DAYS_DIR, LABS_DIR, WORKSPACE_ROOT
from orchestrator.logger import log_agent, log_warn


class Agent3NumberingDedup:
    """Agent 3 implementation."""

    @staticmethod
    def scan_existing_days() -> Set[int]:
        """Scans content/days/ to find all existing day numbers."""
        existing = set()
        if not DAYS_DIR.exists():
            return existing

        for p in DAYS_DIR.iterdir():
            if p.is_dir():
                m = re.match(r"^day-(\d+)$", p.name, re.IGNORECASE)
                if m:
                    existing.add(int(m.group(1)))
                else:
                    # Also check meta.json if folder naming differs
                    meta_file = p / "meta.json"
                    if meta_file.exists():
                        try:
                            data = json.loads(meta_file.read_text(encoding="utf-8"))
                            if "day" in data and isinstance(data["day"], int):
                                existing.add(data["day"])
                        except Exception:
                            pass
        return existing

    @classmethod
    def propose_next_day_number(cls) -> int:
        """Proposes the next sequential day number."""
        existing = cls.scan_existing_days()
        log_agent("Agent 3", f"Scanned existing days: {sorted(existing) if existing else 'None'}")
        if not existing:
            return 1
        return max(existing) + 1

    @staticmethod
    def scan_existing_labs(platform: str) -> Set[int]:
        """Scans content/labs/<platform>/ and src/data/labs.js to find used lab numbers."""
        existing = set()

        # Check content/labs/<platform>/
        platform_dir = LABS_DIR / platform
        if platform_dir.exists():
            for p in platform_dir.iterdir():
                if p.is_dir():
                    # Match XX-something or check meta.json
                    m = re.match(r"^(\d+)-", p.name)
                    if m:
                        existing.add(int(m.group(1)))
                    meta_file = p / "meta.json"
                    if meta_file.exists():
                        try:
                            data = json.loads(meta_file.read_text(encoding="utf-8"))
                            if "number" in data and isinstance(data["number"], int):
                                existing.add(data["number"])
                        except Exception:
                            pass

        # Also check src/data/labs.js for predefined labs
        labs_js = WORKSPACE_ROOT / "src" / "data" / "labs.js"
        if labs_js.exists():
            try:
                content = labs_js.read_text(encoding="utf-8")
                # Simple regex extraction for platform and number
                # e.g. platform: "azure-portal", ... number: 1
                pattern = rf'platform:\s*["\']{re.escape(platform)}["\'][\s\S]*?number:\s*(\d+)'
                for match in re.finditer(pattern, content):
                    existing.add(int(match.group(1)))
            except Exception as e:
                log_warn(f"Failed to scan labs.js: {e}")

        return existing

    @classmethod
    def propose_next_lab_number(cls, platform: str) -> int:
        """Proposes the next sequential lab number for platform."""
        existing = cls.scan_existing_labs(platform)
        log_agent("Agent 3", f"Scanned existing labs for {platform}: {sorted(existing) if existing else 'None'}")
        if not existing:
            return 1
        return max(existing) + 1

    @classmethod
    def confirm_day_number(cls, chosen_number: int) -> bool:
        """
        If chosen_number already exists, prompts the user to explicitly confirm.
        Returns True if confirmed or new, False if canceled.
        """
        existing = cls.scan_existing_days()
        if chosen_number in existing:
            print(f"\n[!] WARNING: Day {chosen_number} already exists in content/days/day-{chosen_number:02d}/.")
            print("    Touching this existing day folder will add or update its contents.")
            ans = input("    Are you sure you want to modify existing Day? (y/N): ").strip().lower()
            return ans in {"y", "yes"}
        return True

    @classmethod
    def confirm_lab_number(cls, platform: str, chosen_number: int) -> bool:
        """
        If chosen_number already exists for platform, prompts user to confirm.
        """
        existing = cls.scan_existing_labs(platform)
        if chosen_number in existing:
            print(f"\n[!] WARNING: Lab {chosen_number} already exists for platform '{platform}'.")
            print("    Touching this existing lab will add or update its contents.")
            ans = input("    Are you sure you want to modify existing Lab? (y/N): ").strip().lower()
            return ans in {"y", "yes"}
        return True
