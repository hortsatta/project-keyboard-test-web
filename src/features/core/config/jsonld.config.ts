const APP_URL = import.meta.env.VITE_APP_URL;
const APP_TITLE = import.meta.env.VITE_APP_TITLE || 'Typen';
const APP_DESCRIPTION = import.meta.env.VITE_APP_DESCRIPTION;

export const data = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['WebPage', 'CollectionPage'],
      '@id': APP_URL,
      url: APP_URL,
      name: `${APP_TITLE} / ${APP_DESCRIPTION}`,
      isPartOf: {
        '@id': `${APP_URL}#website`,
      },
      description: APP_DESCRIPTION,
      breadcrumb: {
        '@id': `${APP_URL}#breadcrumb`,
      },
      inLanguage: 'en-US',
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${APP_URL}#breadcrumb`,
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
        },
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${APP_URL}#website`,
      url: APP_URL,
      name: APP_TITLE,
      description: APP_DESCRIPTION,
      publisher: {
        '@type': 'Organization',
        name: APP_TITLE,
        '@id': `${APP_URL}#organization`,
      },
      // potentialAction: [
      //   {
      //     '@type': 'SearchAction',
      //     target: {
      //       '@type': 'EntryPoint',
      //       urlTemplate: `${APP_URL}search?q={search_term_string}`,
      //     },
      //     'query-input': 'required name=search_term_string',
      //   },
      // ],
      inLanguage: 'en-US',
    },
    {
      '@type': 'Organization',
      '@id': `${APP_URL}#organization`,
      name: 'kutitot',
      url: APP_URL,
      logo: {
        '@type': 'ImageObject',
        inLanguage: 'en-US',
        '@id': `${APP_URL}#/schema/logo/image/`,
        url: `${APP_URL}media_logo.png`,
        contentUrl: `${APP_URL}media_logo.png`,
        caption: APP_URL,
      },
      image: {
        '@id': `${APP_URL}#/schema/logo/image/`,
      },
    },
  ],
};
