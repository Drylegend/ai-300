import { useState } from 'react';
import useLabState from '../hooks/useLabState';
import DoodleCard from '../components/DoodleCard';
import { COURSE_CONFIG } from '../config';

export default function LabDoodles() {
  const { labs } = useLabState();
  const [filter, setFilter] = useState('all');

  const filtered =
    filter === 'all'
      ? labs
      : labs.filter(lab => lab.platform === filter);

  const portalCount = labs.filter(l => l.platform === 'azure-portal').length;
  const foundryCount = labs.filter(l => l.platform === 'foundry').length;

  const tabs = [
    { key: 'all', label: 'All Labs', count: labs.length },
    { key: 'azure-portal', label: 'Azure Portal', count: portalCount },
    { key: 'foundry', label: 'Foundry', count: foundryCount },
  ];

  return (
    <>
      {/* Breadcrumb */}
      <div className="flex flex-col gap-1.5">
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
          <span>Visual Notes</span>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <span className="text-primary font-semibold">Lab Doodles</span>
        </div>
        <h1 className="text-xl font-semibold text-on-surface">
          Architectural Doodles &amp; Visual Cheat Sheets
        </h1>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-4 overflow-x-auto">
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            className={`pb-2 text-[13px] font-medium relative flex items-center gap-1.5 whitespace-nowrap transition-colors ${
              filter === tab.key
                ? 'text-primary font-semibold'
                : 'text-outline hover:text-on-surface'
            }`}
          >
            <span>{tab.label}</span>
            <span
              className={`px-1.5 py-0.5 rounded-full font-mono text-[12px] ${
                filter === tab.key
                  ? 'bg-primary-fixed text-on-primary-fixed-variant'
                  : 'bg-surface-container text-on-surface-variant'
              }`}
            >
              {tab.count}
            </span>
            {filter === tab.key && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
            )}
          </button>
        ))}
      </div>

      {/* Doodle Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-2 gap-3.5">
          {filtered.map(lab => (
            <DoodleCard key={lab.id} lab={lab} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <span className="material-symbols-outlined text-outline text-[48px] mb-3">draw</span>
          <p className="text-[13px] text-on-surface-variant">
            No doodles available for this filter.
          </p>
        </div>
      )}
    </>
  );
}
