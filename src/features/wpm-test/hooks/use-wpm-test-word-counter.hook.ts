import { useBoundStore } from '#/core/hooks/use-store.hook';
import { useEffect, useMemo } from 'react';

type Options = {
  onComplete?: () => void;
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

  const currentWordCount = useMemo(() => {
    if (!isPlaying || transcripts.length <= 1) {
      return endWordCount;
    }

    return endWordCount - transcripts.length + 1;
  }, [isPlaying, endWordCount, transcripts]);

  useEffect(() => {
    if (!isPlaying || !options?.onComplete) return;

    currentWordCount <= 0 && options.onComplete();
  }, [isPlaying, currentWordCount, options]);

  return {
    currentWordCount,
  };
}
