import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getAllDays, getDayBySlug } from '../data/days';
import { COURSE_CONFIG } from '../config';
import { useProgress } from '../context/ProgressContext';
import MarkdownView from '../components/MarkdownView';
import HtmlView from '../components/HtmlView';
import DocxView from '../components/DocxView';

/** Renders content in DOCX, HTML, or Markdown format based on the format field. */
function ContentRenderer({ content, format, filename }) {
  if (format === 'docx') {
    return <DocxView fileUrl={content} filename={filename} />;
  }
  if (format === 'html') {
    return <HtmlView content={content} />;
  }
  return <MarkdownView content={content} />;
}

export default function CourseDayPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const days = getAllDays();
  const day = getDayBySlug(slug);
  const { getDayProgress, markDayTranscript, markDaySummary } = useProgress();
  const dayProgress = getDayProgress(day?.slug);

  const [activeTab, setActiveTab] = useState('transcripts');
  const [expandedTranscripts, setExpandedTranscripts] = useState({});

  if (!day) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <span className="material-symbols-outlined text-outline text-[48px] mb-3">
          calendar_today
        </span>
        <h2 className="text-lg font-semibold text-on-surface mb-1">Day Not Found</h2>
        <p className="text-[13px] text-on-surface-variant mb-4">
          The requested course day &ldquo;{slug}&rdquo; does not exist in the content directory.
        </p>
        <Link
          to="/"
          className="px-4 py-2 rounded-lg bg-primary text-on-primary text-[13px] font-semibold"
        >
          Return to Labs
        </Link>
      </div>
    );
  }

  const paddedNum = String(day.dayNumber).padStart(2, '0');

  // Find next and previous days
  const currentIndex = days.findIndex(d => d.slug === day.slug);
  const prevDay = currentIndex > 0 ? days[currentIndex - 1] : null;
  const nextDay = currentIndex >= 0 && currentIndex < days.length - 1 ? days[currentIndex + 1] : null;

  function toggleTranscript(id) {
    setExpandedTranscripts(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  }

  const tabs = [
    { key: 'transcripts', label: 'Transcripts', count: day.transcripts.length },
    { key: 'summary', label: 'Summary', count: null },
    { key: 'links', label: 'Important Links', count: day.links.length },
  ];

  return (
    <>
      {/* ─── Breadcrumb & Back ──────────────────────────── */}
      <div className="flex items-center justify-between py-1 flex-wrap gap-2">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors text-[13px] font-medium"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          <span>Back</span>
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
          <span>COURSE DAYS</span>
          <span>•</span>
          <span className="text-primary font-semibold">{day.title.toUpperCase()}</span>
        </div>
      </div>

      {/* ─── Day Header Card ────────────────────────────── */}
      <div className="bg-surface-container-lowest rounded-2xl p-5 md:p-6 shadow-sm border border-outline-variant/10 flex flex-col gap-3">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary-fixed text-primary text-xl font-bold flex items-center justify-center shrink-0 shadow-sm">
            {paddedNum}
          </div>
          <div className="flex flex-col min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                Class Session {day.dayNumber}
              </span>
              {day.transcripts.length > 0 && (
                <span className="px-2.5 py-0.5 rounded-full bg-surface-container text-on-surface-variant text-xs font-medium">
                  {day.transcripts.length} {day.transcripts.length === 1 ? 'Transcript' : 'Transcripts'}
                </span>
              )}
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-on-surface tracking-tight">
              {day.title}
              {day.subtitle && (
                <span className="font-normal text-on-surface-variant text-base md:text-lg block md:inline md:ml-2">
                  — {day.subtitle}
                </span>
              )}
            </h1>
            {day.description && (
              <p className="text-[13px] text-on-surface-variant mt-1.5 leading-relaxed">
                {day.description}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* ─── Underline Tabs Navigation ──────────────────── */}
      <div className="bg-surface-container-lowest rounded-xl px-2 pt-2 shadow-sm border border-outline-variant/10">
        <nav className="flex gap-2 overflow-x-auto" aria-label="Day tabs">
          {tabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`relative px-4 py-2.5 text-[13px] font-medium transition-colors whitespace-nowrap flex items-center gap-2 ${
                activeTab === tab.key
                  ? 'text-primary font-semibold'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <span>{tab.label}</span>
              {tab.count !== null && (
                <span
                  className={`px-1.5 py-0.5 rounded-full font-mono text-[11px] ${
                    activeTab === tab.key
                      ? 'bg-primary-fixed text-on-primary-fixed-variant'
                      : 'bg-surface-container text-on-surface-variant'
                  }`}
                >
                  {tab.count}
                </span>
              )}
              {activeTab === tab.key && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* ─── Tab Content 1: Transcripts ─────────────────── */}
      {activeTab === 'transcripts' && (
        <div className="flex flex-col space-y-4">
          {day.transcripts.length > 0 ? (
            day.transcripts.map((transcript, index) => {
              const isExpanded = !!expandedTranscripts[transcript.id];
              const isRead = dayProgress.transcriptsRead?.includes(transcript.id);
              const transcriptPadded = String(index + 1).padStart(2, '0');

              return (
                <div
                  key={transcript.id}
                  className="bg-surface-container-lowest rounded-2xl p-5 shadow-sm border border-outline-variant/10 flex flex-col space-y-4 transition-all"
                >
                  {/* Card Header */}
                  <div className="flex items-start justify-between gap-3 flex-wrap">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-primary-fixed flex items-center justify-center text-primary font-semibold text-base shrink-0">
                        {transcriptPadded}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h2 className="text-base font-semibold text-on-surface leading-snug">
                            {transcript.title}
                          </h2>
                          {isRead && (
                            <span className="px-2 py-0.5 rounded-full bg-tertiary/10 text-tertiary text-[10px] font-semibold">
                              Read
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-outline font-mono">
                          {transcript.filename}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {transcript.fileUrl && (
                        <a
                          href={transcript.fileUrl}
                          download={transcript.filename || `transcript-${transcript.order}.docx`}
                          className="inline-flex items-center gap-1 py-1.5 px-2.5 rounded-lg text-xs font-semibold bg-surface-container text-outline hover:text-on-surface hover:bg-surface-container-high transition-colors"
                          title="Download original document"
                        >
                          <span className="material-symbols-outlined text-[16px]">download</span>
                          <span className="hidden sm:inline">Download</span>
                        </a>
                      )}

                      <button
                        onClick={() => markDayTranscript(day.slug, transcript.id)}
                        className={`inline-flex items-center gap-1 py-1.5 px-2.5 rounded-lg text-xs font-semibold transition-colors ${
                          isRead
                            ? 'bg-tertiary/10 text-tertiary hover:bg-tertiary/20'
                            : 'bg-surface-container text-outline hover:text-on-surface'
                        }`}
                        title={isRead ? 'Mark as Unread' : 'Mark as Read'}
                      >
                        <span className="material-symbols-outlined text-[16px]">
                          {isRead ? 'check_circle' : 'radio_button_unchecked'}
                        </span>
                        <span>{isRead ? 'Read' : 'Mark Read'}</span>
                      </button>

                      <button
                        onClick={() => toggleTranscript(transcript.id)}
                        className={`inline-flex items-center gap-1.5 py-1.5 px-3 rounded-lg text-[13px] font-semibold transition-all ${
                          isExpanded
                            ? 'bg-primary text-on-primary shadow-sm'
                            : 'bg-surface-container hover:bg-surface-container-high text-on-surface'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          {isExpanded ? 'expand_less' : 'menu_book'}
                        </span>
                        <span>{isExpanded ? 'Collapse' : 'Click to Read'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Expanded Reader View */}
                  {isExpanded && (
                    <div className="pt-2 border-t border-outline-variant/10">
                      <div className="p-2 sm:p-4 rounded-xl bg-surface-container-low border border-outline-variant/10">
                        <ContentRenderer
                          content={transcript.content}
                          format={transcript.format}
                          filename={transcript.filename || `transcript-${transcript.order}.docx`}
                        />
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="bg-surface-container-lowest rounded-2xl p-10 text-center border border-outline-variant/10">
              <span className="material-symbols-outlined text-outline text-[40px] mb-2">
                mic_off
              </span>
              <h3 className="text-base font-semibold text-on-surface">No Transcripts Yet</h3>
              <p className="text-[13px] text-on-surface-variant mt-1">
                Drop transcript files (<code className="font-mono text-xs text-primary">transcript-1.docx</code>..4) into <code className="font-mono text-xs text-primary">/content/days/{day.slug}/</code> to populate.
              </p>
            </div>
          )}
        </div>
      )}

      {/* ─── Tab Content 2: Summary ─────────────────────── */}
      {activeTab === 'summary' && (
        <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-outline-variant/10">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-outline-variant/10 flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[22px]">
                summarize
              </span>
              <h2 className="text-base font-semibold text-on-surface">
                Daily Class Summary
              </h2>
            </div>

            {day.summary ? (
              <div className="flex items-center gap-2 flex-wrap">
                {day.summaryDocxUrl && (
                  <a
                    href={day.summaryDocxUrl}
                    download={`Day-${day.dayNumber}-Summary.docx`}
                    className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-semibold bg-primary text-on-primary hover:bg-secondary transition-colors shadow-sm"
                  >
                    <span className="material-symbols-outlined text-[16px]">download</span>
                    <span>Download Summary</span>
                  </a>
                )}

                <button
                  onClick={() => markDaySummary(day.slug)}
                  className={`inline-flex items-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-semibold transition-colors ${
                    dayProgress.summaryRead
                      ? 'bg-tertiary/10 text-tertiary hover:bg-tertiary/20'
                      : 'bg-surface-container text-outline hover:text-on-surface'
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px]">
                    {dayProgress.summaryRead ? 'check_circle' : 'radio_button_unchecked'}
                  </span>
                  <span>{dayProgress.summaryRead ? 'Summary Completed' : 'Mark as Read'}</span>
                </button>
              </div>
            ) : null}
          </div>

          {day.summary ? (
            <ContentRenderer
              content={day.summary}
              format={day.summaryFormat}
              filename={`Day-${paddedNum}-Summary.docx`}
            />
          ) : (
            <div className="p-8 text-center border-2 border-dashed border-outline-variant/20 rounded-xl">
              <span className="material-symbols-outlined text-outline text-[32px] mb-2">
                edit_note
              </span>
              <p className="text-[13px] text-on-surface-variant font-medium">
                No summary uploaded for this day yet.
              </p>
            </div>
          )}
        </div>
      )}

      {/* ─── Tab Content 3: Important Links ─────────────── */}
      {activeTab === 'links' && (
        <div className="flex flex-col space-y-3">
          {day.links.length > 0 ? (
            day.links.map((link, idx) => (
              <a
                key={idx}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-surface-container-lowest rounded-xl p-4 shadow-sm border border-outline-variant/10 hover:border-primary/40 hover:shadow-md transition-all flex items-center justify-between group"
              >
                <div className="flex items-start gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary group-hover:bg-primary-fixed transition-colors shrink-0 mt-0.5">
                    <span className="material-symbols-outlined text-[20px]">
                      link
                    </span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-sm font-semibold text-on-surface group-hover:text-primary transition-colors leading-snug">
                      {link.label}
                    </span>
                    {link.description && (
                      <span className="text-xs text-on-surface-variant mt-0.5 line-clamp-1">
                        {link.description}
                      </span>
                    )}
                    <span className="text-[11px] text-outline truncate mt-1 font-mono">
                      {link.url}
                    </span>
                  </div>
                </div>
                <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors text-[20px] shrink-0 ml-3">
                  open_in_new
                </span>
              </a>
            ))
          ) : (
            <div className="bg-surface-container-lowest rounded-2xl p-10 text-center border border-outline-variant/10">
              <span className="material-symbols-outlined text-outline text-[40px] mb-2">
                link_off
              </span>
              <h3 className="text-base font-semibold text-on-surface">No Links Yet</h3>
              <p className="text-[13px] text-on-surface-variant mt-1">
                Add links to <code className="font-mono text-xs text-primary">links.json</code> in this day&apos;s folder to populate.
              </p>
            </div>
          )}
        </div>
      )}

      {/* ─── Day Navigation (Prev / Next) ───────────────── */}
      <div className="flex items-center gap-3 pt-2">
        {prevDay ? (
          <Link
            to={`/days/${prevDay.slug}`}
            className="flex-1 py-3 px-4 rounded-xl bg-surface-container hover:bg-surface-container-high transition-colors text-[13px] font-semibold flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-[20px]">arrow_back</span>
            <span>Previous: {prevDay.title}</span>
          </Link>
        ) : (
          <div className="flex-1" />
        )}
        {nextDay && (
          <Link
            to={`/days/${nextDay.slug}`}
            className="flex-1 py-3 px-4 rounded-xl bg-primary text-on-primary hover:bg-secondary transition-colors text-[13px] font-semibold flex items-center justify-center gap-2 shadow-sm"
          >
            <span>Next: {nextDay.title}</span>
            <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
          </Link>
        )}
      </div>
    </>
  );
}
