import { useState, useMemo, useCallback, useEffect } from 'react';

import { useBoundStore } from '#/core/hooks/use-store.hook';

type Result = {
  count: number;
  localCount: number;
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

const COUNTER_TEXT_CLASSNAMES = [
  'text-text',
  'text-primary',
  'text-teal-400',
  'text-blue-500',
  'text-yellow-400',
  'text-orange-400',
  'text-red-500',
  'text-fuchsia-400',
  'text-violet-500',
  'animate-max-combo max-combo',
];

export function useWPMTestComboCounter(): Result {
  const count = useBoundStore((state) => state.comboCounter.count);
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
      index = COUNTER_TEXT_CLASSNAMES.length - 1;
    }

    return COUNTER_TEXT_CLASSNAMES[index];
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

  return {
    count,
    localCount,
    wrapperTextClassName,
    textClassName,
    appendCounterClassName,
    removeAppendCounterClassName,
  };
}
