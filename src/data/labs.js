/**
 * Lab data — single schema shared across Azure Portal Labs, Foundry Labs, and Doodles.
 *
 * Dynamic enrichment: Doodle images and notes files (.docx and .md) are automatically
 * discovered from /content/labs/ at build/dev time via Vite import.meta.glob,
 * matching the same pattern used by days.js.
 *
 * .docx files are auto-converted to HTML with inline images via vite-plugin-docx.
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
  // ─── AI Foundry Labs (1–5) ────────────────────────────────
  {
    platform: "foundry",
    id: "01-plan-and-prepare-a-genaiops-solution",
    number: 1,
    title: "Plan and prepare a GenAIOps solution",
    sourceUrl: "https://microsoftlearning.github.io/mslearn-genaiops/docs/01-infrastructure-setup.html",
    summary: "",
    doodleImage: null,
    status: "not-started",
  },
  {
    platform: "foundry",
    id: "02-develop-prompt-and-agent-versions",
    number: 2,
    title: "Develop prompt and agent versions",
    sourceUrl: "https://microsoftlearning.github.io/mslearn-genaiops/docs/02-prompt-management.html",
    summary: "",
    doodleImage: null,
    status: "not-started",
  },
  {
    platform: "foundry",
    id: "03-design-and-optimize-prompts",
    number: 3,
    title: "Design and optimize prompts",
    sourceUrl: "https://microsoftlearning.github.io/mslearn-genaiops/docs/03-design-optimize-prompts.html",
    summary: "",
    doodleImage: null,
    status: "not-started",
  },
  {
    platform: "foundry",
    id: "04-automated-evaluation-with-cloud-evaluators",
    number: 4,
    title: "Automated evaluation with cloud evaluators",
    sourceUrl: "https://microsoftlearning.github.io/mslearn-genaiops/docs/04-automated-evaluation.html",
    summary: "",
    doodleImage: null,
    status: "not-started",
  },
  {
    platform: "foundry",
    id: "05-monitor-and-trace-your-generative-ai-agent",
    number: 5,
    title: "Monitor and trace your generative AI agent",
    sourceUrl: "https://microsoftlearning.github.io/mslearn-genaiops/docs/05-monitoring-tracing.html",
    summary: "",
    doodleImage: null,
    status: "not-started",
  },
];

// ─── Dynamic Enrichment ────────────────────────────────────
// Scan /content/labs/ for metadata, doodle images, and notes files at build time.

const metaModules = import.meta.glob(
  '/content/labs/*/*/meta.json',
  { eager: true }
);

const doodleModules = import.meta.glob(
  '/content/labs/*/*/doodle.{png,jpg,jpeg,svg,webp}',
  { eager: true, query: '?url', import: 'default' }
);

// Docx notes (asset URLs for client-side docx-preview rendering)
const notesDocxUrls = import.meta.glob(
  '/content/labs/*/*/notes.docx',
  { eager: true, query: '?url', import: 'default' }
);

// Fallback legacy markdown notes
const notesMdModules = import.meta.glob(
  '/content/labs/*/*/notes.md',
  { eager: true, query: '?raw', import: 'default' }
);

/**
 * Enriches INITIAL_LABS with dynamically discovered assets and meta.json files
 * from /content/labs/. Matches by platform and lab ID derived from the file path.
 */
function enrichLabs() {
  const doodleMap = {};
  for (const path in doodleModules) {
    const match = path.match(/\/content\/labs\/([^/]+)\/([^/]+)\/doodle\./);
    if (match) {
      const key = `${match[1]}/${match[2]}`;
      doodleMap[key] = doodleModules[path];
    }
  }

  const notesMap = {};
  const notesFormatMap = {};
  const notesDocxUrlMap = {};

  // 1. Docx notes (priority)
  for (const path in notesDocxUrls) {
    const match = path.match(/\/content\/labs\/([^/]+)\/([^/]+)\/notes\.docx$/);
    if (match) {
      const key = `${match[1]}/${match[2]}`;
      notesMap[key] = notesDocxUrls[path];
      notesFormatMap[key] = 'docx';
      notesDocxUrlMap[key] = notesDocxUrls[path] || null;
    }
  }

  // 2. MD notes (fallback if docx not present)
  for (const path in notesMdModules) {
    const match = path.match(/\/content\/labs\/([^/]+)\/([^/]+)\/notes\.md$/);
    if (match) {
      const key = `${match[1]}/${match[2]}`;
      if (!notesMap[key]) {
        notesMap[key] = notesMdModules[path];
        notesFormatMap[key] = 'md';
        notesDocxUrlMap[key] = null;
      }
    }
  }

  // Combine INITIAL_LABS with dynamically discovered labs from meta.json
  const labsMap = new Map();

  for (const lab of INITIAL_LABS) {
    const key = `${lab.platform}/${lab.id}`;
    labsMap.set(key, { ...lab });
  }

  for (const path in metaModules) {
    const match = path.match(/\/content\/labs\/([^/]+)\/([^/]+)\/meta\.json$/);
    if (match) {
      const platform = match[1];
      const id = match[2];
      const key = `${platform}/${id}`;
      const metaData = metaModules[path]?.default || metaModules[path] || {};
      const existing = labsMap.get(key) || {
        platform,
        id,
        summary: '',
        doodleImage: null,
        status: 'not-started',
      };

      labsMap.set(key, {
        ...existing,
        ...metaData,
        platform: metaData.platform || platform,
        id: metaData.id || id,
        number: typeof metaData.number === 'number' ? metaData.number : existing.number,
        title: metaData.title || existing.title,
        sourceUrl: metaData.sourceUrl || existing.sourceUrl,
      });
    }
  }

  return Array.from(labsMap.values())
    .map(lab => {
      const key = `${lab.platform}/${lab.id}`;
      return {
        ...lab,
        doodleImage: doodleMap[key] || lab.doodleImage || null,
        ingestedNotes: notesMap[key] || null,
        ingestedNotesFormat: notesFormatMap[key] || 'md',
        notesDocxUrl: notesDocxUrlMap[key] || null,
      };
    })
    .sort((a, b) => {
      if (a.platform !== b.platform) {
        return a.platform === 'azure-portal' ? -1 : 1;
      }
      return (a.number || 0) - (b.number || 0);
    });
}

export default enrichLabs();

