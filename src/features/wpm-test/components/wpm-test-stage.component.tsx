import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOnClickOutside } from 'usehooks-ts';
import cx from 'classix';

import { pageRoutes } from '#/core/config/page-routes.config';
import { useBoundStore } from '#/core/hooks/use-store.hook';
import { BaseButton } from '#/base/components/base-button.component';
import { TestMode } from '../models/wpm-test.model';
import { useWPMTestTimer } from '../hooks/use-wpm-test-timer.hook';
import { useWPMTestComboCounterColorBackdrop } from '../hooks/use-wpm-test-combo-counter-color-backdrop.hook';
import { useWPMTestSentenceGenerator } from '../hooks/use-wpm-test-sentence-generator.hook';
import { useWPMTestWordCounter } from '../hooks/use-wpm-test-word-counter.hook';
import { useWPMTestAudioRecorder } from '../hooks/use-wpm-test-audio-recorder.hook';
import { WPMTestInput } from './wpm-test-input.component';
import { WPMTestProgress } from './wpm-test-progress.component';
import { WPMTestWordPassage } from './wpm-test-word-passage.component';
import { WPMTestComboCounter } from './wpm-test-combo-counter.component';
import { WPMTestComboColorBackdrop } from './wpm-test-combo-color-backdrop.component';
import { WPMTestComboMultiplierBar } from './wpm-test-combo-multiplier-bar.component';
import { WPMTestStageGradientFadeOut } from './wpm-test-stage-gradient-fade-out.component';

import type { ComponentProps } from 'react';

export const WPMTestStage = memo(function ({
  className,
  ...moreProps
}: ComponentProps<'div'>) {
  const navigate = useNavigate();
  const { mode: testMode, timeWordAmount } = useBoundStore(
    (state) => state.testModeOptions,
  );
  const recordAudioWhenPlaying = useBoundStore(
    (state) => state.testSystemOptions.recordAudioWhenPlaying,
  );
  const openMainMenu = useBoundStore((state) => state.openMainMenu);
  const isPlaying = useBoundStore((state) => state.isPlaying);
  const isComplete = useBoundStore((state) => state.isComplete);
  const setComplete = useBoundStore((state) => state.setComplete);
  const setAudioRecording = useBoundStore((state) => state.setAudioRecording);
  const resetTest = useBoundStore((state) => state.resetTest);
  const initializeTranscripts = useBoundStore(
    (state) => state.initializeTranscripts,
  );

  const [isAwaitingRecording, setIsAwaitingRecording] = useState(false);

  const { hasError: hasRecordingError, recordingBlob } =
    useWPMTestAudioRecorder();
  const comboColor = useWPMTestComboCounterColorBackdrop();
  const { passageList } = useWPMTestSentenceGenerator();

  const inputRef = useRef<HTMLInputElement>(null);

  const viewTestResults = useCallback(() => {
    if (recordAudioWhenPlaying && !isAwaitingRecording) {
      setIsAwaitingRecording(true);
      return;
    }

    navigate(pageRoutes.testResults.path);
  }, [recordAudioWhenPlaying, isAwaitingRecording, navigate]);

  const options = useMemo(
    () => ({
      onComplete: (elapsedTimeMs?: number) => {
        setComplete(elapsedTimeMs);
        viewTestResults();
      },
    }),
    [setComplete, viewTestResults],
  );

  const { timer, reset: resetTimer } = useWPMTestTimer(
    timeWordAmount || 0,
    isPlaying && testMode === TestMode.Time,
    options,
  );

  const { currentWordCount } = useWPMTestWordCounter(
    timeWordAmount || 0,
    isPlaying && testMode === TestMode.Word,
    options,
  );

  const progressValue = useMemo(() => {
    switch (testMode) {
      case TestMode.Time:
        return timer;
      case TestMode.Word:
        return currentWordCount;
      default:
        return 0;
    }
  }, [testMode, timer, currentWordCount]);

  const handleWrapperClick = useCallback(() => {
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  }, []);

  useEffect(() => {
    if (!isPlaying && !isComplete) {
      resetTimer();
    }

    if (!isPlaying || isComplete) return;

    initializeTranscripts(passageList[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying, isComplete]);

  useEffect(() => {
    if (openMainMenu) return;

    setTimeout(() => {
      handleWrapperClick();
    }, 200);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openMainMenu]);

  useEffect(() => {
    !isComplete && isPlaying && resetTest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isAwaitingRecording) return;
    // If recording is ready then pass it to global state
    if (hasRecordingError || (recordingBlob?.size || 0) > 0) {
      setIsAwaitingRecording(false);
      setAudioRecording({ hasError: hasRecordingError, blob: recordingBlob });
      viewTestResults();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAwaitingRecording, hasRecordingError, recordingBlob]);

  useOnClickOutside(inputRef, handleWrapperClick);

  return (
    <>
      <div
        className={cx('relative z-10 flex flex-col items-center', className)}
        onClick={handleWrapperClick}
        {...moreProps}
      >
        <WPMTestInput ref={inputRef} passageList={passageList} />
        <div className='relative h-[200px] max-w-main'>
          {!isComplete && (
            <div className='!absolute left-1/2 right-auto top-44 flex h-[65px] w-[65px] -translate-x-1/2 items-center gap-4 xs:top-24 2lg:left-auto 2lg:right-full 2lg:top-1/2 2lg:mr-9 2lg:-translate-y-1/2 2lg:translate-x-0'>
              <WPMTestComboCounter className='z-10' />
              <WPMTestComboMultiplierBar className='!absolute -top-1.5 left-1/2 -translate-x-1/2' />
            </div>
          )}
          <div className='relative mb-2.5 mt-[16.5rem] h-[200px] overflow-hidden px-2.5 xs:mt-48 2lg:mt-0 2lg:px-0'>
            <WPMTestWordPassage className='h-full' passageList={passageList} />
            {/* Top and bottom fade (gradient) */}
            <WPMTestStageGradientFadeOut className='top-0' color={comboColor} />
            <WPMTestStageGradientFadeOut
              className='bottom-0'
              color={comboColor}
              isBottom
            />
          </div>
          <WPMTestProgress className='px-2.5 2lg:px-1' value={progressValue} />
          {isComplete && (
            <div className='mt-16 flex w-full justify-center'>
              <BaseButton
                iconName='keyboard'
                variant='secondary'
                onClick={viewTestResults}
                loading={isAwaitingRecording}
              >
                {isAwaitingRecording ? 'Computing' : 'View Test Results'}
              </BaseButton>
            </div>
          )}
        </div>
      </div>
      <WPMTestComboColorBackdrop />
    </>
  );
});
