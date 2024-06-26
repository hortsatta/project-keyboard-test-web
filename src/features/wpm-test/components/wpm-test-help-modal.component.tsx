import { memo } from 'react';

import { HEADER_CLASSNAME } from '#/base/helpers/modal.helper';
import { BaseModal } from '#/base/components/base-modal.component';

import type { ComponentProps } from 'react';

export const WPMTestHelpModal = memo(function (
  props: ComponentProps<typeof BaseModal>,
) {
  return (
    <BaseModal
      title='Help'
      description='Check shortcuts and other useful information.'
      {...props}
    >
      <div className='flex flex-col gap-5'>
        <div className='relative min-h-28'>
          <div className='relative z-10 flex flex-col gap-2.5'>
            <div className='flex w-full items-center justify-between'>
              <span>Show WPM Test Menu</span>
              <kbd className='w-fit rounded border border-text/80 px-2 py-1 text-sm leading-none text-text'>
                Escape
              </kbd>
            </div>
          </div>
          <h4 className={HEADER_CLASSNAME}>Shortcuts</h4>
        </div>
      </div>
    </BaseModal>
  );
});
