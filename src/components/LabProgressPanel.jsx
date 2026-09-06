import { Link } from 'react-router-dom';

export default function LabProgressPanel({ labs, platformTitle = 'Azure Portal' }) {
  const total = labs.length;
  const notStarted = labs.filter(l => l.status === 'not-started').length;
  const inProgress = labs.filter(l => l.status === 'in-progress').length;
  const done = labs.filter(l => l.status === 'done').length;

  const percent = total > 0 ? Math.round((done / total) * 100) : 0;
  const inProgressLab = labs.find(l => l.status === 'in-progress');

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* ─── Continue Where You Left Off (Optional) ───────── */}
      {inProgressLab && (
        <div className="bg-surface-container-lowest rounded-2xl p-5 shadow-sm border border-primary/20 flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
            </span>
            <span className="text-[11px] font-semibold text-primary uppercase tracking-wider">
              Continue Where You Left Off
            </span>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary-fixed text-primary font-semibold text-sm flex items-center justify-center shrink-0">
              {String(inProgressLab.number).padStart(2, '0')}
            </div>
            <div className="flex flex-col min-w-0">
              <h3 className="text-sm font-semibold text-on-surface line-clamp-2 leading-snug">
                {inProgressLab.title}
              </h3>
              <span className="text-xs text-on-surface-variant mt-0.5">
                Lab {String(inProgressLab.number).padStart(2, '0')} in progress
              </span>
            </div>
          </div>

          <Link
            to={`/lab/${inProgressLab.id}`}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-primary text-on-primary font-semibold text-[13px] hover:bg-secondary active:scale-[0.99] transition-all shadow-sm mt-1"
          >
            <span>Resume Notes</span>
            <span className="material-symbols-outlined text-[18px]">play_arrow</span>
          </Link>
        </div>
      )}

      {/* ─── Progress Overview Card ──────────────────────── */}
      <div className="bg-surface-container-lowest rounded-2xl p-5 shadow-sm border border-outline-variant/10 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[22px]">
              donut_large
            </span>
            <h3 className="text-base font-semibold text-on-surface">
              Progress Overview
            </h3>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-surface-container text-on-surface-variant font-mono">
            {percent}%
          </span>
        </div>

        {/* Progress bar */}
        <div className="flex flex-col gap-1.5">
          <div className="w-full h-2.5 bg-surface-container rounded-full overflow-hidden flex">
            {done > 0 && (
              <div
                style={{ width: `${(done / total) * 100}%` }}
                className="bg-tertiary transition-all duration-500 rounded-full"
                title={`${done} completed`}
              />
            )}
            {inProgress > 0 && (
              <div
                style={{ width: `${(inProgress / total) * 100}%` }}
                className="bg-primary transition-all duration-500 rounded-full"
                title={`${inProgress} in progress`}
              />
            )}
          </div>
          <div className="flex items-center justify-between text-xs text-on-surface-variant">
            <span>
              {done} of {total} completed
            </span>
            {inProgress > 0 && (
              <span className="text-primary font-medium">
                {inProgress} active
              </span>
            )}
          </div>
        </div>

        {/* Breakdown counters */}
        <div className="grid grid-cols-3 gap-2 pt-1 border-t border-outline-variant/10">
          <div className="flex flex-col items-center p-2.5 rounded-xl bg-surface-container-low text-center">
            <span className="text-lg font-bold text-outline font-mono">
              {notStarted}
            </span>
            <span className="text-[11px] font-medium text-on-surface-variant mt-0.5">
              Not Started
            </span>
          </div>

          <div className="flex flex-col items-center p-2.5 rounded-xl bg-primary/5 text-center">
            <span className="text-lg font-bold text-primary font-mono">
              {inProgress}
            </span>
            <span className="text-[11px] font-medium text-primary mt-0.5">
              In Progress
            </span>
          </div>

          <div className="flex flex-col items-center p-2.5 rounded-xl bg-tertiary/5 text-center">
            <span className="text-lg font-bold text-tertiary font-mono">
              {done}
            </span>
            <span className="text-[11px] font-medium text-tertiary mt-0.5">
              Completed
            </span>
          </div>
        </div>

        {/* Platform summary */}
        <div className="flex items-center justify-between text-[11px] text-on-surface-variant font-medium pt-1">
          <span>Track: {platformTitle}</span>
          <span>Total: {total} {total === 1 ? 'lab' : 'labs'}</span>
        </div>
      </div>
    </div>
  );
}
