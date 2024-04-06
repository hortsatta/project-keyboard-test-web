import { memo, useCallback, useMemo } from 'react';
import cx from 'classix';

import { useBoundStore } from '#/core/hooks/use-store.hook';
import { BaseButton } from '#/base/components/base-button.component';
import { BaseIcon } from '#/base/components/base-icon.component';
import {
  DEFAULT_TEST_OPTIONS,
  timeSecondAmountList,
  wordAmountList,
} from '../config/wpm-test.config';
import { TestMode } from '../models/wpm-test.model';

import type { ComponentProps } from 'react';
import type { IconName } from '#/base/models/base.model';

const WRAPPER_OPTIONS_CLASSNAME =
  'flex h-full items-center justify-center gap-1';

const BUTTON_CLASSNAME = 'flex h-full w-12 gap-2 !px-1';

const testModes = [
  {
    value: TestMode.Time,
    iconName: 'clock-countdown',
  },
  {
    value: TestMode.Word,
    iconName: 'text-aa',
  },
  {
    value: TestMode.Zen,
    iconName: 'yin-yang',
  },
];

const Border = memo(function () {
  return (
    <div className='flex h-full w-[13px] justify-center'>
      <div className='h-full border-r border-r-border' />
    </div>
  );
});

export const WPMTestToolbarMenu = memo(function ({
  className,
  ...moreProps
}: ComponentProps<'div'>) {
  const { mode, timeWordAmount } = useBoundStore((state) => state.testOptions);
  const setTestOptions = useBoundStore((state) => state.setTestOptions);
  const resetTest = useBoundStore((state) => state.resetTest);

  const amountList = useMemo(() => {
    if (mode === TestMode.Time) {
      return timeSecondAmountList;
    } else if (mode === TestMode.Word) {
      return wordAmountList;
    }
  }, [mode]);

  const isTImeWordAmountCustom = useMemo(
    () => amountList?.every((amount) => amount !== timeWordAmount) || false,
    [timeWordAmount, amountList],
  );

  const handleModeChange = useCallback(
    (targetMode: TestMode) => () => {
      if (targetMode === mode) return;

      setTestOptions({
        mode: targetMode,
        timeWordAmount: DEFAULT_TEST_OPTIONS[targetMode].timeWordAmount,
      });
    },
    [mode, setTestOptions],
  );

  const handleAmountChange = useCallback(
    (amount: number) => () => {
      if (amount === timeWordAmount) return;

      setTestOptions({
        mode,
        timeWordAmount: amount,
      });
    },
    [mode, timeWordAmount, setTestOptions],
  );

  return (
    <div
      className={cx(
        'flex h-full w-full items-center gap-2 rounded border border-border bg-primary/10 p-2',
        className,
      )}
      {...moreProps}
    >
      <div className={WRAPPER_OPTIONS_CLASSNAME}>
        {testModes.map(({ value, iconName }) => (
          <BaseButton
            key={`tm-${value}`}
            className={BUTTON_CLASSNAME}
            iconName={iconName as IconName}
            onClick={handleModeChange(value)}
            active={value === mode}
          />
        ))}
      </div>
      <Border />
      <div className={cx(WRAPPER_OPTIONS_CLASSNAME, 'flex-1')}>
        {amountList?.map((amount) => (
          <BaseButton
            key={`ta-${amount}`}
            className={BUTTON_CLASSNAME}
            onClick={handleAmountChange(amount)}
            active={amount === timeWordAmount}
          >
            {amount}
          </BaseButton>
        ))}
        {mode === TestMode.Zen ? (
          <BaseIcon name='minus' className='opacity-50' />
        ) : (
          <BaseButton
            className={BUTTON_CLASSNAME}
            iconName='magic-wand'
            active={isTImeWordAmountCustom}
            //  onClick={handleAmountChange(amount)} TODO
          />
        )}
      </div>
      <Border />
      <div className={WRAPPER_OPTIONS_CLASSNAME}>
        <BaseButton
          className={BUTTON_CLASSNAME}
          iconName='faders'
          //  onClick={handleAmountChange(amount)} TODO
        />
        <BaseButton
          className={BUTTON_CLASSNAME}
          iconName='rewind'
          onClick={resetTest}
        />
      </div>
    </div>
  );
});
