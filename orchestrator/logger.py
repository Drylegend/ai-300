"""
Logging facility for Content Ingestion Orchestrator.
Maintains console output and writes persistent logs to .ingest_logs/
"""

import sys
import logging
from datetime import datetime
from pathlib import Path
from orchestrator.config import LOGS_DIR

_logger = None
_log_file_path = None


def setup_logger():
    global _logger, _log_file_path
    if _logger is not None:
        return _logger, _log_file_path

    LOGS_DIR.mkdir(parents=True, exist_ok=True)
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    _log_file_path = LOGS_DIR / f"ingest_{timestamp}.log"

    _logger = logging.getLogger("ingest_orchestrator")
    _logger.setLevel(logging.DEBUG)

    # File handler (detailed)
    fh = logging.FileHandler(_log_file_path, encoding="utf-8")
    fh.setLevel(logging.DEBUG)
    fh_formatter = logging.Formatter(
        "[%(asctime)s] [%(levelname)s] %(message)s", datefmt="%Y-%m-%d %H:%M:%S"
    )
    fh.setFormatter(fh_formatter)
    _logger.addHandler(fh)

    # Console handler (clean, user-facing)
    ch = logging.StreamHandler(sys.stdout)
    ch.setLevel(logging.INFO)
    ch_formatter = logging.Formatter("%(message)s")
    ch.setFormatter(ch_formatter)
    _logger.addHandler(ch)

    _logger.info(f"==> Ingestion run started. Detailed log: {_log_file_path.name}")
    return _logger, _log_file_path


def get_logger():
    global _logger
    if _logger is None:
        setup_logger()
    return _logger


def get_log_file_path():
    global _log_file_path
    return _log_file_path


def log_agent(agent_name: str, message: str, level: str = "info"):
    logger = get_logger()
    prefix = f"[{agent_name}]"
    formatted = f"{prefix} {message}"
    if level == "info":
        logger.info(formatted)
    elif level == "warning":
        logger.warning(formatted)
    elif level == "error":
        logger.error(formatted)
    elif level == "debug":
        logger.debug(formatted)


def log_success(message: str):
    logger = get_logger()
    logger.info(f"[SUCCESS] {message}")


def log_warn(message: str):
    logger = get_logger()
    logger.warning(f"[WARN] {message}")


def log_error(message: str):
    logger = get_logger()
    logger.error(f"[ERROR] {message}")
