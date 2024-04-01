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
        'mt-1.5 transition-[opacity,transform]',
        count < 2 ? '-translate-x-2.5 opacity-0' : '-translate-x-0 opacity-100',
        className,
      )}
      {...moreProps}
    >
      <span
        className={cx(
          'absolute text-4xl font-medium leading-none text-text/80',
          appendCounterClassName,
        )}
        onAnimationEnd={removeAppendCounterClassName}
      >
        {localCount}X
      </span>
      <div className={cx('relative z-10', wrapperTextClassName)}>
        <p
          className={cx(
            'flex flex-col items-center text-4xl transition-colors',
            textClassName,
          )}
        >
          <span className='font-medium leading-none'>{localCount}X</span>
          <span className='text-sm uppercase leading-none'>Combo</span>
        </p>
      </div>
    </div>
  );
});
