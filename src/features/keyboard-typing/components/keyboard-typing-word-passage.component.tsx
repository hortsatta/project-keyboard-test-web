import { Fragment, memo } from 'react';
import Lottie from 'react-lottie-player';
import cx from 'classix';

import { useKeyboardTypeingPassage } from '../hooks/use-keyboard-typing-word-passage.hook';
import { KeyboardTypingWordSingle } from './keyboard-typing-word-single.component';

import type { ComponentProps } from 'react';

import blastEffectJson from '#/assets/json/blast-effect.json';

type Props = ComponentProps<'div'> & {
  activeIndex: number;
  value?: string;
  inputValue?: string;
  fullInputValue?: string;
};

export const KeyboardTypingWordPassage = memo(function ({
  className,
  value,
  inputValue,
  fullInputValue,
  activeIndex,
  ...moreProps
}: Props) {
  const {
    wrapperRef,
    charSampleRef,
    blastEffectRef,
    wrapperStyle,
    textCursorStyle,
    wordStyle,
    blastEffectStyle,
    valueList,
    fullInputValueList,
    handleActiveWordRef,
    playBlastEffect,
  } = useKeyboardTypeingPassage(value, inputValue, fullInputValue);

  return (
    <div
      ref={wrapperRef}
      style={wrapperStyle}
      className={cx(
        'relative flex flex-wrap items-baseline overflow-hidden text-xl font-light leading-8',
        className,
      )}
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
      <Lottie
        ref={blastEffectRef}
        style={blastEffectStyle}
        className='absolute opacity-80'
        animationData={blastEffectJson}
        speed={2}
        loop={false}
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
              className='relative z-10'
              value={str}
              inputValue={fullInputValueList[index]}
              onPerfect={playBlastEffect}
            />
          )}
        </Fragment>
      ))}
    </div>
  );
});
