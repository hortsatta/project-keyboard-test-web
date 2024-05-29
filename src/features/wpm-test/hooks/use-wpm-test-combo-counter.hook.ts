import { useState, useMemo, useCallback, useEffect, useRef } from 'react';

import { useBoundStore } from '#/core/hooks/use-store.hook';
import { COMBO_COUNTER_EXPIRE_MS } from '../config/wpm-test.config';

type Result = {
  count: number;
  localCount: number;
  timer: number;
  wrapperTextClassName: string | undefined;
  textClassName: string | undefined;
  appendCounterClassName: string | undefined;
  removeAppendCounterClassName: () => void;
};

const COUNTER_WRAPPER_TEXT_CLASSNAMES = [
  'animate-[shaking_0.5s_linear_infinite]',
  'animate-[shaking_0.5s_linear_infinite]',
  'animate-[shaking_0.4s_linear_infinite]',
  'animate-[shaking_0.4s_linear_infinite]',
  'animate-[shaking_0.3s_linear_infinite]',
  'animate-[shaking_0.2s_linear_infinite]',
];

const COUNTER_COLOR_CLASSNAMES = [
  'text-text',
  'text-primary',
  'text-teal-400',
  'text-cyan-400',
  'text-sky-400',
  'text-orange-400',
  'text-pink-500',
  'text-red-500',
  'text-yellow-400',
  'text-violet-500',
  'animate-max-combo max-combo max-combo-mask',
];

export function useWPMTestComboCounter(): Result {
  const count = useBoundStore((state) => state.comboCounter.count);
  const resetComboCounter = useBoundStore((state) => state.resetComboCounter);

  const timeMs = useRef<number>(0);
  const prevMs = useRef<number>(timeMs.current);

  const [timer, setTimer] = useState(0);
  const [localCount, setLocalCount] = useState(0);
  const [appendCounterClassName, setAppendCounterClassName] = useState<
    string | undefined
  >(undefined);

  const wrapperTextClassName = useMemo(() => {
    let index = 0;

    if (localCount >= 50 && localCount < 100) {
      index = +localCount.toString()[0] - 5;
    } else if (localCount >= 100) {
      index = COUNTER_WRAPPER_TEXT_CLASSNAMES.length - 1;
    } else {
      return undefined;
    }

    return COUNTER_WRAPPER_TEXT_CLASSNAMES[index];
  }, [localCount]);

  const textClassName = useMemo(() => {
    let index = 0;

    if (localCount >= 10 && localCount < 100) {
      index = +localCount.toString()[0];
    } else if (localCount >= 100) {
      index = COUNTER_COLOR_CLASSNAMES.length - 1;
    }

    return COUNTER_COLOR_CLASSNAMES[index];
  }, [localCount]);

  const removeAppendCounterClassName = useCallback(
    () => setAppendCounterClassName(undefined),
    [],
  );

  useEffect(() => {
    setLocalCount((prev) => (count <= 0 ? prev : count));
  }, [count]);

  useEffect(() => {
    setAppendCounterClassName(localCount > 2 ? 'animate-add-combo' : undefined);
  }, [localCount]);

  useEffect(() => {
    if (count <= 0) {
      setTimer(0);
      return;
    }

    const initialTimeMs = COMBO_COUNTER_EXPIRE_MS;
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
        resetComboCounter();
      } else {
        const seconds = Math.floor(timeMs.current / 1000);
        const isUpdate = seconds !== Math.floor(prevMs.current / 1000);

        prevMs.current = timeMs.current;

        if (isUpdate) {
          setTimer(seconds);
        }

        handle = window.requestAnimationFrame(step);
      }
    };

    handle = window.requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(handle);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  return {
    count,
    localCount,
    timer,
    wrapperTextClassName,
    textClassName,
    appendCounterClassName,
    removeAppendCounterClassName,
  };
}
