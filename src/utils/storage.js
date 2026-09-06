/**
 * Storage utility for student progress persistence in browser localStorage.
 * No login or backend needed.
 *
 * Handles:
 * - Lab statuses (not-started, in-progress, done)
 * - Custom student study notes per lab
 * - Course Days completion/read toggles
 * - In-memory fallback if localStorage is disabled or throws
 * - Import / Export / Reset functionality
 */

export const STORAGE_KEY = 'mlops-portal:progress:v1';
export const PROGRESS_EVENT = 'mlops-progress-updated';

// In-memory fallback store when localStorage is unavailable
let memoryStore = null;

export function isLocalStorageAvailable() {
  try {
    const testKey = '__storage_test__';
    window.localStorage.setItem(testKey, testKey);
    window.localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
}

export function getDefaultProgress() {
  return {
    version: 1,
    lastUpdated: new Date().toISOString(),
    labs: {},
    days: {},
    customData: {},
  };
}

export function getProgress() {
  if (isLocalStorageAvailable()) {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return getDefaultProgress();
      const parsed = JSON.parse(raw);
      return {
        ...getDefaultProgress(),
        ...parsed,
        labs: parsed.labs || {},
        days: parsed.days || {},
      };
    } catch (e) {
      console.warn('Failed to parse progress from localStorage, using defaults:', e);
      return getDefaultProgress();
    }
  }

  // Fallback to in-memory store
  if (!memoryStore) {
    memoryStore = getDefaultProgress();
  }
  return memoryStore;
}

export function saveProgress(progress) {
  const updated = {
    ...progress,
    version: 1,
    lastUpdated: new Date().toISOString(),
  };

  if (isLocalStorageAvailable()) {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.warn('Failed to save progress to localStorage, falling back to memory:', e);
      memoryStore = updated;
    }
  } else {
    memoryStore = updated;
  }

  // Dispatch event so all components / tabs can synchronize
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(PROGRESS_EVENT, { detail: updated }));
  }

  return updated;
}

// ─── Lab Progress Helpers ────────────────────────────────────

export function getLabProgress(labId) {
  const progress = getProgress();
  return progress.labs[labId] || { status: 'not-started', notes: '' };
}

export function getLabStatus(labId) {
  return getLabProgress(labId).status || 'not-started';
}

export function setLabStatus(labId, status) {
  const progress = getProgress();
  const current = progress.labs[labId] || {};
  progress.labs[labId] = {
    ...current,
    status,
    updatedAt: new Date().toISOString(),
  };
  return saveProgress(progress);
}

export function getLabNotes(labId) {
  return getLabProgress(labId).notes || '';
}

export function setLabNotes(labId, notes) {
  const progress = getProgress();
  const current = progress.labs[labId] || {};
  progress.labs[labId] = {
    ...current,
    notes,
    updatedAt: new Date().toISOString(),
  };
  return saveProgress(progress);
}

// ─── Course Days Progress Helpers ────────────────────────────

export function getDayProgress(daySlug) {
  const progress = getProgress();
  return progress.days[daySlug] || { transcriptsRead: [], summaryRead: false };
}

export function toggleDayTranscript(daySlug, transcriptId) {
  const progress = getProgress();
  const day = progress.days[daySlug] || { transcriptsRead: [], summaryRead: false };
  const list = new Set(day.transcriptsRead || []);

  if (list.has(transcriptId)) {
    list.delete(transcriptId);
  } else {
    list.add(transcriptId);
  }

  progress.days[daySlug] = {
    ...day,
    transcriptsRead: Array.from(list),
  };
  return saveProgress(progress);
}

export function toggleDaySummary(daySlug) {
  const progress = getProgress();
  const day = progress.days[daySlug] || { transcriptsRead: [], summaryRead: false };
  progress.days[daySlug] = {
    ...day,
    summaryRead: !day.summaryRead,
  };
  return saveProgress(progress);
}

// ─── Reset & Export / Import ─────────────────────────────────

export function resetProgress() {
  const empty = getDefaultProgress();
  if (isLocalStorageAvailable()) {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {}
  }
  memoryStore = empty;
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(PROGRESS_EVENT, { detail: empty }));
  }
  return empty;
}

export function exportProgressJSON() {
  const data = getProgress();
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: 'application/json',
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `mlops-ai300-progress-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function importProgressJSON(jsonString) {
  try {
    const parsed = JSON.parse(jsonString);
    if (!parsed || typeof parsed !== 'object') {
      throw new Error('Invalid JSON format');
    }

    const merged = {
      ...getDefaultProgress(),
      labs: parsed.labs || {},
      days: parsed.days || {},
      customData: parsed.customData || {},
      lastUpdated: new Date().toISOString(),
    };

    saveProgress(merged);
    return { success: true, count: Object.keys(merged.labs).length };
  } catch (err) {
    return { success: false, error: err.message };
  }
}
