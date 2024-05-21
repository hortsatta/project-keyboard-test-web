import { useMemo } from 'react';
import { Helmet } from 'react-helmet-async';

import { data } from '#/core/config/jsonld.config';

import type { ComponentProps } from 'react';

type Props = ComponentProps<typeof Helmet> & {
  title?: string;
  description?: string;
};

const APP_URL = import.meta.env.VITE_APP_URL;
const APP_TITLE = import.meta.env.VITE_APP_TITLE || 'Typen';
const APP_DESCRIPTION = import.meta.env.VITE_APP_DESCRIPTION;

export function BaseSEO({ title, description, ...moreProps }: Props) {
  const currentTitle = useMemo(() => {
    if (title?.trim()) {
      return `${title} / ${APP_TITLE}`;
    }

    return `${APP_TITLE} / ${APP_DESCRIPTION}`;
  }, [title]);

  return (
    <Helmet {...moreProps}>
      <title>{currentTitle}</title>
      <link rel='canonical' href={APP_URL} />
      {/* OpenGraph Tags */}
      <meta name='description' content={description || APP_DESCRIPTION} />
      <meta property='og:title' content={title || APP_TITLE} />
      <meta
        property='og:description'
        content={description || APP_DESCRIPTION}
      />
      {/* Twitter Card Tags */}
      <meta name='twitter:title' content={title || APP_TITLE} />
      <meta
        name='twitter:description'
        content={description || APP_DESCRIPTION}
      />
      <script type='application/ld+json'>{JSON.stringify(data)}</script>
    </Helmet>
  );
}
