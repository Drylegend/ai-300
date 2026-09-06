const STATUS_CONFIG = {
  'not-started': {
    label: 'Not Started',
    icon: null,
    classes: 'bg-surface-container text-outline',
  },
  'in-progress': {
    label: 'In Progress',
    icon: 'sync',
    classes: 'bg-secondary/10 text-secondary',
  },
  'done': {
    label: 'Completed',
    icon: 'check_circle',
    classes: 'bg-tertiary/10 text-tertiary',
  },
};

export default function StatusBadge({ status }) {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG['not-started'];

  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold shrink-0 ${config.classes}`}
    >
      {config.icon && (
        <span className="material-symbols-outlined text-[14px]">
          {config.icon}
        </span>
      )}
      {config.label}
    </span>
  );
}
