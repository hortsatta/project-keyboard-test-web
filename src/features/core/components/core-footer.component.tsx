import { memo } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import cx from 'classix';

import { BaseIcon } from '#/base/components/base-icon.component';
import { pageRoutes } from '../config/page-routes.config';

import type { ComponentProps } from 'react';
import type { IconName } from '#/base/models/base.model';

type Props = ComponentProps<'footer'> & {
  isMinimal?: boolean;
};

type LinkProps = ComponentProps<typeof RouterLink> & {
  iconName?: IconName;
};

const APP_EMAIL = import.meta.env.VITE_APP_EMAIL;
const LINK_CLASSNAME =
  'relative z-10 flex items-center gap-1.5 text-xs lowercase text-text opacity-50 transition-all hover:text-primary hover:no-underline hover:opacity-100';
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
  isMinimal,
  ...moreProps
}: Props) {
  return (
    <footer
      className={cx(
        'relative mx-auto flex w-full max-w-main items-center justify-between gap-2.5 py-3.5 duration-500',
        isMinimal && 'pointer-events-none opacity-0',
        className,
      )}
      {...moreProps}
    >
      {/* <span className='w-[52px] text-sm lowercase text-text/20'>
        {APP_TITLE}
      </span> */}
      <div className='w-[52px]' />
      <div className='flex items-center gap-5'>
        <Link to={pageRoutes.termsOfService.path} iconName='scroll'>
          {pageRoutes.termsOfService.shortTitle}
        </Link>
        <Link to={pageRoutes.privacyPolicy.path} iconName='file-lock'>
          {pageRoutes.privacyPolicy.shortTitle}
        </Link>
        <a href={`mailto:${APP_EMAIL}`} className={LINK_CLASSNAME}>
          <BaseIcon name='envelope-simple' size={18} />
          Contact
        </a>
      </div>
      <span className='flex w-[52px] items-center gap-1 text-sm text-text/20'>
        <BaseIcon name='copyright' size={14} weight='bold' />
        {currentYear}
      </span>
    </footer>
  );
});
