export default function MarkdownView({ content }) {
  if (!content) {
    return (
      <div className="p-6 text-center text-outline text-sm italic">
        No content provided.
      </div>
    );
  }

  // Parse lines into blocks
  const lines = content.split('\n');
  const blocks = [];
  let currentList = null;

  function flushList() {
    if (currentList) {
      blocks.push({ type: 'list', items: currentList });
      currentList = null;
    }
  }

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const trimmed = rawLine.trim();

    if (!trimmed) {
      flushList();
      continue;
    }

    // Headings
    if (trimmed.startsWith('### ')) {
      flushList();
      blocks.push({ type: 'h3', text: trimmed.slice(4) });
    } else if (trimmed.startsWith('## ')) {
      flushList();
      blocks.push({ type: 'h2', text: trimmed.slice(3) });
    } else if (trimmed.startsWith('# ')) {
      flushList();
      blocks.push({ type: 'h1', text: trimmed.slice(2) });
    } else if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      // List items
      if (!currentList) currentList = [];
      currentList.push(trimmed.slice(2));
    } else if (/^\d+\.\s+/.test(trimmed)) {
      if (!currentList) currentList = [];
      currentList.push(trimmed.replace(/^\d+\.\s+/, ''));
    } else {
      flushList();
      blocks.push({ type: 'p', text: trimmed });
    }
  }
  flushList();

  function formatInline(text) {
    // Process bold **text**, inline code `code`, and links
    const parts = [];
    let remaining = text;
    let key = 0;

    while (remaining) {
      // Bold
      const boldMatch = remaining.match(/\*\*(.+?)\*\*/);
      // Code
      const codeMatch = remaining.match(/`(.+?)`/);

      let firstMatch = null;
      let matchType = null;

      if (boldMatch && (!codeMatch || boldMatch.index < codeMatch.index)) {
        firstMatch = boldMatch;
        matchType = 'bold';
      } else if (codeMatch) {
        firstMatch = codeMatch;
        matchType = 'code';
      }

      if (firstMatch) {
        if (firstMatch.index > 0) {
          parts.push(remaining.slice(0, firstMatch.index));
        }
        if (matchType === 'bold') {
          parts.push(
            <strong key={key++} className="font-semibold text-on-surface">
              {firstMatch[1]}
            </strong>
          );
        } else if (matchType === 'code') {
          parts.push(
            <code
              key={key++}
              className="px-1.5 py-0.5 rounded bg-surface-container font-mono text-xs text-primary"
            >
              {firstMatch[1]}
            </code>
          );
        }
        remaining = remaining.slice(firstMatch.index + firstMatch[0].length);
      } else {
        parts.push(remaining);
        break;
      }
    }

    return parts;
  }

  return (
    <div className="space-y-4 text-on-surface leading-relaxed text-sm">
      {blocks.map((block, idx) => {
        if (block.type === 'h1') {
          return (
            <h1
              key={idx}
              className="text-xl md:text-2xl font-bold text-on-surface pt-2 pb-1 border-b border-outline-variant/15"
            >
              {formatInline(block.text)}
            </h1>
          );
        }
        if (block.type === 'h2') {
          return (
            <h2
              key={idx}
              className="text-lg md:text-xl font-semibold text-on-surface pt-3"
            >
              {formatInline(block.text)}
            </h2>
          );
        }
        if (block.type === 'h3') {
          return (
            <h3
              key={idx}
              className="text-base font-semibold text-on-surface pt-2 text-primary"
            >
              {formatInline(block.text)}
            </h3>
          );
        }
        if (block.type === 'list') {
          return (
            <ul key={idx} className="space-y-1.5 pl-5 list-disc text-on-surface-variant">
              {block.items.map((item, itemIdx) => (
                <li key={itemIdx} className="leading-snug">
                  {formatInline(item)}
                </li>
              ))}
            </ul>
          );
        }
        return (
          <p key={idx} className="text-on-surface-variant">
            {formatInline(block.text)}
          </p>
        );
      })}
    </div>
  );
}
