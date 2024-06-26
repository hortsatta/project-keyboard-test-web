import { memo, useEffect, useState } from 'react';
import Odometer from 'react-odometerjs';
import cx from 'classix';

import type { ComponentProps } from 'react';

type Props = ComponentProps<'div'> & {
  score: number;
};

export const WPMTestScore = memo(function ({
  className,
  score,
  ...moreProps
}: Props) {
  const [localScore, setLocalScore] = useState<number | null>(null);

  useEffect(() => {
    const timeout = setTimeout(() => setLocalScore(score), 1000);

    return () => {
      clearTimeout(timeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={cx('flex flex-col items-center justify-center', className)}
      {...moreProps}
    >
      <Odometer
        className={cx(
          'odometer odometer-theme-default !font-body text-4xl',
          localScore == null ? 'opacity-0' : 'opacity-100',
        )}
        value={localScore || 0}
        format='d'
      />
      <span className='text-sm uppercase text-white/60'>Score</span>
    </div>
  );
});
