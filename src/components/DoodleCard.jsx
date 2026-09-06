import { Link } from 'react-router-dom';

export default function DoodleCard({ lab }) {
  const paddedNum = String(lab.number).padStart(2, '0');
  const hasDoodle = !!lab.doodleImage;

  return (
    <Link
      to={`/lab/${lab.id}`}
      className="flex flex-col bg-surface-container-lowest rounded-xl p-3 shadow-sm hover:shadow-md transition-all active:scale-[0.98] group"
    >
      {/* Image area */}
      <div className="relative w-full aspect-square rounded-lg overflow-hidden">
        {hasDoodle ? (
          <img
            src={lab.doodleImage}
            alt={`Doodle for Lab ${paddedNum}`}
            className="w-full h-full object-cover"
          />
        ) : (
          /* Empty-state placeholder */
          <div className="w-full h-full bg-surface-container border-2 border-dashed border-outline-variant flex flex-col items-center justify-center p-3 text-center rounded-lg">
            <div className="w-11 h-11 rounded-full bg-surface-container-lowest flex items-center justify-center text-outline group-hover:text-primary transition-colors mb-2">
              <span className="material-symbols-outlined text-[24px]">draw</span>
            </div>
            <span className="text-[13px] font-medium text-on-surface-variant">
              No doodle yet
            </span>
            <span className="text-[11px] font-semibold text-outline uppercase tracking-wider mt-0.5">
              Sketch pending
            </span>
          </div>
        )}
      </div>

      {/* Label */}
      <div className="mt-2.5 flex flex-col">
        <div className="flex items-center justify-between gap-1">
          <span className="text-base font-semibold text-on-surface truncate">
            Lab {paddedNum}
          </span>
          <span className="text-[11px] font-semibold text-secondary uppercase tracking-wider">
            {lab.platform === 'azure-portal' ? 'AML' : 'AI-300'}
          </span>
        </div>
        <span className="text-[13px] text-on-surface-variant truncate">
          {lab.title || ''}
        </span>
      </div>
    </Link>
  );
}
