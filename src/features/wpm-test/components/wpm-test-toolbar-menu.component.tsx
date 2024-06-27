import { memo, useCallback, useMemo, useState } from 'react';
import cx from 'classix';

import {
  DEFAULT_TEST_MODE_OPTIONS,
  timeSecondAmountList,
  wordAmountList,
} from '../config/wpm-test.config';
import { TestMode } from '../models/wpm-test.model';
import { useBoundStore } from '#/core/hooks/use-store.hook';
import { BaseButton } from '#/base/components/base-button.component';
import { BaseIcon } from '#/base/components/base-icon.component';
import {
  BaseTooltip,
  BaseTooltipTrigger,
  BaseTooltipContent,
} from '#/base/components/base-tooltip.component';
import { WPMTestSystemOptionsModal } from './wpm-test-system-options-modal.component';
import { WPMTestAmountCustomSetterModal } from './wpm-test-amount-custom-setter-modal.component';
import { WPMTestMainMenuModal } from './wpm-test-main-menu-modal.component';

import type { ComponentProps } from 'react';
import type { IconName } from '#/base/models/base.model';

const testModes = [
  {
    value: TestMode.Time,
    iconName: 'clock-countdown',
    label: 'Time',
  },
  {
    value: TestMode.Word,
    iconName: 'text-aa',
    label: 'Word',
  },
  {
    value: TestMode.Zen,
    iconName: 'yin-yang',
    label: 'Zen',
  },
];

const WRAPPER_OPTIONS_CLASSNAME =
  'flex h-full items-center justify-center gap-1';

const BUTTON_CLASSNAME = 'flex h-full w-12 gap-2 !px-1';

const Border = memo(function () {
  return (
    <div className='hidden h-full w-[13px] justify-center 2lg:flex'>
      <div className='h-full border-r border-r-border' />
    </div>
  );
});

export const WPMTestToolbarMenu = memo(function ({
  className,
  ...moreProps
}: ComponentProps<'div'>) {
  const recordAudioWhenPlaying = useBoundStore(
    (state) => state.testSystemOptions.recordAudioWhenPlaying,
  );
  const { mode, timeWordAmount } = useBoundStore(
    (state) => state.testModeOptions,
  );
  const resetTest = useBoundStore((state) => state.resetTest);
  const openMainMenu = useBoundStore((state) => state.openMainMenu);
  const setOpenMainMenu = useBoundStore((state) => state.setOpenMainMenu);
  const setTestModeOptions = useBoundStore((state) => state.setTestModeOptions);
  const setTestSystemOptions = useBoundStore(
    (state) => state.setTestSystemOptions,
  );
  const [openSystemOptions, setOpenSystemOptions] = useState(false);
  const [openCustomTimeWordAmount, setOpenCustomTimeWordAmount] =
    useState(false);

  const amountList = useMemo(() => {
    if (mode === TestMode.Time) {
      return timeSecondAmountList;
    } else if (mode === TestMode.Word) {
      return wordAmountList;
    }
  }, [mode]);

  const isTimeWordAmountCustom = useMemo(
    () => amountList?.every((amount) => amount !== timeWordAmount) || false,
    [timeWordAmount, amountList],
  );

  const handleModeChange = useCallback(
    (targetMode: TestMode) => () => {
      if (targetMode === mode) return;

      setTestModeOptions({
        mode: targetMode,
        timeWordAmount: DEFAULT_TEST_MODE_OPTIONS[targetMode].timeWordAmount,
      });
    },
    [mode, setTestModeOptions],
  );

  const handleAmountChange = useCallback(
    (amount: number) => () => {
      if (amount === timeWordAmount) return;

      setTestModeOptions({
        mode,
        timeWordAmount: amount,
      });
    },
    [mode, timeWordAmount, setTestModeOptions],
  );

  const handleCustomAmountChange = useCallback(
    (amount: number) => {
      handleAmountChange(amount)();
    },
    [handleAmountChange],
  );

  const handleRecordAudioChange = useCallback(() => {
    setTestSystemOptions({ recordAudioWhenPlaying: !recordAudioWhenPlaying });
  }, [recordAudioWhenPlaying, setTestSystemOptions]);

  const handleCloseModal = useCallback(() => {
    setOpenSystemOptions(false);
    setOpenCustomTimeWordAmount(false);
    setOpenMainMenu(false);
  }, [setOpenMainMenu]);

  const handleOpenSystemOptions = useCallback(() => {
    setOpenSystemOptions(true);
    setOpenMainMenu(false);
  }, [setOpenMainMenu]);

  const handleOpenAmountCustomSetter = useCallback(() => {
    setOpenCustomTimeWordAmount(true);
    setOpenMainMenu(false);
  }, [setOpenMainMenu]);

  const handleSetOpenMainMenu = useCallback(() => {
    setOpenMainMenu(true);
  }, [setOpenMainMenu]);

  const handleResetTestModal = useCallback(() => {
    resetTest();
    handleCloseModal();
  }, [resetTest, handleCloseModal]);

  const handleAmountChangeModal = useCallback(
    (amount: number) => () => {
      handleAmountChange(amount)();
      handleCloseModal();
    },
    [handleAmountChange, handleCloseModal],
  );

  return (
    <>
      <div
        className={cx(
          'flex h-full w-fit flex-none items-center gap-2 rounded border border-border bg-primary/10 p-2 2lg:w-full 2lg:flex-1',
          className,
        )}
        {...moreProps}
      >
        <div className={cx(WRAPPER_OPTIONS_CLASSNAME, 'hidden 2lg:flex')}>
          {testModes.map(({ value, label, iconName }) => (
            <BaseTooltip key={`tm-${value}`}>
              <BaseTooltipTrigger>
                <BaseButton
                  className={BUTTON_CLASSNAME}
                  iconName={iconName as IconName}
                  onClick={handleModeChange(value)}
                  active={value === mode}
                />
              </BaseTooltipTrigger>
              <BaseTooltipContent>{label} Mode</BaseTooltipContent>
            </BaseTooltip>
          ))}
        </div>
        <Border />
        <div
          className={cx(WRAPPER_OPTIONS_CLASSNAME, 'hidden flex-1 2lg:flex')}
        >
          {amountList?.map((amount) => (
            <BaseTooltip key={`ta-${amount}`}>
              <BaseTooltipTrigger>
                <BaseButton
                  className={BUTTON_CLASSNAME}
                  onClick={handleAmountChange(amount)}
                  active={amount === timeWordAmount}
                >
                  {amount}
                </BaseButton>
              </BaseTooltipTrigger>
              <BaseTooltipContent>
                {amount} {mode === TestMode.Time ? 'Seconds' : 'Words'}
              </BaseTooltipContent>
            </BaseTooltip>
          ))}
          {mode === TestMode.Zen ? (
            <BaseIcon name='minus' className='opacity-50' />
          ) : (
            <BaseTooltip>
              <BaseTooltipTrigger>
                <BaseButton
                  className={BUTTON_CLASSNAME}
                  iconName='magic-wand'
                  active={isTimeWordAmountCustom}
                  onClick={handleOpenAmountCustomSetter}
                />
              </BaseTooltipTrigger>
              <BaseTooltipContent>
                Set custom {mode === TestMode.Time ? 'Time' : 'Word Count'}
              </BaseTooltipContent>
            </BaseTooltip>
          )}
        </div>
        <Border />
        <div className={WRAPPER_OPTIONS_CLASSNAME}>
          <BaseTooltip>
            <BaseTooltipTrigger>
              <BaseButton
                className={cx(BUTTON_CLASSNAME, '2lg:hidden')}
                iconName='list'
                onClick={handleSetOpenMainMenu}
              />
            </BaseTooltipTrigger>
            <BaseTooltipContent>Main Menu</BaseTooltipContent>
          </BaseTooltip>
          <BaseTooltip>
            <BaseTooltipTrigger>
              <BaseButton
                className={BUTTON_CLASSNAME}
                iconName={
                  recordAudioWhenPlaying ? 'microphone' : 'microphone-slash'
                }
                onClick={handleRecordAudioChange}
              />
            </BaseTooltipTrigger>
            <BaseTooltipContent>Record Audio When Playing</BaseTooltipContent>
          </BaseTooltip>
          <BaseTooltip>
            <BaseTooltipTrigger>
              <BaseButton
                className={BUTTON_CLASSNAME}
                iconName='faders'
                onClick={handleOpenSystemOptions}
              />
            </BaseTooltipTrigger>
            <BaseTooltipContent>System Options</BaseTooltipContent>
          </BaseTooltip>
          <BaseTooltip>
            <BaseTooltipTrigger>
              <BaseButton
                className={BUTTON_CLASSNAME}
                iconName='rewind'
                onClick={resetTest}
              />
            </BaseTooltipTrigger>
            <BaseTooltipContent>Reset Test</BaseTooltipContent>
          </BaseTooltip>
        </div>
      </div>
      <WPMTestMainMenuModal
        open={openMainMenu}
        mode={mode}
        testModes={testModes}
        timeWordAmount={timeWordAmount}
        isTimeWordAmountCustom={isTimeWordAmountCustom}
        amountList={amountList}
        resetTest={handleResetTestModal}
        onClose={handleCloseModal}
        onModeChange={handleModeChange}
        onAmountChange={handleAmountChangeModal}
        onOpenAmountCustomSetter={handleOpenAmountCustomSetter}
        onOpenSystemOptions={handleOpenSystemOptions}
      />
      <WPMTestSystemOptionsModal
        open={openSystemOptions}
        onClose={handleCloseModal}
      />
      <WPMTestAmountCustomSetterModal
        isTime={mode === TestMode.Time}
        open={openCustomTimeWordAmount}
        onClose={handleCloseModal}
        onSubmit={handleCustomAmountChange}
      />
    </>
  );
});
