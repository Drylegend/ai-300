import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import ENRICHED_LABS from '../data/labs';
import {
  getProgress,
  setLabStatus,
  setLabNotes,
  resetProgress,
  exportProgressJSON,
  importProgressJSON,
  toggleDayTranscript,
  toggleDaySummary,
  PROGRESS_EVENT,
} from '../utils/storage';

const ProgressContext = createContext(null);

export function ProgressProvider({ children }) {
  const [store, setStore] = useState(getProgress);

  // Sync state whenever local storage changes or PROGRESS_EVENT is fired
  useEffect(() => {
    function handleUpdate(e) {
      setStore(e.detail || getProgress());
    }

    function handleStorage(e) {
      if (e.key === 'mlops-portal:progress:v1') {
        setStore(getProgress());
      }
    }

    window.addEventListener(PROGRESS_EVENT, handleUpdate);
    window.addEventListener('storage', handleStorage);
    return () => {
      window.removeEventListener(PROGRESS_EVENT, handleUpdate);
      window.removeEventListener('storage', handleStorage);
    };
  }, []);

  // Labs array merged with persisted status & notes
  const labs = ENRICHED_LABS.map(lab => {
    const saved = store.labs[lab.id];
    return {
      ...lab,
      status: saved?.status || lab.status,
      studentNotes: saved?.notes || '',
    };
  });

  const updateLabStatus = useCallback((id, status) => {
    setLabStatus(id, status);
  }, []);

  const updateLabNotes = useCallback((id, notes) => {
    setLabNotes(id, notes);
  }, []);

  const getLabNotes = useCallback((id) => {
    return store.labs[id]?.notes || '';
  }, [store]);

  const getLabById = useCallback(
    (id) => labs.find(lab => lab.id === id) || null,
    [labs]
  );

  const getLabsByPlatform = useCallback(
    (platform) => labs.filter(lab => lab.platform === platform),
    [labs]
  );

  const getDayProgress = useCallback(
    (daySlug) => store.days[daySlug] || { transcriptsRead: [], summaryRead: false },
    [store]
  );

  const markDayTranscript = useCallback((daySlug, transcriptId) => {
    toggleDayTranscript(daySlug, transcriptId);
  }, []);

  const markDaySummary = useCallback((daySlug) => {
    toggleDaySummary(daySlug);
  }, []);

  const resetAllProgress = useCallback(() => {
    resetProgress();
  }, []);

  const exportProgress = useCallback(() => {
    exportProgressJSON();
  }, []);

  const importProgress = useCallback((jsonString) => {
    return importProgressJSON(jsonString);
  }, []);

  const value = {
    progress: store,
    labs,
    updateLabStatus,
    updateLabNotes,
    getLabNotes,
    getLabById,
    getLabsByPlatform,
    getDayProgress,
    markDayTranscript,
    markDaySummary,
    resetAllProgress,
    exportProgress,
    importProgress,
  };

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return ctx;
}

export default useProgress;
