import { useState, useMemo, useEffect, useRef } from 'react';
import levenshtein from 'damerau-levenshtein';

import type { MutableRefObject } from 'react';

type Result = {
  localRef: MutableRefObject<HTMLElement | null>;
  inputValueList: string[];
  wasteInputValue: string | undefined;
  isDirty: boolean;
  isExact: boolean;
  isPerfect: boolean;
};

export function useWPMTestWordSingle(
  value: string,
  inputValue?: string,
  active?: boolean,
  onMistake?: () => void,
  onPerfect?: (rect: DOMRect) => void,
): Result {
  const localRef = useRef<HTMLElement | null>(null);
  const [isDirty, setIsDirty] = useState(false);
  const [isPerfect, setIsPerfect] = useState(true);

  const inputValueList = useMemo(
    () => inputValue?.split('') || [],
    [inputValue],
  );

  const wasteInputValue = useMemo(
    () => inputValue?.slice(value.length),
    [value, inputValue],
  );

  const isExact = useMemo(() => {
    const { similarity } = levenshtein(value, inputValue || '');

    return similarity === 1;
  }, [value, inputValue]);

  // Set dirty status
  useEffect(() => {
    if (!active) {
      return;
    }

    setIsDirty((prev) => {
      if (prev) {
        return true;
      }

      return inputValue?.trim().length ? true : false;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue]);

  // Check if input has mistake, set as perfect if none
  useEffect(() => {
    if (!isDirty) {
      return;
    }

    const hasMistake = inputValue
      ?.split('')
      .some((char, index) => char !== value[index]);

    if (!hasMistake) {
      return;
    }

    setIsPerfect(false);
    onMistake && onMistake();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDirty, value, inputValue]);

  useEffect(() => {
    if (isDirty && !active && isExact && isPerfect) {
      const { width, height } = localRef.current?.getBoundingClientRect() || {};
      const left = localRef.current?.offsetLeft || 0;
      const top = localRef.current?.offsetTop || 0;

      onPerfect && onPerfect({ width, height, left, top } as DOMRect);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, isDirty, isExact, isPerfect]);

  return {
    localRef,
    inputValueList,
    wasteInputValue,
    isDirty,
    isExact,
    isPerfect,
  };
}
