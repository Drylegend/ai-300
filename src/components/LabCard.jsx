import { Link } from 'react-router-dom';
import StatusBadge from './StatusBadge';

export default function LabCard({ lab }) {
  const paddedNum = String(lab.number).padStart(2, '0');

  return (
    <div className="flex flex-col bg-surface-container-lowest rounded-2xl p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 space-y-4">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-primary-fixed flex items-center justify-center text-primary font-semibold text-base shrink-0">
            {paddedNum}
          </div>
          <div>
            <h2 className="text-base font-semibold text-on-surface leading-snug">
              {lab.title || <span className="text-outline italic">Untitled Lab</span>}
            </h2>
          </div>
        </div>
        <StatusBadge status={lab.status} />
      </div>

      {/* Platform tag */}
      <div className="flex flex-wrap items-center gap-1.5">
        <span className="px-2.5 py-1 rounded-md bg-surface-container text-on-surface-variant text-xs font-medium">
          {lab.platform === 'azure-portal' ? 'Azure Portal' : 'AI Foundry'}
        </span>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 pt-1">
        <a
          href={lab.sourceUrl || '#'}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-[13px] font-semibold transition-colors ${
            lab.sourceUrl
              ? 'bg-surface-container hover:bg-surface-container-high text-on-surface'
              : 'bg-surface-container text-outline cursor-not-allowed'
          }`}
        >
          <span>Open Lab Guide</span>
          <span className="material-symbols-outlined text-[16px]">open_in_new</span>
        </a>
        <Link
          to={`/lab/${lab.id}`}
          className="flex items-center justify-center gap-1 py-2 px-3 rounded-lg bg-primary-fixed text-primary hover:bg-primary hover:text-on-primary text-[13px] font-semibold transition-all"
        >
          <span>Notes</span>
          <span className="material-symbols-outlined text-[18px]">chevron_right</span>
        </Link>
      </div>
    </div>
  );
}
