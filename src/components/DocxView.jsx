import { useEffect, useRef, useState } from 'react';
import { renderAsync } from 'docx-preview';

/**
 * Faithfully renders original .docx files in the browser using docx-preview.
 * Preserves actual Word layout, tabs, indentation, spacing, alignment, tables, and images.
 */
export default function DocxView({ fileUrl, filename = 'document.docx', className = '' }) {
  const containerRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    if (!fileUrl) {
      setLoading(false);
      setError('No document URL provided.');
      return;
    }

    async function renderDocx() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(fileUrl);
        if (!response.ok) {
          throw new Error(`Failed to fetch document (${response.status}: ${response.statusText})`);
        }

        const blob = await response.blob();
        if (!isMounted || !containerRef.current) return;

        // Clear previous render
        containerRef.current.innerHTML = '';

        await renderAsync(blob, containerRef.current, undefined, {
          className: 'docx-viewer',
          inWrapper: true,
          ignoreWidth: false,
          ignoreHeight: true,
          breakPages: false,
        });
      } catch (err) {
        if (isMounted) {
          console.error('DocxView render error:', err);
          setError(err.message || 'An error occurred while rendering the document.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    renderDocx();

    return () => {
      isMounted = false;
    };
  }, [fileUrl]);

  return (
    <div className={`flex flex-col bg-surface-container-lowest rounded-xl border border-outline-variant/15 overflow-hidden ${className}`}>
      {/* Top Document Header Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-surface-container/60 border-b border-outline-variant/10 text-xs flex-wrap gap-2">
        <div className="flex items-center gap-2 text-on-surface">
          <span className="material-symbols-outlined text-primary text-[18px]">
            description
          </span>
          <span className="font-semibold truncate max-w-[280px] sm:max-w-md">
            {filename}
          </span>
          <span className="px-1.5 py-0.5 rounded bg-primary/10 text-primary font-mono text-[10px] font-semibold">
            Word .docx
          </span>
        </div>

        {fileUrl && (
          <a
            href={fileUrl}
            download={filename}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-surface-container-high hover:bg-primary hover:text-on-primary text-on-surface font-medium transition-all shadow-xs"
            title="Download original .docx file"
          >
            <span className="material-symbols-outlined text-[15px]">download</span>
            <span>Download</span>
          </a>
        )}
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
          <div className="w-8 h-8 border-3 border-primary/20 border-t-primary rounded-full animate-spin mb-3" />
          <p className="text-sm font-medium text-on-surface">Rendering Word document...</p>
          <p className="text-xs text-on-surface-variant mt-1">
            Formatting indentation, tables, and typography faithfully
          </p>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="p-6 m-4 rounded-xl bg-error-container/20 border border-error/20 text-center">
          <span className="material-symbols-outlined text-error text-[32px] mb-2">
            error_outline
          </span>
          <p className="text-sm font-semibold text-error mb-1">Failed to display document</p>
          <p className="text-xs text-on-surface-variant mb-4">{error}</p>
          {fileUrl && (
            <a
              href={fileUrl}
              download={filename}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-on-primary text-xs font-semibold hover:opacity-90 transition-opacity"
            >
              <span className="material-symbols-outlined text-[16px]">download</span>
              <span>Download .docx directly</span>
            </a>
          )}
        </div>
      )}

      {/* Document Scrollable Container */}
      <div
        className={`docx-viewer-container max-h-[75vh] overflow-y-auto overflow-x-auto p-2 sm:p-4 bg-surface-container-low/50 ${
          loading || error ? 'hidden' : 'block'
        }`}
      >
        <div ref={containerRef} className="docx-render-host flex justify-center w-full" />
      </div>
    </div>
  );
}
