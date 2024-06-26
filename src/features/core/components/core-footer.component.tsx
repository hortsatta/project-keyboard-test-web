import { memo, useCallback, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import cx from 'classix';

import { BaseIcon } from '#/base/components/base-icon.component';
import { WPMTestHelpModal } from '#/wpm-test/components/wpm-test-help-modal.component';
import { pageRoutes } from '../config/page-routes.config';

import type { ComponentProps } from 'react';
import type { IconName } from '#/base/models/base.model';

type Props = ComponentProps<'footer'> & {
  isMinimal?: boolean;
};

type LinkProps = ComponentProps<typeof RouterLink> & {
  iconName?: IconName;
};

const APP_VERSION = import.meta.env.VITE_APP_VERSION;
const APP_EMAIL = import.meta.env.VITE_APP_EMAIL;

const LINK_CLASSNAME =
  'relative z-10 flex items-center gap-1.5 text-xs lowercase text-text opacity-50 transition-all hover:text-primary hover:no-underline hover:opacity-100';
const BORDER_CLASSNAME = 'h-4 border-r border-border';

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
  const [openHelp, setOpenHelp] = useState(false);

  const handleToggleHelpModal = useCallback(
    (open: boolean) => () => {
      setOpenHelp(open);
    },
    [],
  );

  return (
    <>
      <footer
        className={cx(
          'relative mx-auto flex w-full max-w-main flex-col items-center justify-between gap-2.5 py-3.5 duration-500 xs:flex-row',
          isMinimal && 'pointer-events-none opacity-0',
          className,
        )}
        {...moreProps}
      >
        <div className='relative z-10 flex w-full items-center justify-center gap-2.5 xs:gap-4'>
          <Link to={pageRoutes.termsOfService.path}>
            {pageRoutes.termsOfService.shortTitle}
          </Link>
          <div className={BORDER_CLASSNAME} />
          <Link to={pageRoutes.privacyPolicy.path}>
            {pageRoutes.privacyPolicy.shortTitle}
          </Link>
          <div className={BORDER_CLASSNAME} />
          <a href={`mailto:${APP_EMAIL}`} className={LINK_CLASSNAME}>
            Contact
          </a>
          <div className={BORDER_CLASSNAME} />
          <button
            type='button'
            className={LINK_CLASSNAME}
            onClick={handleToggleHelpModal(true)}
          >
            Help
          </button>
        </div>
        <div className='static left-0 flex w-full items-center justify-center gap-2.5 xs:absolute xs:justify-between'>
          <span className='flex w-16 items-center gap-1 text-sm text-text/20'>
            <BaseIcon name='app-window' size={14} weight='bold' />
            {APP_VERSION}
          </span>
          <span className='flex w-16 items-center gap-1 text-sm text-text/20'>
            <BaseIcon name='copyright' size={14} weight='bold' />
            {currentYear}
          </span>
        </div>
      </footer>
      <WPMTestHelpModal
        open={openHelp}
        onClose={handleToggleHelpModal(false)}
      />
    </>
  );
});
