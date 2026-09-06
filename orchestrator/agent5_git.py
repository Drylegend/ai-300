"""
Agent 5: Selective Git Staging, Commit & Push.
Stages only the specific files touched during this run,
creates an auto-generated descriptive commit message,
and pushes to the current branch while protecting local work.
"""

import subprocess
from pathlib import Path
from typing import List
from orchestrator.config import WORKSPACE_ROOT
from orchestrator.logger import log_agent, log_success, log_warn, log_error, get_logger


class Agent5GitPush:
    """Agent 5 implementation."""

    def run(self, touched_files: List[Path], commit_message: str) -> bool:
        """
        Stages touched files, commits with commit_message, and pushes to remote.
        Returns True if successful, False otherwise.
        """
        log_agent("Agent 5", "Initiating selective git staging and push...")

        # Verify git is available
        if not self._is_git_repo():
            log_error("Workspace is not a valid git repository.")
            return False

        current_branch = self._get_current_branch()
        log_agent("Agent 5", f"Target git branch: '{current_branch}'")

        # Filter existing touched files
        files_to_stage = [f for f in touched_files if f.exists()]
        if not files_to_stage:
            log_warn("No touched files exist to stage.")
            return False

        # Convert to relative paths from workspace root
        rel_paths = []
        for f in files_to_stage:
            try:
                rel_paths.append(str(f.relative_to(WORKSPACE_ROOT)))
            except ValueError:
                rel_paths.append(str(f))

        # 1. Selective git add
        log_agent("Agent 5", f"Staging {len(rel_paths)} files (selective git add)...")
        add_cmd = ["git", "add", "--"] + rel_paths
        add_res = subprocess.run(add_cmd, cwd=str(WORKSPACE_ROOT), capture_output=True, text=True)
        if add_res.returncode != 0:
            log_error(f"git add failed: {add_res.stderr.strip()}")
            return False

        # 2. Check if there are changes to commit
        diff_res = subprocess.run(
            ["git", "diff", "--cached", "--name-only"],
            cwd=str(WORKSPACE_ROOT),
            capture_output=True,
            text=True,
        )
        staged_changes = diff_res.stdout.strip().splitlines()
        if not staged_changes:
            log_agent("Agent 5", "No new changes detected in staged files. Nothing to commit.")
            return True

        log_agent("Agent 5", f"Staged changes verified ({len(staged_changes)} files). Committing...")

        # 3. Commit
        commit_cmd = ["git", "commit", "-m", commit_message]
        commit_res = subprocess.run(commit_cmd, cwd=str(WORKSPACE_ROOT), capture_output=True, text=True)
        if commit_res.returncode != 0:
            log_error(f"git commit failed: {commit_res.stderr.strip()}")
            return False

        log_success(f"Committed: \"{commit_message}\"")

        # 4. Push
        log_agent("Agent 5", f"Pushing commit to origin/{current_branch}...")
        push_cmd = ["git", "push", "origin", current_branch]
        push_res = subprocess.run(push_cmd, cwd=str(WORKSPACE_ROOT), capture_output=True, text=True)

        if push_res.returncode == 0:
            log_success(f"Pushed successfully to origin/{current_branch}!")
            return True
        else:
            err = push_res.stderr.strip() or push_res.stdout.strip()
            log_warn(f"git push failed:\n{err}")
            print("\n" + "!" * 64)
            print("GIT PUSH FAILED (Network issue or remote rejection).")
            print("Your local commit is intact and preserved. No work was lost.")
            print(f"When ready, you can push manually with:\n  git push origin {current_branch}")
            print("!" * 64 + "\n")
            return False

    def _is_git_repo(self) -> bool:
        res = subprocess.run(
            ["git", "rev-parse", "--is-inside-work-tree"],
            cwd=str(WORKSPACE_ROOT),
            capture_output=True,
            text=True,
        )
        return res.returncode == 0 and res.stdout.strip() == "true"

    def _get_current_branch(self) -> str:
        res = subprocess.run(
            ["git", "rev-parse", "--abbrev-ref", "HEAD"],
            cwd=str(WORKSPACE_ROOT),
            capture_output=True,
            text=True,
        )
        branch = res.stdout.strip()
        return branch if branch else "main"
