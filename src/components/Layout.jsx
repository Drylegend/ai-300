import { useState } from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { COURSE_CONFIG } from '../config';
import { getAllDays } from '../data/days';
import ProgressSettingsModal from './ProgressSettingsModal';

function pageLabel(pathname) {
  if (pathname.startsWith('/days')) return 'Course Days';
  if (pathname.startsWith('/foundry')) return 'Foundry Labs';
  if (pathname.startsWith('/doodles')) return 'Lab Doodles';
  if (pathname.startsWith('/lab/')) return 'Study Notes';
  return 'Azure Portal Labs';
}

export default function Layout() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const location = useLocation();
  const label = pageLabel(location.pathname);
  const days = getAllDays();

  return (
    <div className="flex flex-col min-h-screen bg-surface text-on-surface font-sans text-sm">
      {/* ─── Header ──────────────────────────────────────── */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-surface-container-lowest/90 backdrop-blur-xl pt-safe shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-outline-variant/15">
        <div className="h-28 md:h-16 px-4 md:px-6 flex flex-col md:flex-row justify-between md:items-center py-1 md:py-0">
          {/* Top bar (mobile) / Main bar (desktop) */}
          <div className="flex items-center justify-between gap-3 h-14 md:h-full">
            <div className="flex items-center gap-2">
              {/* Hamburger: mobile only */}
              <button
                aria-label="Open menu"
                className="w-10 h-10 flex md:hidden items-center justify-center rounded-lg text-on-surface-variant hover:bg-surface-container active:bg-surface-container-high transition-colors shrink-0"
                onClick={() => setDrawerOpen(true)}
              >
                <span className="material-symbols-outlined text-[24px]">menu</span>
              </button>
              <img
                alt="Class Notes Logo"
                className="h-8 w-auto object-contain shrink-0"
                src={COURSE_CONFIG.logoUrl}
              />
              <div className="flex flex-col ml-1 min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-base font-semibold text-on-surface leading-none">
                    {COURSE_CONFIG.title}
                  </span>
                  <span className="text-xs font-semibold text-primary leading-none">
                    {label}
                  </span>
                </div>
                <span className="text-[11px] font-semibold text-on-surface-variant uppercase tracking-wider truncate">
                  {COURSE_CONFIG.subtitle}
                </span>
              </div>
            </div>

            {/* Desktop search bar and settings button */}
            <div className="hidden md:flex items-center gap-2">
              <div className="flex items-center w-72 lg:w-96 h-10 px-3 rounded-lg bg-surface-container-low text-on-surface-variant shrink-0">
                <span className="material-symbols-outlined text-outline mr-2 text-[20px]">
                  search
                </span>
                <input
                  className="w-full bg-transparent border-none outline-none text-[13px] text-on-surface placeholder:text-outline"
                  placeholder="Search labs & notes..."
                  type="text"
                />
              </div>
              <button
                onClick={() => setSettingsOpen(true)}
                title="Student Progress & Storage"
                className="w-10 h-10 flex items-center justify-center rounded-lg text-on-surface-variant hover:bg-surface-container active:bg-surface-container-high transition-colors shrink-0"
              >
                <span className="material-symbols-outlined text-[20px]">tune</span>
              </button>
            </div>
          </div>

          {/* Mobile search bar: second row on mobile, hidden on desktop */}
          <div className="pb-1 md:hidden">
            <div className="flex items-center w-full h-10 px-3 rounded-lg bg-surface-container-low text-on-surface-variant">
              <span className="material-symbols-outlined text-outline mr-2 text-[20px]">
                search
              </span>
              <input
                className="w-full bg-transparent border-none outline-none text-[13px] text-on-surface placeholder:text-outline"
                placeholder="Search labs & notes..."
                type="text"
              />
            </div>
          </div>
        </div>
      </header>

      {/* ─── Drawer backdrop (mobile only) ──────────────── */}
      {drawerOpen && (
        <div
          className="fixed inset-0 bg-inverse-surface/40 backdrop-blur-sm z-40 md:hidden transition-opacity"
          onClick={() => setDrawerOpen(false)}
        />
      )}

      {/* ─── Sidebar: Statically docked on desktop / Slide drawer on mobile ─── */}
      <aside
        className={`fixed top-0 left-0 bottom-0 w-[280px] max-w-[85vw] md:max-w-none md:w-64 lg:w-72 bg-surface-container-lowest z-50 md:z-30 border-r border-outline-variant/15 flex flex-col pt-safe pb-safe transition-transform duration-300 ease-in-out md:translate-x-0 md:top-16 shadow-[0_20px_25px_-5px_rgba(15,23,42,0.1)] md:shadow-none ${
          drawerOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Mobile drawer header (hidden on desktop) */}
        <div className="p-4 flex items-center justify-between md:hidden border-b border-outline-variant/10">
          <div className="flex items-center gap-2">
            <img alt="Logo" className="h-8 w-auto object-contain" src={COURSE_CONFIG.logoUrl} />
            <div className="flex flex-col min-w-0">
              <span className="text-base font-semibold text-on-surface leading-tight">
                {COURSE_CONFIG.title}
              </span>
              <span className="text-[11px] font-semibold text-on-surface-variant uppercase truncate">
                {COURSE_CONFIG.subtitle}
              </span>
            </div>
          </div>
          <button
            aria-label="Close menu"
            className="w-10 h-10 flex items-center justify-center text-on-surface-variant hover:bg-surface-container rounded-lg"
            onClick={() => setDrawerOpen(false)}
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Navigation links */}
        <div className="flex-1 overflow-y-auto px-4 py-4 md:py-6 space-y-6">
          {/* Course Days section (dynamically loaded from /content/days/) */}
          {days.length > 0 && (
            <div>
              <span className="text-[11px] font-semibold text-outline uppercase tracking-wider block px-2 mb-2">
                Course Days
              </span>
              <div className="space-y-1">
                {days.map(day => (
                  <NavLink
                    key={day.slug}
                    to={`/days/${day.slug}`}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-medium transition-colors ${
                        isActive
                          ? 'bg-primary-fixed/50 text-primary font-semibold'
                          : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
                      }`
                    }
                    onClick={() => setDrawerOpen(false)}
                  >
                    <span className="material-symbols-outlined text-[20px]">calendar_today</span>
                    <span>{day.title}</span>
                  </NavLink>
                ))}
              </div>
            </div>
          )}

          {/* Labs section */}
          <div>
            <span className="text-[11px] font-semibold text-outline uppercase tracking-wider block px-2 mb-2">
              Labs
            </span>
            <div className="space-y-1">
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-medium transition-colors ${
                    isActive
                      ? 'bg-primary-fixed/50 text-primary font-semibold'
                      : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
                  }`
                }
                onClick={() => setDrawerOpen(false)}
              >
                <span className="material-symbols-outlined text-[20px]">terminal</span>
                <span>Azure Portal Labs</span>
              </NavLink>
              <NavLink
                to="/foundry"
                className={({ isActive }) =>
                  `flex items-center justify-between px-3 py-2.5 rounded-lg text-[13px] font-medium transition-colors ${
                    isActive
                      ? 'bg-primary-fixed/50 text-primary font-semibold'
                      : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
                  }`
                }
                onClick={() => setDrawerOpen(false)}
              >
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[20px]">psychology</span>
                  <span>Foundry Labs</span>
                </div>
              </NavLink>
            </div>
          </div>

          {/* Visual Notes */}
          <div>
            <span className="text-[11px] font-semibold text-outline uppercase tracking-wider block px-2 mb-2">
              Visual Notes
            </span>
            <div className="space-y-1">
              <NavLink
                to="/doodles"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-medium transition-colors ${
                    isActive
                      ? 'bg-primary-fixed/50 text-primary font-semibold'
                      : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
                  }`
                }
                onClick={() => setDrawerOpen(false)}
              >
                <span className="material-symbols-outlined text-[20px]">draw</span>
                <span>Lab Doodles &amp; Sketches</span>
              </NavLink>
            </div>
          </div>
        </div>

        {/* Sidebar settings / storage footer */}
        <div className="p-3 mt-auto border-t border-outline-variant/10">
          <button
            onClick={() => {
              setSettingsOpen(true);
              setDrawerOpen(false);
            }}
            className="w-full flex items-center justify-between p-2 rounded-xl text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors text-xs font-medium group"
          >
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-primary group-hover:scale-105 transition-transform">
                sync_saved_locally
              </span>
              <span>Progress &amp; Backup</span>
            </div>
            <span className="material-symbols-outlined text-[16px] text-outline">
              tune
            </span>
          </button>
        </div>

      </aside>

      {/* ─── Main content ────────────────────────────────── */}
      <main className="flex flex-col relative w-full pt-28 md:pt-20 pb-20 md:pb-12 px-4 md:px-8 md:pl-72 lg:pl-80 bg-surface min-h-screen">
        <div className="flex flex-col w-full space-y-6">
          <Outlet />
        </div>
      </main>

      {/* ─── Bottom navigation (mobile only) ─────────────── */}
      <nav className="fixed bottom-0 left-0 right-0 z-30 pb-safe bg-surface-container-lowest/90 backdrop-blur-xl shadow-[0_-1px_12px_rgba(0,0,0,0.06)] border-t border-outline-variant/10 md:hidden">
        <div className="flex justify-around items-center h-16 px-2">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `flex flex-col items-center justify-center gap-1 min-w-[64px] min-h-[44px] transition-colors ${
                isActive ? 'text-primary font-semibold' : 'text-on-surface-variant hover:text-on-surface'
              }`
            }
          >
            <span className="material-symbols-outlined">biotech</span>
            <span className="text-xs">Labs</span>
          </NavLink>
          <NavLink
            to="/doodles"
            className={({ isActive }) =>
              `flex flex-col items-center justify-center gap-1 min-w-[64px] min-h-[44px] transition-colors ${
                isActive ? 'text-primary font-semibold' : 'text-on-surface-variant hover:text-on-surface'
              }`
            }
          >
            <span className="material-symbols-outlined">draw</span>
            <span className="text-xs">Doodles</span>
          </NavLink>
          <NavLink
            to="/foundry"
            className={({ isActive }) =>
              `flex flex-col items-center justify-center gap-1 min-w-[64px] min-h-[44px] transition-colors ${
                isActive ? 'text-primary font-semibold' : 'text-on-surface-variant hover:text-on-surface'
              }`
            }
          >
            <span className="material-symbols-outlined">psychology</span>
            <span className="text-xs">Foundry</span>
          </NavLink>
        </div>
      </nav>

      {/* ─── Settings & Storage Modal ────────────────────── */}
      <ProgressSettingsModal
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
      />
    </div>
  );
}
