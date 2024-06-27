import { memo, forwardRef, useMemo } from 'react';
import {
  AppWindow,
  ArrowLineDown,
  ArrowUp,
  Backspace,
  ClockCountdown,
  Copyright,
  EnvelopeSimple,
  Faders,
  FileLock,
  Keyboard,
  List,
  MagicWand,
  Microphone,
  MicrophoneSlash,
  Minus,
  Pause,
  Play,
  Rewind,
  Scroll,
  TextAa,
  X as XMark,
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
        case 'app-window':
          return AppWindow;
        case 'arrow-line-down':
          return ArrowLineDown;
        case 'arrow-up':
          return ArrowUp;
        case 'backspace':
          return Backspace;
        case 'clock-countdown':
          return ClockCountdown;
        case 'copyright':
          return Copyright;
        case 'envelope-simple':
          return EnvelopeSimple;
        case 'faders':
          return Faders;
        case 'file-lock':
          return FileLock;
        case 'keyboard':
          return Keyboard;
        case 'list':
          return List;
        case 'magic-wand':
          return MagicWand;
        case 'microphone':
          return Microphone;
        case 'microphone-slash':
          return MicrophoneSlash;
        case 'minus':
          return Minus;
        case 'play':
          return Play;
        case 'pause':
          return Pause;
        case 'rewind':
          return Rewind;
        case 'scroll':
          return Scroll;
        case 'text-aa':
          return TextAa;
        case 'x-mark':
          return XMark;
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
