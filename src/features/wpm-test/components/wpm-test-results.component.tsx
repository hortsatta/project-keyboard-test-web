import { memo } from 'react';
import cx from 'classix';

import { BaseButton } from '#/base/components/base-button.component';
import { useWPMTestResults } from '../hooks/use-wpm-test-results.hook';

import type { ComponentProps } from 'react';

type SingleResultProps = ComponentProps<'div'> & {
  label?: string;
};

const BUTTON_CLASSNAME = 'flex h-full w-12 gap-2 !px-1';

const DIVIDER_CLASSNAME = 'h-20 w-px bg-border';

const SingleResult = memo(function ({
  className,
  label,
  children,
  ...moreProps
}: SingleResultProps) {
  return (
    <div
      className={cx(
        'flex h-[60px] min-w-28 flex-col items-center justify-end text-2xl',
        className,
      )}
      {...moreProps}
    >
      {children}
      {label && (
        <span className='text-sm uppercase text-white/60'>{label}</span>
      )}
    </div>
  );
});

export const WPMTestResults = memo(function ({
  className,
  ...moreProps
}: ComponentProps<'div'>) {
  const { timeSeconds, resetTest, accuracyPercent, netWPM, highestComboCount } =
    useWPMTestResults();

  return (
    <div
      className={cx(
        'flex w-fit flex-col gap-2.5 rounded border border-border bg-primary/10 px-5 pb-2.5',
        className,
      )}
      {...moreProps}
    >
      <div className='mt-5 flex items-center justify-between'>
        <div>
          <h3 className='text-lg font-medium leading-none'>Test Completed</h3>
          <span className='text-xs italic text-white/60'>
            —in {timeSeconds}s, see results below
          </span>
        </div>
        <BaseButton
          className={BUTTON_CLASSNAME}
          iconName='rewind'
          onClick={resetTest}
        />
      </div>
      <div className='h-px w-full bg-border' />
      <div className='flex items-center justify-center gap-5'>
        <SingleResult label='Accuracy'>
          {accuracyPercent.toFixed(2)}%
        </SingleResult>
        <div className={DIVIDER_CLASSNAME} />
        <SingleResult className='text-4xl' label='WPM'>
          {netWPM.toFixed(1)}
        </SingleResult>
        <div className={DIVIDER_CLASSNAME} />
        <SingleResult label='Max Combo'>{highestComboCount}</SingleResult>
      </div>
    </div>
  );
});
