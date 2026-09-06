"""
Configuration and constants for the Ingestion Orchestrator.
"""

from pathlib import Path

# Workspace paths
WORKSPACE_ROOT = Path(__file__).resolve().parent.parent
CONTENT_DIR = WORKSPACE_ROOT / "content"
DAYS_DIR = CONTENT_DIR / "days"
LABS_DIR = CONTENT_DIR / "labs"
LOGS_DIR = WORKSPACE_ROOT / ".ingest_logs"
STAGING_DIR = WORKSPACE_ROOT / ".staging"

# Platforms
PLATFORMS = {
    "1": ("azure-portal", "Azure Portal"),
    "2": ("foundry", "Microsoft Foundry"),
}

# Known labs from MSLearn MLOps reference for auto-suggestions
KNOWN_AZURE_PORTAL_LABS = {
    1: {
        "id": "01-experiment-evaluate-models",
        "title": "Find the best classification model with Automated ML",
        "sourceUrl": "https://microsoftlearning.github.io/mslearn-mlops/docs/01-experiment-evaluate-models.html",
    },
    2: {
        "id": "02-optimize-model-training",
        "title": "Optimize model training with MLflow",
        "sourceUrl": "https://microsoftlearning.github.io/mslearn-mlops/docs/02-optimize-model-training.html",
    },
    3: {
        "id": "03-hyperparameter-tuning",
        "title": "Tune hyperparameters with Azure ML",
        "sourceUrl": "https://microsoftlearning.github.io/mslearn-mlops/docs/03-hyperparameter-tuning.html",
    },
    4: {
        "id": "04-run-pipelines",
        "title": "Build scalable machine learning pipelines",
        "sourceUrl": "https://microsoftlearning.github.io/mslearn-mlops/docs/04-run-pipelines.html",
    },
    5: {
        "id": "05-plan-and-prepare",
        "title": "Plan an enterprise MLOps architecture",
        "sourceUrl": "https://microsoftlearning.github.io/mslearn-mlops/docs/05-plan-and-prepare.html",
    },
    6: {
        "id": "06-automate-model-training",
        "title": "Automate model training with GitHub Actions",
        "sourceUrl": "https://microsoftlearning.github.io/mslearn-mlops/docs/06-automate-model-training.html",
    },
    7: {
        "id": "07-deploy-monitor",
        "title": "Deploy models to managed online endpoints",
        "sourceUrl": "https://microsoftlearning.github.io/mslearn-mlops/docs/07-deploy-monitor.html",
    },
}

# Supported file extensions
DOC_EXTENSIONS = {".docx", ".doc", ".md", ".txt"}
IMAGE_EXTENSIONS = {".png", ".jpg", ".jpeg", ".svg", ".webp"}
ALL_SUPPORTED_EXTENSIONS = DOC_EXTENSIONS | IMAGE_EXTENSIONS
