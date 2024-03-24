import { memo } from 'react';

import type { ComponentProps } from 'react';

export const CoreHeader = memo(function (props: ComponentProps<'header'>) {
  return <header {...props}>Typen | Keyboard Typing Test</header>;
});
