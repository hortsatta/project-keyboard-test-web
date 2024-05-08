import { memo, useMemo } from 'react';
import cx from 'classix';

import { useWPMTestComboCounterColorBackdrop } from '../hooks/use-wpm-test-combo-counter-color-backdrop.hook';

import type { ComponentProps } from 'react';

export const WPMTestComboColorBackdrop = memo(function ({
  className,
  ...moreProps
}: ComponentProps<'div'>) {
  const color = useWPMTestComboCounterColorBackdrop();

  const colorStyle = useMemo(() => {
    if (!color) {
      return undefined;
    }

    return { backgroundColor: color };
  }, [color]);

  return (
    <div
      style={colorStyle}
      className={cx('absolute flex h-full w-full justify-between', className)}
      {...moreProps}
    />
  );
});
