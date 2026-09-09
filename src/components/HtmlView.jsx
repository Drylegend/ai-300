import { useMemo } from 'react';
import DOMPurify from 'dompurify';

/**
 * Renders sanitized HTML content (from mammoth-converted .docx files).
 * Uses DOMPurify for XSS protection even though content is self-generated.
 *
 * Styling uses .html-content wrapper class with scoped typography styles.
 */
export default function HtmlView({ content }) {
  if (!content) {
    return (
      <div className="p-6 text-center text-outline text-sm italic">
        No content provided.
      </div>
    );
  }

  const sanitizedHtml = useMemo(() => {
    return DOMPurify.sanitize(content, {
      ADD_TAGS: ['img'],
      ADD_ATTR: ['src', 'alt', 'width', 'height', 'loading'],
      ADD_DATA_URI_TAGS: ['img'],
    });
  }, [content]);

  return (
    <div
      className="html-content space-y-4 text-on-surface leading-relaxed text-sm"
      dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
    />
  );
}
