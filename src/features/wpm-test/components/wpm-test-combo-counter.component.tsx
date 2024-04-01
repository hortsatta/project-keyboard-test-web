import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import cx from 'classix';

import type { ComponentProps } from 'react';

type Props = ComponentProps<'div'> & {
  count: number;
};

const COUNTER_WRAPPER_TEXT_CLASSNAMES = [
  'animate-[shaking_0.5s_linear_infinite]',
  'animate-[shaking_0.5s_linear_infinite]',
  'animate-[shaking_0.4s_linear_infinite]',
  'animate-[shaking_0.4s_linear_infinite]',
  'animate-[shaking_0.3s_linear_infinite]',
  'animate-[shaking_0.2s_linear_infinite]',
];

const COUNTER_TEXT_CLASSNAMES = [
  'text-text',
  'text-primary',
  'text-teal-400',
  'text-blue-500',
  'text-yellow-400',
  'text-orange-400',
  'text-red-500',
  'text-fuchsia-400',
  'text-violet-500',
  'animate-max-combo max-combo',
];

export const WPMTestComboCounter = memo(function ({
  className,
  count,
  ...moreProps
}: Props) {
  const [localCount, setLocalCount] = useState(0);
  const [appendCounterClassName, setAppendCounterClassName] = useState<
    string | undefined
  >(undefined);

  const wrapperTextClassName = useMemo(() => {
    let index = 0;

    if (localCount >= 50 && localCount < 100) {
      index = +localCount.toString()[0] - 5;
    } else if (localCount >= 100) {
      index = COUNTER_WRAPPER_TEXT_CLASSNAMES.length - 1;
    } else {
      return undefined;
    }

    return COUNTER_WRAPPER_TEXT_CLASSNAMES[index];
  }, [localCount]);

  const textClassName = useMemo(() => {
    let index = 0;

    if (localCount >= 10 && localCount < 100) {
      index = +localCount.toString()[0];
    } else if (localCount >= 100) {
      index = COUNTER_TEXT_CLASSNAMES.length - 1;
    }

    return COUNTER_TEXT_CLASSNAMES[index];
  }, [localCount]);

  const removeAppendCounterClassName = useCallback(
    () => setAppendCounterClassName(undefined),
    [],
  );

  useEffect(() => {
    setLocalCount((prev) => (count <= 0 ? prev : count));
  }, [count]);

  useEffect(() => {
    setAppendCounterClassName(localCount > 2 ? 'animate-add-combo' : undefined);
  }, [localCount]);

  return (
    <div
      className={cx(
        'relative mt-2 transition-[opacity,transform]',
        count < 2 ? '-translate-x-2.5 opacity-0' : '-translate-x-0 opacity-100',
        className,
      )}
      {...moreProps}
    >
      <div className='absolute left-1/2 -translate-x-1/2 text-4xl font-medium leading-none text-text/80'>
        <span
          className={cx('inline-block', appendCounterClassName)}
          onAnimationEnd={removeAppendCounterClassName}
        >
          {localCount}X
        </span>
      </div>
      <div className={cx('relative z-10', wrapperTextClassName)}>
        <p className='flex flex-col items-center text-4xl'>
          <span
            className={cx(
              'font-medium leading-none transition-colors',
              textClassName,
            )}
          >
            {localCount}X
          </span>
          <span
            className={cx(
              'inline-block overflow-hidden rounded-[1px] bg-gradient-to-b from-[#ffd679] from-30% to-[#b57b06]',
              'px-1.5 py-px text-xs font-bold uppercase leading-[1.2] tracking-tight text-backdrop opacity-80',
            )}
          >
            Perfect
          </span>
        </p>
      </div>
    </div>
  );
});
