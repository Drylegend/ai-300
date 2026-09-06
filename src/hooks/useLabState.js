import { useProgress } from '../context/ProgressContext';

/**
 * Backward-compatible hook delegating to unified ProgressContext.
 */
export default function useLabState() {
  const {
    labs,
    updateLabStatus,
    getLabById,
    getLabsByPlatform,
    updateLabNotes,
    getLabNotes,
    progress,
  } = useProgress();

  return {
    labs,
    updateLabStatus,
    getLabById,
    getLabsByPlatform,
    updateLabNotes,
    getLabNotes,
    progress,
  };
}
