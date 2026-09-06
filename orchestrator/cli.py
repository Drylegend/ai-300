"""
CLI Orchestrator for Multi-Agent Content Ingestion.
Coordinates Agents 1-5 through an interactive wizard using native file dialogs.
"""

import sys
import re
from pathlib import Path
from typing import List, Dict, Optional

from orchestrator.config import (
    DOC_EXTENSIONS,
    IMAGE_EXTENSIONS,
    PLATFORMS,
    KNOWN_AZURE_PORTAL_LABS,
)
from orchestrator.logger import (
    setup_logger,
    log_agent,
    log_success,
    log_warn,
    log_error,
    get_log_file_path,
)
from orchestrator.dialogs import pick_file
from orchestrator.agent1_convert import Agent1NormalizeConvert, ConversionError
from orchestrator.agent2_placement import Agent2Placement
from orchestrator.agent3_numbering import Agent3NumberingDedup
from orchestrator.agent4_validation import Agent4Validation
from orchestrator.agent5_git import Agent5GitPush


def run_orchestrator():
    """Main interactive wizard."""
    setup_logger()

    print("\n" + "=" * 64)
    print("      AI-300 MULTI-AGENT CONTENT INGESTION ORCHESTRATOR")
    print("=" * 64)

    # Initialize Agents
    agent1 = Agent1NormalizeConvert()
    agent2 = Agent2Placement()
    agent3 = Agent3NumberingDedup()
    agent4 = Agent4Validation()
    agent5 = Agent5GitPush()

    try:
        # Step 1: Ingestion Target Selection
        target_type = _prompt_choice(
            "What type of content would you like to ingest?",
            [("day", "Course Day  (Transcripts, Summary, Links)"),
             ("lab", "Lab Content (Notes, Doodle, Metadata)")],
            default="day",
        )

        if target_type == "day":
            _handle_day_ingestion(agent1, agent2, agent3, agent4, agent5)
        else:
            _handle_lab_ingestion(agent1, agent2, agent3, agent4, agent5)

    except KeyboardInterrupt:
        print("\n\n[!] Ingestion interrupted by user. Any completed files remain in place.")
    except Exception as e:
        log_error(f"Unexpected error in orchestrator: {e}")
        import traceback
        traceback.print_exc()
    finally:
        agent1.cleanup_staging()
        log_file = get_log_file_path()
        if log_file:
            print(f"Log written to: {log_file}")


def _handle_day_ingestion(agent1, agent2, agent3, agent4, agent5):
    print("\n--- Day Ingestion Wizard ---")

    # Step 1: Propose Day Number
    proposed_day = agent3.propose_next_day_number()
    day_input = input(f"Enter Day number [{proposed_day}]: ").strip()
    day_number = int(day_input) if day_input else proposed_day

    # Verify override if touching existing day
    if not agent3.confirm_day_number(day_number):
        print("Aborting day ingestion.")
        return

    # Metadata inputs
    title = input(f"Day Title [Day {day_number}]: ").strip() or f"Day {day_number}"
    subtitle = input("Day Subtitle/Topic (optional): ").strip()
    description = input("Day Description (optional): ").strip()

    # Step 2: Transcripts
    num_transcripts_input = input("How many transcripts for this day? [1]: ").strip() or "1"
    try:
        num_transcripts = max(1, int(num_transcripts_input))
    except ValueError:
        num_transcripts = 1

    doc_filetypes = [
        ("Word Documents & Markdown", "*.docx;*.doc;*.md;*.txt"),
        ("Word Documents (*.docx, *.doc)", "*.docx;*.doc"),
        ("Markdown & Text (*.md, *.txt)", "*.md;*.txt"),
        ("All files", "*.*"),
    ]

    expected_files: List[Path] = []

    # Pick & process each transcript
    for i in range(1, num_transcripts + 1):
        dialog_title = f"Select Transcript {i} of {num_transcripts} (docx, md, txt)"
        print(f"\n>> Opening file picker: {dialog_title}")
        selected_file = pick_file(dialog_title, doc_filetypes)

        if selected_file:
            try:
                staged = agent1.process_file(selected_file, f"transcript-{i}.md")
                placed = agent2.place_day_file(staged, day_number, "transcript", transcript_index=i)
                if placed:
                    expected_files.append(placed)
            except ConversionError as ce:
                log_warn(f"Failed to process transcript {i}: {ce}")
        else:
            log_warn(f"Transcript {i} skipped by user.")

    # Step 3: Summary
    summary_title = f"Select Summary for Day {day_number} (docx, md, txt)"
    print(f"\n>> Opening file picker: {summary_title}")
    summary_file = pick_file(summary_title, doc_filetypes)
    if summary_file:
        try:
            staged_summary = agent1.process_file(summary_file, "summary.md")
            placed_summary = agent2.place_day_file(staged_summary, day_number, "summary")
            if placed_summary:
                expected_files.append(placed_summary)
        except ConversionError as ce:
            log_warn(f"Failed to process summary: {ce}")
    else:
        log_warn("Summary file skipped by user.")

    # Step 4: Optional Links
    print("\nOptional: Add Important Links for this day.")
    add_links = input("Add any resource links now? (y/N): ").strip().lower() in {"y", "yes"}
    links_list = []
    if add_links:
        print("Enter links one by one. Press Enter with empty label when finished.")
        link_idx = 1
        while True:
            label = input(f"  Link {link_idx} Label: ").strip()
            if not label:
                break
            url = input(f"  Link {link_idx} URL: ").strip()
            desc = input(f"  Link {link_idx} Description: ").strip()
            if url:
                links_list.append({"label": label, "url": url, "description": desc})
                link_idx += 1

    if links_list:
        placed_links = agent2.ensure_day_links(day_number, links_list)
        if placed_links:
            expected_files.append(placed_links)

    # Step 5: Save meta.json
    meta_path = agent2.ensure_day_metadata(
        day_number=day_number,
        title=title,
        subtitle=subtitle,
        description=description,
    )
    expected_files.append(meta_path)

    # Step 6: Validation (Agent 4)
    validation = agent4.validate_plan(expected_files, day_number=day_number)

    if not validation.all_passed:
        print("\n[!] Validation failed. Aborting git commit/push.")
        return

    # Step 7: Git Push (Agent 5)
    commit_msg = f"Add Day {day_number}: {len([f for f in expected_files if 'transcript' in f.name])} transcripts, summary"
    _prompt_and_push(agent5, agent2.get_touched_files(), commit_msg)


def _handle_lab_ingestion(agent1, agent2, agent3, agent4, agent5):
    print("\n--- Lab Ingestion Wizard ---")

    # Step 1: Choose Platform
    platform_key = _prompt_choice(
        "Which platform is this lab for?",
        [("1", "Azure Portal (azure-portal)"),
         ("2", "Microsoft Foundry (foundry)")],
        default="1",
    )
    platform_slug, platform_name = PLATFORMS[platform_key]

    # Step 2: Propose Lab Number
    proposed_number = agent3.propose_next_lab_number(platform_slug)
    num_input = input(f"Enter Lab number for {platform_name} [{proposed_number}]: ").strip()
    lab_number = int(num_input) if num_input else proposed_number

    if not agent3.confirm_lab_number(platform_slug, lab_number):
        print("Aborting lab ingestion.")
        return

    # Check known lab suggestions
    known = KNOWN_AZURE_PORTAL_LABS.get(lab_number) if platform_slug == "azure-portal" else None
    default_title = known["title"] if known else f"Lab {lab_number}"
    title = input(f"Lab Title [{default_title}]: ").strip() or default_title

    # Generate or prompt Lab ID slug
    default_id = known["id"] if known else _slugify(f"{lab_number:02d}-{title}")
    lab_id = input(f"Lab ID slug [{default_id}]: ").strip() or default_id

    source_url = ""
    if known and known.get("sourceUrl"):
        default_url = known["sourceUrl"]
        source_url = input(f"Lab Source URL [{default_url}]: ").strip() or default_url
    else:
        source_url = input("Lab Source URL (optional): ").strip()

    expected_files: List[Path] = []

    # Step 3: Doodle Image
    img_filetypes = [
        ("Images (*.png, *.jpg, *.jpeg, *.svg, *.webp)", "*.png;*.jpg;*.jpeg;*.svg;*.webp"),
        ("PNG Images (*.png)", "*.png"),
        ("SVG Vector Graphics (*.svg)", "*.svg"),
        ("All files", "*.*"),
    ]
    doodle_title = f"Select Doodle Image for Lab {lab_number} (png, jpg, svg, webp)"
    print(f"\n>> Opening file picker: {doodle_title}")
    doodle_file = pick_file(doodle_title, img_filetypes)
    if doodle_file:
        try:
            staged_doodle = agent1.process_file(doodle_file, f"doodle{doodle_file.suffix.lower()}")
            placed_doodle = agent2.place_lab_file(staged_doodle, platform_slug, lab_id, "doodle")
            if placed_doodle:
                expected_files.append(placed_doodle)
        except ConversionError as ce:
            log_warn(f"Failed to process doodle: {ce}")
    else:
        log_warn("Doodle image skipped by user.")

    # Step 4: Notes
    doc_filetypes = [
        ("Word Documents & Markdown", "*.docx;*.doc;*.md;*.txt"),
        ("All files", "*.*"),
    ]
    notes_title = f"Select Notes for Lab {lab_number} (docx, md, txt)"
    print(f"\n>> Opening file picker: {notes_title}")
    notes_file = pick_file(notes_title, doc_filetypes)
    if notes_file:
        try:
            staged_notes = agent1.process_file(notes_file, "notes.md")
            placed_notes = agent2.place_lab_file(staged_notes, platform_slug, lab_id, "notes")
            if placed_notes:
                expected_files.append(placed_notes)
        except ConversionError as ce:
            log_warn(f"Failed to process notes: {ce}")
    else:
        log_warn("Notes file skipped by user.")

    # Step 5: Save lab meta.json
    meta_path = agent2.ensure_lab_metadata(
        platform=platform_slug,
        lab_number=lab_number,
        lab_id=lab_id,
        title=title,
        source_url=source_url,
    )
    expected_files.append(meta_path)

    # Step 6: Validation (Agent 4)
    validation = agent4.validate_plan(expected_files, platform=platform_slug, lab_id=lab_id)

    if not validation.all_passed:
        print("\n[!] Validation failed. Aborting git commit/push.")
        return

    # Step 7: Git Push (Agent 5)
    commit_msg = f"Add Lab {lab_number:02d}: {platform_slug} - {title}"
    _prompt_and_push(agent5, agent2.get_touched_files(), commit_msg)


def _prompt_and_push(agent5, touched_files: List[Path], commit_msg: str):
    print(f"\nTarget Commit Message: \"{commit_msg}\"")
    print(f"Files to Stage ({len(touched_files)}):")
    for f in touched_files:
        print(f"  - {f.name}")

    push_choice = input("\nPush to GitHub now? (Y/n) [Y]: ").strip().lower()
    if push_choice in {"", "y", "yes"}:
        success = agent5.run(touched_files, commit_msg)
        if success:
            log_success("All ingestion steps completed successfully!")
    else:
        print("Git push skipped by user. Touched files remain in working tree.")


def _prompt_choice(prompt_text: str, options: List[tuple], default: str = "") -> str:
    print(f"\n{prompt_text}")
    for key, label in options:
        marker = " (default)" if key == default else ""
        print(f"  [{key}] {label}{marker}")

    while True:
        choice = input(f"Choice [{default}]: ").strip() or default
        for key, _ in options:
            if choice == key:
                return key
        print("Invalid choice, please select one of the listed options.")


def _slugify(text: str) -> str:
    text = text.lower().strip()
    text = re.sub(r"[^\w\s-]", "", text)
    text = re.sub(r"[\s_]+", "-", text)
    return text.strip("-")
