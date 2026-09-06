"""
Native OS file dialog integration using Tkinter, with graceful terminal fallback.
"""

import sys
from pathlib import Path
from typing import Optional, List, Tuple
from orchestrator.logger import log_warn, get_logger


def pick_file(
    title: str,
    filetypes: List[Tuple[str, str]],
    allow_retry_or_skip: bool = True,
) -> Optional[Path]:
    """
    Opens a native file picker dialog with the specified title and allowed file types.
    Handles user cancellation and invalid selections cleanly.
    """
    logger = get_logger()

    while True:
        selected_path = None
        try:
            import tkinter as tk
            from tkinter import filedialog

            root = tk.Tk()
            root.withdraw()
            # Bring window to front
            root.attributes("-topmost", True)
            root.update()

            result = filedialog.askopenfilename(
                title=title,
                filetypes=filetypes,
            )
            root.destroy()

            if result:
                selected_path = Path(result).resolve()
        except Exception as e:
            logger.debug(f"Tkinter dialog error: {e}")
            print(f"\n[Note] Native dialog unavailable ({e}). Falling back to terminal input.")
            selected_path = _manual_path_entry(title)

        if selected_path and selected_path.is_file():
            return selected_path

        if not allow_retry_or_skip:
            return None

        # User canceled dialog or gave invalid path
        print(f"\n[!] No file selected for: \"{title}\"")
        print("  [1] Re-open file picker dialog")
        print("  [2] Enter file path manually in terminal")
        print("  [3] Skip this file")
        choice = input("Select an option (1/2/3) [1]: ").strip() or "1"

        if choice == "1":
            continue
        elif choice == "2":
            manual = _manual_path_entry(title)
            if manual and manual.is_file():
                return manual
            elif manual is None:
                # User decided to cancel manual input
                pass
            else:
                print(f"[!] Path does not exist or is not a file: {manual}")
        elif choice == "3":
            log_warn(f"User chose to skip file: \"{title}\"")
            return None
        else:
            continue


def _manual_path_entry(title: str) -> Optional[Path]:
    """Prompts for manual path entry in the terminal."""
    prompt = f"Enter full path for \"{title}\" (or leave blank to cancel): "
    try:
        user_input = input(prompt).strip().strip('"').strip("'")
        if not user_input:
            return None
        p = Path(user_input).expanduser().resolve()
        return p
    except (KeyboardInterrupt, EOFError):
        return None
