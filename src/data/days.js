/**
 * Dynamic loader for Course Days.
 * Automatically scans /content/days at build/dev time via Vite's import.meta.glob.
 *
 * Supports .docx files converted directly to HTML at build time via Mammoth:
 * - summary.docx -> HTML summary + original .docx download link
 * - transcript-1.docx..4.docx -> HTML transcripts rendered as expandable cards
 *
 * Also maintains backward compatibility with legacy .html and .md files if present.
 */

// 1. Metadata and links
const metaModules = import.meta.glob('/content/days/*/meta.json', { eager: true });
const linksModules = import.meta.glob('/content/days/*/links.json', { eager: true });

// 2. Docx formats (original .docx asset URLs for client-side docx-preview rendering)
const summaryDocxUrls = import.meta.glob('/content/days/*/summary.docx', { query: '?url', import: 'default', eager: true });

// Transcripts directly in day folder or in transcripts/ subfolder
const transcriptDocxDirectUrls = import.meta.glob('/content/days/*/transcript-*.docx', { query: '?url', import: 'default', eager: true });
const transcriptDocxSubUrls = import.meta.glob('/content/days/*/transcripts/transcript-*.docx', { query: '?url', import: 'default', eager: true });

// 3. Fallback formats (legacy .html and .md)
const summaryHtmlModules = import.meta.glob('/content/days/*/summary.html', { query: '?raw', import: 'default', eager: true });
const summaryMdModules = import.meta.glob('/content/days/*/summary.md', { query: '?raw', import: 'default', eager: true });
const transcriptHtmlModules = import.meta.glob('/content/days/*/transcripts/*.html', { query: '?raw', import: 'default', eager: true });
const transcriptMdModules = import.meta.glob('/content/days/*/transcripts/*.md', { query: '?raw', import: 'default', eager: true });

function extractDaySlug(path) {
  const match = path.match(/\/content\/days\/([^/]+)/);
  return match ? match[1] : null;
}

export function getAllDays() {
  const allSlugs = new Set();

  // Discover all day folders across all globs
  const allModuleMaps = [
    metaModules,
    summaryDocxUrls,
    transcriptDocxDirectUrls,
    transcriptDocxSubUrls,
    summaryHtmlModules,
    summaryMdModules,
    transcriptHtmlModules,
    transcriptMdModules,
  ];

  for (const moduleMap of allModuleMaps) {
    for (const p in moduleMap) {
      const slug = extractDaySlug(p);
      if (slug) allSlugs.add(slug);
    }
  }

  const days = [];

  for (const folderSlug of allSlugs) {
    const metaPath = `/content/days/${folderSlug}/meta.json`;
    const metaData = metaModules[metaPath]?.default || metaModules[metaPath] || {};

    const dayNumber = typeof metaData.day === 'number'
      ? metaData.day
      : parseInt(folderSlug.replace(/\D+/g, ''), 10) || 1;

    // --- SUMMARY RESOLUTION ---
    // Priority: summary.docx > summary.html > summary.md
    const summaryDocxPath = `/content/days/${folderSlug}/summary.docx`;
    const summaryHtmlPath = `/content/days/${folderSlug}/summary.html`;
    const summaryMdPath = `/content/days/${folderSlug}/summary.md`;

    let summaryContent = '';
    let summaryFormat = 'docx';
    let summaryDocxUrl = null;

    if (summaryDocxUrls[summaryDocxPath]) {
      summaryContent = summaryDocxUrls[summaryDocxPath];
      summaryFormat = 'docx';
      summaryDocxUrl = summaryDocxUrls[summaryDocxPath];
    } else if (summaryHtmlModules[summaryHtmlPath]) {
      summaryContent = summaryHtmlModules[summaryHtmlPath];
      summaryFormat = 'html';
    } else if (summaryMdModules[summaryMdPath]) {
      summaryContent = summaryMdModules[summaryMdPath];
      summaryFormat = 'md';
    }

    // --- LINKS RESOLUTION ---
    const linksPath = `/content/days/${folderSlug}/links.json`;
    const linksData = linksModules[linksPath]?.default || linksModules[linksPath] || [];

    // --- TRANSCRIPTS RESOLUTION ---
    const transcriptsMap = new Map(); // order -> transcript object

    // Helper to extract order and filename
    const parseTranscriptInfo = (pathStr) => {
      const filename = pathStr.split('/').pop();
      const numMatch = filename.match(/\d+/);
      const order = numMatch ? parseInt(numMatch[0], 10) : 999;
      return { filename, order };
    };

    // 1. Docx transcripts (priority)
    // Check transcripts/ subfolder
    for (const tPath in transcriptDocxSubUrls) {
      if (extractDaySlug(tPath) === folderSlug) {
        const { filename, order } = parseTranscriptInfo(tPath);
        const docxUrl = transcriptDocxSubUrls[tPath];
        if (docxUrl) {
          transcriptsMap.set(order, {
            id: `transcript-${order}`,
            filename,
            order,
            title: `Transcript ${order}`,
            content: docxUrl,
            fileUrl: docxUrl,
            format: 'docx',
          });
        }
      }
    }

    // Check direct day folder transcript-*.docx (if not already found in subfolder)
    for (const tPath in transcriptDocxDirectUrls) {
      if (extractDaySlug(tPath) === folderSlug) {
        const { filename, order } = parseTranscriptInfo(tPath);
        if (!transcriptsMap.has(order)) {
          const docxUrl = transcriptDocxDirectUrls[tPath];
          if (docxUrl) {
            transcriptsMap.set(order, {
              id: `transcript-${order}`,
              filename,
              order,
              title: `Transcript ${order}`,
              content: docxUrl,
              fileUrl: docxUrl,
              format: 'docx',
            });
          }
        }
      }
    }

    // 2. Legacy HTML transcripts fallback
    for (const tPath in transcriptHtmlModules) {
      if (extractDaySlug(tPath) === folderSlug) {
        const { filename, order } = parseTranscriptInfo(tPath);
        if (!transcriptsMap.has(order)) {
          const rawContent = transcriptHtmlModules[tPath] || '';
          if (rawContent.trim()) {
            transcriptsMap.set(order, {
              id: `transcript-${order}`,
              filename,
              order,
              title: `Transcript ${order}`,
              content: rawContent,
              fileUrl: null,
              format: 'html',
            });
          }
        }
      }
    }

    // 3. Legacy MD transcripts fallback
    for (const tPath in transcriptMdModules) {
      if (extractDaySlug(tPath) === folderSlug) {
        const { filename, order } = parseTranscriptInfo(tPath);
        if (!transcriptsMap.has(order)) {
          const rawContent = transcriptMdModules[tPath] || '';
          if (rawContent.trim()) {
            transcriptsMap.set(order, {
              id: `transcript-${order}`,
              filename,
              order,
              title: `Transcript ${order}`,
              content: rawContent,
              fileUrl: null,
              format: 'md',
            });
          }
        }
      }
    }

    const transcripts = Array.from(transcriptsMap.values()).sort((a, b) => a.order - b.order);

    days.push({
      slug: folderSlug,
      id: folderSlug,
      dayNumber,
      title: metaData.title || `Day ${dayNumber}`,
      subtitle: metaData.subtitle || '',
      description: metaData.description || '',
      meta: metaData,
      summary: summaryContent,
      summaryFormat,
      summaryDocxUrl,
      links: Array.isArray(linksData) ? linksData : [],
      transcripts,
    });
  }

  // Sort days in ascending numeric order
  return days.sort((a, b) => a.dayNumber - b.dayNumber);
}

export function getDayBySlug(slug) {
  const days = getAllDays();
  return days.find(d => d.slug === slug || String(d.dayNumber) === slug) || null;
}

export default getAllDays;
