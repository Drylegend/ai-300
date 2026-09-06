import { useState, useRef } from 'react';
import { useProgress } from '../context/ProgressContext';
import { isLocalStorageAvailable } from '../utils/storage';

export default function ProgressSettingsModal({ isOpen, onClose }) {
  const { progress, labs, resetAllProgress, exportProgress, importProgress } = useProgress();
  const [importStatus, setImportStatus] = useState(null);
  const [confirmReset, setConfirmReset] = useState(false);
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  const storageWorking = isLocalStorageAvailable();
  const completedCount = labs.filter(l => l.status === 'done').length;
  const inProgressCount = labs.filter(l => l.status === 'in-progress').length;
  const notesCount = Object.values(progress.labs || {}).filter(l => l?.notes && l.notes.trim()).length;

  function handleFileChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result;
      if (typeof content === 'string') {
        const res = importProgress(content);
        if (res.success) {
          setImportStatus({ type: 'success', msg: `Successfully imported progress!` });
        } else {
          setImportStatus({ type: 'error', msg: `Import failed: ${res.error}` });
        }
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  }

  function handleReset() {
    resetAllProgress();
    setConfirmReset(false);
    setImportStatus({ type: 'success', msg: 'All progress reset to defaults.' });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-inverse-surface/40 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-surface-container-lowest rounded-2xl p-6 shadow-xl border border-outline-variant/15 flex flex-col gap-5">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-outline-variant/10">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-primary-fixed text-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">
                sync_saved_locally
              </span>
            </div>
            <div>
              <h3 className="text-base font-semibold text-on-surface">
                Student Progress &amp; Storage
              </h3>
              <span className="text-xs text-on-surface-variant">
                Browser local storage (device-specific)
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-outline hover:text-on-surface hover:bg-surface-container transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Current State Summary */}
        <div className="p-3.5 rounded-xl bg-surface-container-low flex flex-col gap-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-on-surface-variant font-medium">Storage Engine:</span>
            <span className={`font-semibold flex items-center gap-1 ${storageWorking ? 'text-tertiary' : 'text-error'}`}>
              <span className="material-symbols-outlined text-[14px]">
                {storageWorking ? 'check_circle' : 'error'}
              </span>
              {storageWorking ? 'localStorage Active' : 'In-Memory Fallback'}
            </span>
          </div>
          <div className="flex items-center justify-between text-xs pt-1 border-t border-outline-variant/10">
            <span className="text-on-surface-variant">Saved Progress:</span>
            <span className="font-semibold text-on-surface font-mono">
              {completedCount} Done · {inProgressCount} In Progress · {notesCount} Notes
            </span>
          </div>
          <div className="text-[11px] text-outline pt-0.5">
            Key: <code className="font-mono text-primary">mlops-portal:progress:v1</code>
          </div>
        </div>

        {/* Status notification */}
        {importStatus && (
          <div
            className={`p-3 rounded-lg text-xs font-medium flex items-center justify-between ${
              importStatus.type === 'success'
                ? 'bg-tertiary/10 text-tertiary'
                : 'bg-error-container text-on-error-container'
            }`}
          >
            <span>{importStatus.msg}</span>
            <button
              onClick={() => setImportStatus(null)}
              className="material-symbols-outlined text-[16px] ml-2"
            >
              close
            </button>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col gap-2.5">
          <div className="grid grid-cols-2 gap-2.5">
            {/* Export */}
            <button
              onClick={exportProgress}
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-semibold text-xs transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">download</span>
              <span>Export Progress</span>
            </button>

            {/* Import */}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-semibold text-xs transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">upload</span>
              <span>Import Progress</span>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="application/json"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>

          {/* Reset */}
          {!confirmReset ? (
            <button
              onClick={() => setConfirmReset(true)}
              className="w-full flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-surface-container-low hover:bg-error-container hover:text-on-error-container text-outline font-semibold text-xs transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">restart_alt</span>
              <span>Reset All Progress</span>
            </button>
          ) : (
            <div className="p-3 rounded-xl bg-error-container text-on-error-container flex flex-col gap-2">
              <span className="text-xs font-semibold">
                Are you sure? This resets all lab statuses, notes, and progress on this browser.
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleReset}
                  className="flex-1 py-1.5 rounded-lg bg-error text-on-error font-semibold text-xs"
                >
                  Yes, Reset
                </button>
                <button
                  onClick={() => setConfirmReset(false)}
                  className="flex-1 py-1.5 rounded-lg bg-surface-container text-on-surface font-semibold text-xs"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="pt-2 border-t border-outline-variant/10 text-center">
          <span className="text-[11px] text-outline">
            Progress automatically syncs across tabs and persists between sessions.
          </span>
        </div>
      </div>
    </div>
  );
}
