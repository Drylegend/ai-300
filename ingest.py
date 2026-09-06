#!/usr/bin/env python3
"""
Multi-Agent Content Ingestion Orchestrator for AI-300 Class Notes Portal.
Usage:
    python ingest.py
"""

import sys
import argparse
from pathlib import Path

# Ensure workspace root is in sys.path
WORKSPACE_ROOT = Path(__file__).resolve().parent
if str(WORKSPACE_ROOT) not in sys.path:
    sys.path.insert(0, str(WORKSPACE_ROOT))


def check_prerequisites():
    missing = []
    try:
        import docx
    except ImportError:
        missing.append("python-docx (install via: pip install python-docx)")

    try:
        import PIL
    except ImportError:
        missing.append("Pillow (install via: pip install Pillow)")

    if missing:
        print("[!] Missing required Python packages:")
        for m in missing:
            print(f"  - {m}")
        sys.exit(1)


def main():
    parser = argparse.ArgumentParser(
        description="Multi-Agent Content Ingestion Orchestrator for AI-300 Portal",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Five Sequential Agents:
  Agent 1: Normalize & Convert (.docx to clean Markdown, preserves headings/lists/tables)
  Agent 2: Placement (moves to content/days/day-XX/ or content/labs/<platform>/<lab-id>/)
  Agent 3: Numbering & Dedup (scans existing days/labs, proposes next sequential number)
  Agent 4: Validation (existence, non-emptiness, JSON/Markdown/Image syntax, cross-checks)
  Agent 5: Selective Git Push (stages only touched files, commits & pushes to current branch)
        """,
    )
    args = parser.parse_args()

    check_prerequisites()

    from orchestrator.cli import run_orchestrator
    run_orchestrator()


if __name__ == "__main__":
    main()
