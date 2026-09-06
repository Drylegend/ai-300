/**
 * Lab data — single schema shared across Azure Portal Labs, Foundry Labs, and Doodles.
 *
 * Every text field that would have had Stitch-generated filler ships EMPTY.
 * Status defaults to "not-started" for every lab.
 */

const INITIAL_LABS = [
  // ─── Azure Portal Labs (1–7) ──────────────────────────────
  {
    platform: "azure-portal",
    id: "01-experiment-evaluate-models",
    number: 1,
    title: "Find the best classification model with Automated ML",
    sourceUrl: "https://microsoftlearning.github.io/mslearn-mlops/docs/01-experiment-evaluate-models.html",
    summary: "",
    doodleImage: null,
    status: "not-started",
  },
  {
    platform: "azure-portal",
    id: "02-optimize-model-training",
    number: 2,
    title: "Optimize model training with MLflow",
    sourceUrl: "https://microsoftlearning.github.io/mslearn-mlops/docs/02-optimize-model-training.html",
    summary: "",
    doodleImage: null,
    status: "not-started",
  },
  {
    platform: "azure-portal",
    id: "03-hyperparameter-tuning",
    number: 3,
    title: "Tune hyperparameters with Azure ML",
    sourceUrl: "https://microsoftlearning.github.io/mslearn-mlops/docs/03-hyperparameter-tuning.html",
    summary: "",
    doodleImage: null,
    status: "not-started",
  },
  {
    platform: "azure-portal",
    id: "04-run-pipelines",
    number: 4,
    title: "Build scalable machine learning pipelines",
    sourceUrl: "https://microsoftlearning.github.io/mslearn-mlops/docs/04-run-pipelines.html",
    summary: "",
    doodleImage: null,
    status: "not-started",
  },
  {
    platform: "azure-portal",
    id: "05-plan-and-prepare",
    number: 5,
    title: "Plan an enterprise MLOps architecture",
    sourceUrl: "https://microsoftlearning.github.io/mslearn-mlops/docs/05-plan-and-prepare.html",
    summary: "",
    doodleImage: null,
    status: "not-started",
  },
  {
    platform: "azure-portal",
    id: "06-automate-model-training",
    number: 6,
    title: "Automate model training with GitHub Actions",
    sourceUrl: "https://microsoftlearning.github.io/mslearn-mlops/docs/06-automate-model-training.html",
    summary: "",
    doodleImage: null,
    status: "not-started",
  },
  {
    platform: "azure-portal",
    id: "07-deploy-monitor",
    number: 7,
    title: "Deploy models to managed online endpoints",
    sourceUrl: "https://microsoftlearning.github.io/mslearn-mlops/docs/07-deploy-monitor.html",
    summary: "",
    doodleImage: null,
    status: "not-started",
  },

  // ─── Foundry Labs ─────────────────────────────────────────
  // Empty — Foundry labs will be added here when ready.
  // They use the identical schema and will automatically render
  // via LabCard / DoodleCard with zero UI changes.
];

export default INITIAL_LABS;
