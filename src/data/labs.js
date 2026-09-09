/**
 * Lab data — single schema shared across Azure Portal Labs, Foundry Labs, and Doodles.
 *
 * Every text field that would have had Stitch-generated filler ships EMPTY.
 * Status defaults to "not-started" for every lab.
 *
 * Dynamic enrichment: Doodle images and notes files are automatically
 * discovered from /content/labs/ at build/dev time via Vite import.meta.glob,
 * matching the same pattern used by days.js. Agent 2 only needs to write files
 * to content/labs/<platform>/<lab-id>/ — no manual JS edits needed.
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

// ─── Dynamic Enrichment ────────────────────────────────────
// Scan /content/labs/ for doodle images and notes files at build time.
// This wires uploaded lab content into the UI without manual edits.

const doodleModules = import.meta.glob(
  '/content/labs/*/*/doodle.{png,jpg,jpeg,svg,webp}',
  { eager: true, query: '?url', import: 'default' }
);

const notesModules = import.meta.glob(
  '/content/labs/*/*/notes.md',
  { eager: true, query: '?raw', import: 'default' }
);

/**
 * Enriches INITIAL_LABS with dynamically discovered assets from /content/labs/.
 * Matches by platform and lab ID derived from the file path.
 */
function enrichLabs() {
  // Build lookup maps keyed by "<platform>/<lab-id>"
  const doodleMap = {};
  for (const path in doodleModules) {
    // path: /content/labs/azure-portal/01-experiment-evaluate-models/doodle.png
    const match = path.match(/\/content\/labs\/([^/]+)\/([^/]+)\/doodle\./);
    if (match) {
      const key = `${match[1]}/${match[2]}`;
      doodleMap[key] = doodleModules[path]; // URL string from ?url import
    }
  }

  const notesMap = {};
  for (const path in notesModules) {
    const match = path.match(/\/content\/labs\/([^/]+)\/([^/]+)\/notes\.md$/);
    if (match) {
      const key = `${match[1]}/${match[2]}`;
      notesMap[key] = notesModules[path]; // raw string content
    }
  }

  return INITIAL_LABS.map(lab => {
    const key = `${lab.platform}/${lab.id}`;
    return {
      ...lab,
      doodleImage: doodleMap[key] || lab.doodleImage,
      ingestedNotes: notesMap[key] || null,
    };
  });
}

export default enrichLabs();
