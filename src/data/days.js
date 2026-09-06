/**
 * Dynamic loader for Course Days.
 * Automatically scans /content/days at build/dev time via Vite's import.meta.glob.
 *
 * Adding a folder `/content/days/day-XX/` automatically adds that day.
 * Deleting a folder `/content/days/day-XX/` automatically removes that day.
 * NO component or routing code needs to be modified.
 */

// Eagerly load all day assets
const metaModules = import.meta.glob('/content/days/*/meta.json', { eager: true });
const summaryModules = import.meta.glob('/content/days/*/summary.md', { query: '?raw', import: 'default', eager: true });
const linksModules = import.meta.glob('/content/days/*/links.json', { eager: true });
const transcriptModules = import.meta.glob('/content/days/*/transcripts/*.md', { query: '?raw', import: 'default', eager: true });

function formatTranscriptTitle(filename, content) {
  // Extract first markdown heading if available (# Session 1: ...)
  const headingMatch = content.match(/^#\s+(.+)$/m);
  if (headingMatch && headingMatch[1]) {
    return headingMatch[1].trim();
  }

  // Fallback: format from filename (e.g. transcript-1.md -> Transcript 1)
  const base = filename.replace(/\.md$/i, '');
  return base
    .split(/[-_]/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function getAllDays() {
  const daysMap = {};

  for (const metaPath in metaModules) {
    const match = metaPath.match(/\/content\/days\/([^/]+)\/meta\.json$/);
    if (!match) continue;

    const folderSlug = match[1]; // e.g. "day-01"
    const metaData = metaModules[metaPath]?.default || metaModules[metaPath] || {};

    const dayNumber = typeof metaData.day === 'number'
      ? metaData.day
      : parseInt(folderSlug.replace(/\D+/g, ''), 10) || 1;

    // Load summary markdown
    const summaryPath = `/content/days/${folderSlug}/summary.md`;
    const summaryContent = summaryModules[summaryPath] || '';

    // Load links json
    const linksPath = `/content/days/${folderSlug}/links.json`;
    const linksData = linksModules[linksPath]?.default || linksModules[linksPath] || [];

    // Load transcripts
    const prefix = `/content/days/${folderSlug}/transcripts/`;
    const transcripts = [];

    for (const tPath in transcriptModules) {
      if (tPath.startsWith(prefix)) {
        const filename = tPath.slice(prefix.length);
        const rawContent = transcriptModules[tPath] || '';
        const transcriptNumMatch = filename.match(/\d+/);
        const order = transcriptNumMatch ? parseInt(transcriptNumMatch[0], 10) : 999;

        transcripts.push({
          id: filename.replace(/\.md$/i, ''),
          filename,
          order,
          title: formatTranscriptTitle(filename, rawContent),
          content: rawContent,
        });
      }
    }

    // Sort transcripts by order/number
    transcripts.sort((a, b) => a.order - b.order);

    daysMap[folderSlug] = {
      slug: folderSlug,
      id: folderSlug,
      dayNumber,
      title: metaData.title || `Day ${dayNumber}`,
      subtitle: metaData.subtitle || '',
      description: metaData.description || '',
      meta: metaData,
      summary: summaryContent,
      links: Array.isArray(linksData) ? linksData : [],
      transcripts,
    };
  }

  // Sort days in ascending numeric order
  return Object.values(daysMap).sort((a, b) => a.dayNumber - b.dayNumber);
}

export function getDayBySlug(slug) {
  const days = getAllDays();
  return days.find(d => d.slug === slug || String(d.dayNumber) === slug) || null;
}

export default getAllDays;
