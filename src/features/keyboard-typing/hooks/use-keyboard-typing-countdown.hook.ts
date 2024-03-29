import { useCallback, useEffect, useRef, useState } from 'react';

type Options = {
  isPlaying?: boolean;
  onComplete?: () => void;
};

type Result = {
  timer: number;
  isPlaying: boolean;
  start: () => void;
  stop: () => void;
};

export function useKeyboardTypingTimer(
  endTimeSec: number,
  options?: Options,
): Result {
  const timeMs = useRef<number>(endTimeSec * 1000);
  const prevMs = useRef<number>(timeMs.current);
  const [timer, setTimer] = useState(endTimeSec);
  const [isPlaying, setIsPlaying] = useState(options?.isPlaying || false);

  const start = useCallback(() => {
    setIsPlaying(true);
  }, []);

  const stop = useCallback(() => {
    setIsPlaying(false);
  }, []);

  useEffect(() => {
    if (!isPlaying || timeMs.current <= 0) return;

    const initialTimeMs = timeMs.current;
    let initialTimestampMs: number;
    let handle: number;

    const step = (timestampMs: number) => {
      if (initialTimestampMs === undefined) {
        initialTimestampMs = timestampMs;
      }

      const elapsed = timestampMs - initialTimestampMs;
      timeMs.current = initialTimeMs - elapsed;

      if (timeMs.current <= 0) {
        setTimer(0);
        cancelAnimationFrame(handle);
        options?.onComplete && options.onComplete();
      } else {
        const seconds = Math.floor(timeMs.current / 1000);
        const isUpdate = seconds !== Math.floor(prevMs.current / 1000);
        prevMs.current = timeMs.current;

        if (isUpdate) {
          setTimer(seconds + 1);
        }

        if (isPlaying) {
          handle = window.requestAnimationFrame(step);
        }
      }
    };

    handle = window.requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(handle);
    };
  }, [isPlaying, options]);

  return {
    timer,
    isPlaying,
    start,
    stop,
  };
}
