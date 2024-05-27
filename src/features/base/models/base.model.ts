import type { Placement } from '@floating-ui/react';

export type IconName =
  | 'app-window'
  | 'backspace'
  | 'clock-countdown'
  | 'copyright'
  | 'envelope-simple'
  | 'faders'
  | 'file-lock'
  | 'keyboard'
  | 'list'
  | 'magic-wand'
  | 'minus'
  | 'rewind'
  | 'scroll'
  | 'text-aa'
  | 'x-mark'
  | 'yin-yang';

export type ButtonVariant = 'primary' | 'secondary';

export type ButtonSize = 'base' | 'sm';

export type TooltipOptions = {
  initialOpen?: boolean;
  placement?: Placement;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};
