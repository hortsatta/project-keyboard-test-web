import { memo } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import cx from 'classix';

import { BaseIcon } from '#/base/components/base-icon.component';
import { pageRoutes } from '../config/page-routes.config';

import type { ComponentProps } from 'react';
import type { IconName } from '#/base/models/base.model';

type LinkProps = ComponentProps<typeof RouterLink> & {
  iconName?: IconName;
};

const APP_TITLE = import.meta.env.VITE_APP_TITLE || 'Typen';
const APP_EMAIL = import.meta.env.VITE_APP_EMAIL;

const LINK_CLASSNAME =
  'flex items-center gap-1.5 text-xs lowercase text-text opacity-60 transition-all hover:text-primary hover:no-underline hover:opacity-100';

const currentYear = new Date().getFullYear();

const Link = memo(function ({ iconName, children, ...moreProps }: LinkProps) {
  return (
    <RouterLink className={LINK_CLASSNAME} {...moreProps}>
      {iconName && <BaseIcon name={iconName} size={18} />}
      {children}
    </RouterLink>
  );
});

export const CoreFooter = memo(function ({
  className,
  ...moreProps
}: ComponentProps<'footer'>) {
  return (
    <footer
      className={cx(
        'mx-auto flex w-full max-w-main flex-col items-center justify-between gap-2.5 py-3.5 sm:flex-row',
        className,
      )}
      {...moreProps}
    >
      <div className='flex items-center gap-5'>
        <a href={`mailto:${APP_EMAIL}`} className={LINK_CLASSNAME}>
          <BaseIcon name='envelope-simple' size={18} />
          Contact Us
        </a>
        <Link to={pageRoutes.termsOfService.path} iconName='scroll'>
          {pageRoutes.termsOfService.title}
        </Link>
        <Link to={pageRoutes.privacyPolicy.path} iconName='file-lock'>
          {pageRoutes.privacyPolicy.title}
        </Link>
      </div>
      <span className={cx(LINK_CLASSNAME, '!normal-case')}>
        <BaseIcon name='copyright' size={18} />
        {currentYear} {APP_TITLE}
      </span>
    </footer>
  );
});
