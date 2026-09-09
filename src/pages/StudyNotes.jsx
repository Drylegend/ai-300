import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import useLabState from '../hooks/useLabState';
import StatusBadge from '../components/StatusBadge';
import MarkdownView from '../components/MarkdownView';
import HtmlView from '../components/HtmlView';
import { COURSE_CONFIG } from '../config';

const STATUS_CYCLE = ['not-started', 'in-progress', 'done'];

export default function StudyNotes() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { labs, getLabById, updateLabStatus, updateLabNotes } = useLabState();
  const lab = getLabById(id);
  const [activeTab, setActiveTab] = useState('summary');
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [noteText, setNoteText] = useState('');

  useEffect(() => {
    if (lab) {
      setNoteText(lab.studentNotes || lab.summary || '');
    }
  }, [lab?.id, lab?.studentNotes, lab?.summary]);

  function handleSaveNotes() {
    if (lab) {
      updateLabNotes(lab.id, noteText);
      setIsEditingNotes(false);
    }
  }

  if (!lab) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <span className="material-symbols-outlined text-outline text-[48px] mb-3">
          search_off
        </span>
        <h2 className="text-lg font-semibold text-on-surface mb-1">Lab Not Found</h2>
        <p className="text-[13px] text-on-surface-variant mb-4">
          The lab &ldquo;{id}&rdquo; doesn't exist in the data.
        </p>
        <Link
          to="/"
          className="px-4 py-2 rounded-lg bg-primary text-on-primary text-[13px] font-semibold"
        >
          Back to Labs
        </Link>
      </div>
    );
  }

  const paddedNum = String(lab.number).padStart(2, '0');
  const platformLabel = lab.platform === 'azure-portal' ? 'Azure Portal' : 'AI Foundry';

  // Find next lab
  const currentIndex = labs.findIndex(l => l.id === id);
  const nextLab = currentIndex >= 0 && currentIndex < labs.length - 1 ? labs[currentIndex + 1] : null;

  function cycleStatus() {
    const currentIdx = STATUS_CYCLE.indexOf(lab.status);
    const nextStatus = STATUS_CYCLE[(currentIdx + 1) % STATUS_CYCLE.length];
    updateLabStatus(lab.id, nextStatus);
  }

  function statusButtonLabel() {
    switch (lab.status) {
      case 'not-started':
        return 'Mark as In Progress';
      case 'in-progress':
        return 'Mark as Done';
      case 'done':
        return 'Reset to Not Started';
      default:
        return 'Update Status';
    }
  }

  function statusButtonIcon() {
    switch (lab.status) {
      case 'not-started':
        return 'play_arrow';
      case 'in-progress':
        return 'check_circle';
      case 'done':
        return 'restart_alt';
      default:
        return 'sync';
    }
  }

  const tabs = [
    { key: 'summary', label: 'Notes & Summary' },
    { key: 'links', label: 'Important Links' },
  ];

  return (
    <>
      {/* Back + Breadcrumb */}
      <div className="flex items-center justify-between py-1 flex-wrap gap-2">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors text-[13px] font-medium"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          <span>Back to Labs</span>
        </button>
        <div className="flex items-center gap-1.5 text-on-surface-variant text-[11px] font-semibold tracking-wider flex-wrap">
          <a
            href={COURSE_CONFIG.courseUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors flex items-center gap-0.5 group"
          >
            <span>AZURE MLOPS</span>
            <span className="material-symbols-outlined text-[12px] opacity-70 group-hover:opacity-100">
              open_in_new
            </span>
          </a>
          <span>•</span>
          <span>{platformLabel.toUpperCase()}</span>
          <span>•</span>
          <span>LAB {paddedNum}</span>
          <span>•</span>
          <span className="text-primary font-semibold">SUMMARY &amp; NOTES</span>
        </div>
      </div>

      {/* Lab header card */}
      <div className="bg-surface-container-lowest rounded-xl p-5 shadow-sm flex flex-col gap-4">
        <div className="flex items-start gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-primary-fixed text-primary text-xl font-semibold flex items-center justify-center shrink-0 shadow-sm">
            {paddedNum}
          </div>
          <div className="flex flex-col min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-surface-container-high text-primary text-xs font-medium">
                {platformLabel}
              </span>
              <StatusBadge status={lab.status} />
            </div>
            <h2 className="text-xl font-semibold text-on-surface leading-snug">
              {lab.title || <span className="text-outline italic">Untitled Lab</span>}
            </h2>
          </div>
        </div>

        {/* Source link */}
        {lab.sourceUrl && (
          <a
            href={lab.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-3 rounded-lg bg-surface-container-low hover:bg-surface-container text-primary transition-colors group"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="material-symbols-outlined text-primary group-hover:scale-110 transition-transform">
                school
              </span>
              <div className="flex flex-col min-w-0">
                <span className="text-[13px] font-semibold text-on-surface truncate">
                  Official Microsoft Learn Lab Guide
                </span>
                <span className="text-[13px] text-on-surface-variant truncate">
                  {lab.id}.html
                </span>
              </div>
            </div>
            <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors text-[20px]">
              open_in_new
            </span>
          </a>
        )}
      </div>

      {/* Doodle image or placeholder */}
      <div className="bg-surface-container-lowest rounded-xl p-4 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">draw</span>
            <span className="text-base font-semibold text-on-surface">
              Architecture Sketch
            </span>
          </div>
        </div>
        <div className="w-full rounded-xl bg-surface-container p-4">
          {lab.doodleImage ? (
            <img
              src={lab.doodleImage}
              alt={`Doodle for Lab ${paddedNum}`}
              className="w-full rounded-lg"
            />
          ) : (
            <div className="w-full h-44 rounded-lg border-2 border-dashed border-outline-variant flex flex-col items-center justify-center text-center">
              <span className="material-symbols-outlined text-outline text-[32px] mb-2">
                draw
              </span>
              <span className="text-[13px] font-medium text-on-surface-variant">
                No doodle yet
              </span>
              <span className="text-[11px] text-outline uppercase tracking-wider mt-0.5">
                Architectural sketch pending
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-surface-container-lowest rounded-xl px-2 pt-2 shadow-sm">
        <nav className="flex gap-2 overflow-x-auto" aria-label="Tabs">
          {tabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`relative px-3.5 py-2.5 text-[13px] font-medium transition-colors whitespace-nowrap ${
                activeTab === tab.key
                  ? 'text-primary font-semibold'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              {tab.label}
              {activeTab === tab.key && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab content: Notes & Summary */}
      {activeTab === 'summary' && (
        <div className="flex flex-col gap-4">
          {/* Ingested Notes from content/labs/ (read-only) */}
          {lab.ingestedNotes && (
            <div className="bg-surface-container-lowest rounded-xl p-5 shadow-sm flex flex-col gap-4 border border-outline-variant/10">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">article</span>
                  <h3 className="text-base font-semibold text-on-surface">
                    Ingested Lab Notes
                  </h3>
                  <span className="px-2 py-0.5 rounded-full bg-tertiary/10 text-tertiary text-[10px] font-semibold">
                    From Content
                  </span>
                </div>

                {lab.notesDocxUrl && (
                  <a
                    href={lab.notesDocxUrl}
                    download={`Lab-${paddedNum}-Notes.docx`}
                    className="inline-flex items-center gap-1.5 py-1 px-2.5 rounded-lg text-xs font-semibold bg-primary text-on-primary hover:bg-secondary transition-colors shadow-sm"
                  >
                    <span className="material-symbols-outlined text-[15px]">download</span>
                    <span>Download Notes</span>
                  </a>
                )}
              </div>
              <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/10">
                {lab.ingestedNotesFormat === 'html' ? (
                  <HtmlView content={lab.ingestedNotes} />
                ) : (
                  <MarkdownView content={lab.ingestedNotes} />
                )}
              </div>
            </div>
          )}

          {/* Paraphrased Study Notes — editable & persisted to localStorage */}
          <div className="bg-surface-container-lowest rounded-xl p-5 shadow-sm flex flex-col gap-4 border border-outline-variant/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">menu_book</span>
                <h3 className="text-base font-semibold text-on-surface">
                  Paraphrased Study Notes
                </h3>
              </div>
              {!isEditingNotes && (
                <button
                  onClick={() => setIsEditingNotes(true)}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-xs font-semibold text-on-surface transition-colors"
                >
                  <span className="material-symbols-outlined text-[16px]">edit</span>
                  <span>{noteText ? 'Edit Notes' : 'Write Notes'}</span>
                </button>
              )}
            </div>

            {isEditingNotes ? (
              <div className="flex flex-col gap-3">
                <textarea
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  placeholder="Write your study notes, key takeaways, and exam reminders for this lab here. They are automatically saved to your browser..."
                  rows={6}
                  className="w-full p-3.5 rounded-xl bg-surface-container-low border border-outline-variant/30 text-sm text-on-surface outline-none focus:border-primary transition-colors resize-y font-sans leading-relaxed"
                />
                <div className="flex items-center gap-2 justify-end">
                  <button
                    onClick={() => {
                      setNoteText(lab.studentNotes || lab.summary || '');
                      setIsEditingNotes(false);
                    }}
                    className="px-3.5 py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-xs font-semibold text-on-surface transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveNotes}
                    className="inline-flex items-center gap-1 px-4 py-1.5 rounded-lg bg-primary hover:bg-secondary text-xs font-semibold text-on-primary transition-colors shadow-sm"
                  >
                    <span className="material-symbols-outlined text-[16px]">save</span>
                    <span>Save Notes</span>
                  </button>
                </div>
              </div>
            ) : noteText ? (
              <div className="p-4 rounded-xl bg-surface-container-low text-sm text-on-surface-variant whitespace-pre-wrap leading-relaxed border border-outline-variant/10">
                {noteText}
              </div>
            ) : (
              <div className="p-6 rounded-xl border-2 border-dashed border-outline-variant flex flex-col items-center justify-center text-center">
                <span className="material-symbols-outlined text-outline text-[28px] mb-2">
                  edit_note
                </span>
                <span className="text-[13px] font-medium text-on-surface-variant">
                  Study notes not yet written
                </span>
                <span className="text-[11px] text-outline mt-0.5 mb-3">
                  Write your personal notes for this lab to save in your browser.
                </span>
                <button
                  onClick={() => setIsEditingNotes(true)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-primary text-on-primary text-xs font-semibold shadow-sm hover:bg-secondary transition-colors"
                >
                  <span className="material-symbols-outlined text-[16px]">add</span>
                  <span>Write Study Notes</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab content: Important Links */}
      {activeTab === 'links' && (
        <div className="flex flex-col gap-3">
          <div className="bg-surface-container-lowest rounded-xl p-4 shadow-sm flex flex-col gap-3">
            <h3 className="text-base font-semibold text-on-surface">
              Key Documentation &amp; Assets
            </h3>

            {/* Lab guide is always first link */}
            {lab.sourceUrl && (
              <a
                href={lab.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-lg bg-surface-container-low hover:bg-surface-container transition-colors flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary">article</span>
                  <div className="flex flex-col">
                    <span className="text-[13px] font-semibold text-on-surface">
                      Official Lab Guide
                    </span>
                    <span className="text-[13px] text-on-surface-variant">
                      Microsoft Learn walkthrough
                    </span>
                  </div>
                </div>
                <span className="material-symbols-outlined text-on-surface-variant text-[20px]">
                  chevron_right
                </span>
              </a>
            )}

            {/* Placeholder for additional links */}
            <div className="p-4 rounded-lg border-2 border-dashed border-outline-variant flex items-center justify-center text-center">
              <span className="text-[13px] text-on-surface-variant">
                Add important links to the lab data to populate this section
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Status control + Next lab */}
      <div className="flex flex-col gap-3 mt-2">
        <div className="flex items-center gap-3">
          <button
            onClick={cycleStatus}
            className="flex-1 py-3 px-4 rounded-xl bg-surface-container-high text-primary hover:bg-surface-variant transition-all text-[13px] font-semibold flex items-center justify-center gap-2 shadow-sm"
          >
            <span className="material-symbols-outlined text-[20px]">
              {statusButtonIcon()}
            </span>
            <span>{statusButtonLabel()}</span>
          </button>
          {nextLab && (
            <Link
              to={`/lab/${nextLab.id}`}
              className="flex-1 py-3 px-4 rounded-xl bg-primary text-on-primary hover:bg-secondary transition-all text-[13px] font-semibold flex items-center justify-center gap-2 shadow-sm"
            >
              <span>Next: Lab {String(nextLab.number).padStart(2, '0')}</span>
              <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
