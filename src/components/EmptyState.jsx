export default function EmptyState({ platform = 'foundry' }) {
  return (
    <div className="w-full bg-surface-container-lowest rounded-xl shadow-sm p-8 flex flex-col items-center text-center space-y-4">
      <div className="w-16 h-16 rounded-full bg-surface-container-high flex items-center justify-center text-primary shadow-sm">
        <span className="material-symbols-outlined text-[32px]">science</span>
      </div>

      <div className="flex flex-col space-y-1.5 max-w-sm">
        <h2 className="text-xl font-semibold text-on-surface">
          {platform === 'foundry' ? 'Foundry Labs Start Soon' : 'No Labs Yet'}
        </h2>
        <p className="text-[13px] text-on-surface-variant">
          {platform === 'foundry'
            ? 'Foundry labs will appear here when they are added to the course data. The same card layout and data schema is used — zero UI changes needed.'
            : 'Labs will appear here once they are added to the data.'}
        </p>
      </div>

      <div className="w-full p-3 rounded-xl bg-surface-container flex items-start gap-2.5 text-left max-w-sm">
        <span className="material-symbols-outlined text-primary text-[20px] shrink-0">
          schema
        </span>
        <p className="text-[13px] text-on-surface-variant">
          <strong className="text-on-surface font-medium">Shared data schema: </strong>
          entries automatically bind to <code className="font-mono text-xs text-primary">LabCard</code> &
          <code className="font-mono text-xs text-primary"> DoodleCard</code> components.
        </p>
      </div>
    </div>
  );
}
