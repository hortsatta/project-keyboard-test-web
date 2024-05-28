import { Fragment, lazy, memo } from 'react';
import cx from 'classix';

import { useWPMTestWordPassage } from '../hooks/use-wpm-test-word-passage.hook';
import { WPMTestWordSingle } from './wpm-test-word-single.component';

import type { ComponentProps } from 'react';

type Props = ComponentProps<'div'> & {
  passageList?: string[];
};

const WPMTestBlastEffect = lazy(
  () => import('./wpm-test-blast-effect.component'),
);

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
    comboMultiplierActive,
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
          className={cx(
            'absolute -ml-px -mt-px animate-blink border-l-2 border-primary bg-gradient-to-r from-primary/30 transition-transform duration-75',
            comboMultiplierActive && 'animate-max-combo',
          )}
        />
      )}
      <WPMTestBlastEffect ref={blastEffectRef} style={blastEffectStyle} />
      {passageList?.map((str, index) => (
        <Fragment key={`word-${index}`}>
          {activeIndex === index ? (
            <WPMTestWordSingle
              ref={handleActiveWordRef}
              style={wordStyle}
              value={str}
              inputValue={inputValue}
              transcript={transcripts[index]}
              comboMultiplierActive={comboMultiplierActive}
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
