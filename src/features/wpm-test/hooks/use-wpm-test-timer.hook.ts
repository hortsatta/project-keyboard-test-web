import { useCallback, useEffect, useRef, useState } from 'react';

type Options = {
  onComplete?: () => void;
};

type Result = {
  timer: number;
  reset: () => void;
};

export function useWPMTestTimer(
  endTimeSec: number,
  isPlaying: boolean,
  options?: Options,
): Result {
  const timeMs = useRef<number>(endTimeSec * 1000);
  const prevMs = useRef<number>(timeMs.current);
  const [timer, setTimer] = useState(endTimeSec);

  const reset = useCallback(() => {
    timeMs.current = endTimeSec * 1000;
    prevMs.current = timeMs.current;
    setTimer(endTimeSec);
  }, [endTimeSec]);

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

  useEffect(() => {
    reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endTimeSec]);

  return { timer, reset };
}
