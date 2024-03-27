import {
  Fragment,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import cx from 'classix';

import { KeyboardTypingWordSingle } from './keyboard-typing-word-single.component';

import type { ComponentProps } from 'react';

type Props = ComponentProps<'div'> & {
  activeIndex: number;
  value?: string;
  inputValue?: string;
  fullInputValue?: string;
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

export const KeyboardTypingWordPassage = memo(function ({
  className,
  value,
  inputValue,
  fullInputValue,
  activeIndex,
  ...moreProps
}: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const charSampleRef = useRef<HTMLInputElement>(null);

  const [charSampleSize, setCharSampleSize] = useState(
    DEFAULT_CHAR_SAMPLE_SIZE,
  );

  const [textCursorStyle, setTextCursorStyle] = useState(
    DEFAULT_TEXT_CURSOR_STYLE,
  );

  const [wordHeight, setWordHeight] = useState(0);
  const [textCursorPosY, setTextCursorPosY] = useState(
    DEFAULT_TEXT_CURSOR_POSY,
  );

  const valueList = useMemo(
    () => value?.split(/(\s+)/).filter((str) => str.trim().length > 0),
    [value],
  );

  const fullInputValueList = useMemo(
    () =>
      fullInputValue?.split(/(\s+)/).filter((str) => str.trim().length > 0) ||
      [],
    [fullInputValue],
  );

  const wordStyle = useMemo(
    () => ({
      marginInline: charSampleSize.width / 2,
    }),
    [charSampleSize],
  );

  const wrapperStyle = useMemo(
    () => ({
      paddingBottom: wordHeight * 2,
    }),
    [wordHeight],
  );

  const handleActiveWordRef = useCallback(
    (node: HTMLElement) => {
      if (!node) {
        return;
      }

      const offsetX = (inputValue?.length || 0) * charSampleSize.width;
      const { offsetLeft, offsetTop } = node;

      const posX =
        (offsetLeft <= 0 ? charSampleSize.width / 2 : offsetLeft) + offsetX;

      setTextCursorStyle({
        width: charSampleSize.width,
        height: charSampleSize.height + 3,
        transform: `translate(${posX}px, ${offsetTop}px)`,
      });

      setWordHeight(getElementHeight(node));

      // Get get and set current cursor position

      const posY = getPosY(node, offsetTop);

      if (posY === textCursorPosY.value) {
        return;
      }

      setTextCursorPosY({
        value: posY,
        isForward: textCursorPosY.value <= posY,
      });
    },
    [charSampleSize, textCursorPosY.value, inputValue],
  );

  useEffect(() => {
    const rect = charSampleRef.current?.getBoundingClientRect();
    const width = Math.ceil(rect?.width || 0);

    setCharSampleSize({ width, height: rect?.height || 0 });
  }, [charSampleRef.current?.clientWidth]);

  useEffect(() => {
    if (wordHeight <= 0 || textCursorPosY.value <= 0) {
      return;
    }

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

  return (
    <div
      ref={wrapperRef}
      style={wrapperStyle}
      className={cx('relative flex items-baseline font-light', className)}
      {...moreProps}
    >
      {/* Create sample tag for char width */}
      <i
        ref={charSampleRef}
        className='absolute left-0 top-0 -z-10 not-italic opacity-0'
      >
        q
      </i>
      {/* Create text cursor */}
      <div
        style={textCursorStyle}
        className='absolute -ml-px -mt-px animate-blink border-l-2 border-primary bg-gradient-to-r from-primary/30 transition-transform duration-75'
      />
      {valueList?.map((str, index) => (
        <Fragment key={`word-${index}`}>
          {activeIndex === index ? (
            <KeyboardTypingWordSingle
              ref={handleActiveWordRef}
              style={wordStyle}
              value={str}
              inputValue={inputValue}
              active
            />
          ) : (
            <KeyboardTypingWordSingle
              style={wordStyle}
              value={str}
              inputValue={fullInputValueList[index]}
            />
          )}
        </Fragment>
      ))}
    </div>
  );
});
