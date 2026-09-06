import useLabState from '../hooks/useLabState';
import LabCard from '../components/LabCard';
import PlatformSwitcher from '../components/PlatformSwitcher';
import EmptyState from '../components/EmptyState';
import LabProgressPanel from '../components/LabProgressPanel';
import { COURSE_CONFIG } from '../config';

export default function FoundryLabs() {
  const { getLabsByPlatform } = useLabState();
  const labs = getLabsByPlatform('foundry');

  return (
    <>
      {/* Breadcrumb */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-1.5 text-on-surface-variant text-[11px] font-semibold uppercase tracking-wider">
          <a
            href={COURSE_CONFIG.courseUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors flex items-center gap-1 group"
          >
            <span>Azure MLOps</span>
            <span className="material-symbols-outlined text-[12px] opacity-70 group-hover:opacity-100">
              open_in_new
            </span>
          </a>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <span>Labs</span>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <span className="text-primary font-semibold">Foundry</span>
        </div>
      </div>

      {/* Platform Switcher */}
      <PlatformSwitcher />

      {/* Main layout: Fluid 7:3 two-column grid on desktop, stacked on mobile */}
      <div className="grid grid-cols-1 lg:grid-cols-[7fr_3fr] gap-6 w-full items-start">
        {/* Left column: Lab cards or Empty State (7fr) */}
        <div className="flex flex-col space-y-4 w-full min-w-0 order-2 lg:order-1">
          {labs.length > 0 ? (
            labs.map(lab => (
              <LabCard key={lab.id} lab={lab} />
            ))
          ) : (
            <EmptyState platform="foundry" />
          )}
        </div>

        {/* Right column: Sticky progress & resume panel (3fr) */}
        <div className="w-full lg:sticky lg:top-20 order-1 lg:order-2 min-w-0">
          <LabProgressPanel labs={labs} platformTitle="Foundry" />
        </div>
      </div>
    </>
  );
}
