import { useLocation, Link } from 'react-router-dom';

export default function PlatformSwitcher() {
  const location = useLocation();
  const isFoundry = location.pathname === '/foundry';

  return (
    <div className="flex p-1 bg-surface-container rounded-xl">
      <Link
        to="/"
        className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-[13px] font-medium transition-all ${
          !isFoundry
            ? 'bg-surface-container-lowest text-on-surface font-semibold shadow-sm'
            : 'text-on-surface-variant hover:text-on-surface'
        }`}
      >
        <span className={`material-symbols-outlined text-[18px] ${!isFoundry ? 'text-primary' : 'text-outline'}`}>
          view_quilt
        </span>
        <span>Azure Portal</span>
      </Link>
      <Link
        to="/foundry"
        className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-[13px] font-medium transition-all ${
          isFoundry
            ? 'bg-surface-container-lowest text-on-surface font-semibold shadow-sm'
            : 'text-on-surface-variant hover:text-on-surface'
        }`}
      >
        <span className={`material-symbols-outlined text-[18px] ${isFoundry ? 'text-primary' : 'text-outline'}`}>
          psychology
        </span>
        <span>Foundry Labs</span>
      </Link>
    </div>
  );
}
