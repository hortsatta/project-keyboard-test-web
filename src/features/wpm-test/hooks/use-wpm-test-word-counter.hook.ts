import { useBoundStore } from '#/core/hooks/use-store.hook';
import { useEffect, useMemo, useRef } from 'react';

type Options = {
  onComplete?: (elapsedTimeMs?: number) => void;
};

type Result = {
  currentWordCount: number;
};

export function useWPMTestWordCounter(
  endWordCount: number,
  isPlaying: boolean,
  options?: Options,
): Result {
  const transcripts = useBoundStore((state) => state.transcripts);
  const timeMs = useRef<number>(0);

  const currentWordCount = useMemo(() => {
    if (!isPlaying || transcripts.length <= 1) {
      return endWordCount;
    }

    return endWordCount - transcripts.length + 1;
  }, [isPlaying, endWordCount, transcripts]);

  useEffect(() => {
    if (!isPlaying || !options?.onComplete || currentWordCount > 0) return;

    options.onComplete(timeMs.current);
    timeMs.current = 0;
  }, [isPlaying, currentWordCount, options]);

  useEffect(() => {
    if (!isPlaying) return;

    let initialTimestampMs: number;
    let handle: number;

    const step = (timestampMs: number) => {
      if (initialTimestampMs === undefined) {
        initialTimestampMs = timestampMs;
      }

      timeMs.current = timestampMs - initialTimestampMs;

      if (isPlaying) {
        handle = window.requestAnimationFrame(step);
      }
    };

    handle = window.requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(handle);
    };
  }, [isPlaying]);

  return {
    currentWordCount,
  };
}
