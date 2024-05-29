import { useMemo, useEffect, useRef, useCallback } from 'react';
import useSound from 'use-sound';
import levenshtein from 'damerau-levenshtein';

import { useBoundStore } from '#/core/hooks/use-store.hook';

import wordPerfectSfx from '#/assets/sfx/word-perfect.mp3';
import wordNotCorrectSfx from '#/assets/sfx/word-not-correct.mp3';

import type { ForwardedRef } from 'react';
import type { Transcript } from '../models/wpm-test.model';

type Result = {
  inputValueList: string[];
  wasteInputValue: string | undefined;
  isDirty: boolean;
  isExact: boolean;
  perfectCat: number;
  handleMergeRefs: (instance: HTMLElement) => void;
};

const soundOptions = { volume: 0.1 };

export function useWPMTestWordSingle(
  value: string,
  inputValue?: string,
  active?: boolean,
  transcript?: Transcript,
  ref?: ForwardedRef<HTMLElement>,
  onPerfect?: (rect: DOMRect) => void,
): Result {
  const { isDirty, hasBackspace, hasMultiplier } = transcript || {
    isDirty: false,
    hasBackspace: false,
    hasMultiplier: false,
  };

  const { perfectWordSfx, notCorrectWordSfx } = useBoundStore(
    (state) => state.testSystemOptions,
  );

  const [playPerfectSfx] = useSound(wordPerfectSfx, soundOptions);
  const [playNotCorrectSfx] = useSound(wordNotCorrectSfx, soundOptions);

  const localRef = useRef<HTMLElement | null>(null);

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

  const perfectCat = useMemo(() => {
    let cat = 0;
    if (!isDirty || hasBackspace) {
      cat = 0;
    } else if (isExact) {
      cat = hasMultiplier ? 2 : 1;
    }

    return cat;
  }, [isExact, isDirty, hasBackspace, hasMultiplier]);

  const handleMergeRefs = useCallback(
    (instance: HTMLElement) => {
      // Set localRef
      localRef.current = instance;
      // Set forwardRef
      if (!ref) return;

      typeof ref === 'function' ? ref(instance) : (ref.current = instance);
    },
    [ref, localRef],
  );

  useEffect(() => {
    if (isDirty && !active && isExact && perfectCat > 0) {
      const { width, height } = localRef.current?.getBoundingClientRect() || {};
      const left = localRef.current?.offsetLeft || 0;
      const top = localRef.current?.offsetTop || 0;

      perfectWordSfx && playPerfectSfx();
      onPerfect && onPerfect({ width, height, left, top } as DOMRect);
    } else if (isDirty && !active && !isExact && perfectCat < 1) {
      notCorrectWordSfx && playNotCorrectSfx();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, isDirty, isExact, perfectCat, perfectWordSfx, notCorrectWordSfx]);

  return {
    inputValueList,
    wasteInputValue,
    isDirty,
    isExact,
    perfectCat,
    handleMergeRefs,
  };
}
