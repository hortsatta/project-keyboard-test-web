import { memo, forwardRef, useMemo } from 'react';
import {
  ClockCountdown,
  Faders,
  MagicWand,
  Minus,
  Rewind,
  TextAa,
  YinYang,
} from '@phosphor-icons/react';

import type { Icon, IconProps } from '@phosphor-icons/react';
import type { IconName } from '../models/base.model';

type Props = IconProps & {
  name: IconName;
};

export const BaseIcon = memo(
  forwardRef<SVGSVGElement, Props>(function (
    { name, size, weight, ...moreProps },
    ref,
  ) {
    const PIcon: Icon | null = useMemo(() => {
      switch (name) {
        case 'clock-countdown':
          return ClockCountdown;
        case 'faders':
          return Faders;
        case 'magic-wand':
          return MagicWand;
        case 'minus':
          return Minus;
        case 'rewind':
          return Rewind;
        case 'text-aa':
          return TextAa;
        case 'yin-yang':
          return YinYang;
      }
    }, [name]);

    if (!PIcon) {
      return null;
    }

    return (
      <PIcon
        ref={ref}
        size={size || 26}
        weight={weight || 'regular'}
        {...moreProps}
      />
    );
  }),
);
