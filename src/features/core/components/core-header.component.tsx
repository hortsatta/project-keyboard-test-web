import { memo } from 'react';

import type { ComponentProps } from 'react';

const APP_TITLE = import.meta.env.VITE_APP_TITLE || 'Typen';

export const CoreHeader = memo(function (props: ComponentProps<'header'>) {
  return (
    <header {...props}>
      <h1>{APP_TITLE}</h1>
    </header>
  );
});
