import { useRef, useState, useMemo, useCallback, useEffect } from 'react';
import { useBoundStore } from '#/core/hooks/use-store.hook';

import type { CSSProperties, RefObject } from 'react';
import type { AnimationItem } from 'lottie-web';
import type { Transcript } from '../models/wpm-test.model';

type Result = {
  wrapperRef: RefObject<HTMLDivElement>;
  charSampleRef: RefObject<HTMLInputElement>;
  blastEffectRef: RefObject<AnimationItem | undefined>;
  wrapperStyle: CSSProperties | undefined;
  textCursorStyle: CSSProperties | undefined;
  wordStyle: CSSProperties | undefined;
  blastEffectStyle: CSSProperties | undefined;
  activeIndex: number;
  inputValue: string;
  transcripts: Transcript[];
  isComplete: boolean;
  handleActiveWordRef: (node: HTMLElement) => void;
  handlePerfectWord: (rect?: DOMRect) => void;
};

const DEFAULT_CHAR_SAMPLE_SIZE = { width: 0, height: 0 };

const DEFAULT_TEXT_CURSOR_STYLE = {
  width: 0,
  height: 0,
  transform: 'translate(0px,0px)',
};

const DEFAULT_TEXT_CURSOR_POSY = {
  value: 0,
  isForward: true,
};

const DEFAULT_SCROLLBY_OPTIONS = {
  left: 0,
  behavior: 'smooth' as ScrollBehavior,
};

const BLAST_EFFECT_SIZE = 60;

const getElementHeight = (node: HTMLElement) => {
  const style = window && window.getComputedStyle(node);
  const list = [
    'margin-top',
    'margin-bottom',
    'border-top',
    'border-bottom',
    'padding-top',
    'padding-bottom',
    'height',
  ];

  return list
    .map((k) => parseInt(style.getPropertyValue(k), 10))
    .reduce((prev, cur) => prev + cur);
};

const getPosY = (node: HTMLElement, offsetTop = 0) => {
  const { marginTop } = window.getComputedStyle(node);
  return offsetTop - parseInt(marginTop, 10);
};

export function useWPMTestWordPassage(): Result {
  const isPlaying = useBoundStore((state) => state.isPlaying);
  const isComplete = useBoundStore((state) => state.isComplete);
  const activeIndex = useBoundStore((state) => state.activeIndex);
  const inputValue = useBoundStore((state) => state.inputValue);
  const transcripts = useBoundStore((state) => state.transcripts);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const charSampleRef = useRef<HTMLInputElement>(null);
  const blastEffectRef = useRef<AnimationItem | undefined>(null);

  const [charSampleSize, setCharSampleSize] = useState(
    DEFAULT_CHAR_SAMPLE_SIZE,
  );

  const [textCursorStyle, setTextCursorStyle] = useState(
    DEFAULT_TEXT_CURSOR_STYLE,
  );

  const [textCursorPosY, setTextCursorPosY] = useState(
    DEFAULT_TEXT_CURSOR_POSY,
  );

  const [wordHeight, setWordHeight] = useState(0);
  const [blastEffectStyle, setBlastEffectStyle] = useState({});

  const wordStyle = useMemo(
    () => ({
      marginInline: charSampleSize.width / 2,
    }),
    [charSampleSize],
  );

  const wrapperStyle = useMemo(
    () => ({
      paddingTop: wordHeight,
      paddingBottom: wordHeight * 3,
    }),
    [wordHeight],
  );

  const handleActiveWordRef = useCallback(
    (node: HTMLElement) => {
      if (!node) return;

      const wordHeight = getElementHeight(node);
      const offsetX = (inputValue?.length || 0) * charSampleSize.width;
      const { offsetLeft, offsetTop } = node;

      const posX =
        (offsetLeft <= 0 ? charSampleSize.width / 2 : offsetLeft) + offsetX;

      const posY = offsetTop - wordHeight;

      setTextCursorStyle({
        width: charSampleSize.width,
        height: charSampleSize.height + 3,
        transform: `translate(${posX}px, ${posY}px)`,
      });

      setWordHeight(wordHeight);

      // Get get and set current cursor position

      const currentPosY = getPosY(node, posY);

      if (currentPosY === textCursorPosY.value) return;

      setTextCursorPosY({
        value: currentPosY,
        isForward: textCursorPosY.value <= currentPosY,
      });
    },
    [charSampleSize, textCursorPosY.value, inputValue],
  );

  const playBlastEffect = useCallback(
    (rect?: DOMRect) => {
      if (!blastEffectRef?.current || !rect) return;

      const posX = rect.left + rect.width / 2 - BLAST_EFFECT_SIZE - 1;
      const posY = rect.top + 3 - wordHeight;

      setBlastEffectStyle({
        height: BLAST_EFFECT_SIZE,
        transform: `translate(${posX}px, ${posY}px)`,
      });

      blastEffectRef.current.playSegments(
        [0, blastEffectRef.current.totalFrames],
        true,
      );
    },
    [wordHeight],
  );

  const handlePerfectWord = useCallback(
    (rect?: DOMRect) => {
      // Play perfect animation effect on +1 to combo counter
      playBlastEffect(rect);
    },
    [playBlastEffect],
  );

  useEffect(() => {
    const rect = charSampleRef.current?.getBoundingClientRect();
    const width = Math.ceil(rect?.width || 0);

    setCharSampleSize({ width, height: rect?.height || 0 });
  }, [charSampleRef.current?.clientWidth]);

  useEffect(() => {
    if (wordHeight <= 0 || textCursorPosY.value <= 0) return;

    if (textCursorPosY.isForward) {
      textCursorPosY.value >= wordHeight * 2 &&
        wrapperRef.current?.scrollBy({
          top: wordHeight,
          ...DEFAULT_SCROLLBY_OPTIONS,
        });
    } else {
      textCursorPosY.value > 0 &&
        wrapperRef.current?.scrollBy({
          top: -wordHeight,
          ...DEFAULT_SCROLLBY_OPTIONS,
        });
    }
  }, [wordHeight, textCursorPosY]);

  useEffect(() => {
    !isPlaying &&
      !isComplete &&
      wrapperRef.current?.scrollTo({
        top: 0,
        ...DEFAULT_SCROLLBY_OPTIONS,
      });
  }, [isPlaying, isComplete]);

  return {
    wrapperRef,
    charSampleRef,
    blastEffectRef,
    wrapperStyle,
    textCursorStyle,
    wordStyle,
    blastEffectStyle,
    activeIndex,
    inputValue,
    transcripts,
    isComplete,
    handleActiveWordRef,
    handlePerfectWord,
  };
}
