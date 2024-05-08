import { Fragment, memo } from 'react';
import Lottie from 'react-lottie-player';
import cx from 'classix';

import { useWPMTestWordPassage } from '../hooks/use-wpm-test-word-passage.hook';
import { WPMTestWordSingle } from './wpm-test-word-single.component';

import type { ComponentProps } from 'react';

import blastEffectJson from '#/assets/json/blast-effect.json';

type Props = ComponentProps<'div'> & {
  passageList?: string[];
};

export const WPMTestWordPassage = memo(function ({
  className,
  passageList,
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
    activeIndex,
    inputValue,
    transcripts,
    isComplete,
    handleActiveWordRef,
    handlePerfectWord,
  } = useWPMTestWordPassage();

  return (
    <div
      ref={wrapperRef}
      style={wrapperStyle}
      className={cx(
        'relative flex flex-wrap items-baseline overflow-hidden text-xl font-light leading-8',
        isComplete &&
          'overflow-y-scroll scrollbar-thin scrollbar-track-surface scrollbar-thumb-border',
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
      {!isComplete && (
        <div
          style={textCursorStyle}
          className='absolute -ml-px -mt-px animate-blink border-l-2 border-primary bg-gradient-to-r from-primary/30 transition-transform duration-75'
        />
      )}
      <Lottie
        ref={blastEffectRef}
        style={blastEffectStyle}
        className='absolute -translate-x-full -translate-y-full opacity-70'
        animationData={blastEffectJson}
        renderer='canvas'
        speed={2}
        loop={false}
      />
      {passageList?.map((str, index) => (
        <Fragment key={`word-${index}`}>
          {activeIndex === index ? (
            <WPMTestWordSingle
              ref={handleActiveWordRef}
              style={wordStyle}
              value={str}
              inputValue={inputValue}
              transcript={transcripts[index]}
              active
            />
          ) : (
            <WPMTestWordSingle
              style={wordStyle}
              className='relative z-10'
              value={str}
              inputValue={transcripts[index]?.inputValue}
              transcript={transcripts[index]}
              onPerfect={handlePerfectWord}
            />
          )}
        </Fragment>
      ))}
    </div>
  );
});
