import { memo } from 'react';

import { BaseSectionHeader } from '#/base/components/base-section-header.component';
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
        <div className='flex items-center gap-2'>
          <div className='flex w-full items-center justify-between'>
            <span>Show WPM Test Menu</span>
            <kbd className='w-fit rounded border border-text/80 px-2 py-1 text-sm leading-none text-text'>
              Escape
            </kbd>
          </div>
          <BaseSectionHeader>Shortcuts</BaseSectionHeader>
        </div>
        <div className='w-full border-b border-border' />
        <div className='flex w-full items-center gap-2'>
          <ul className='w-full pb-2.5 pr-2.5 text-sm'>
            <li>
              When enabling "Record audio when playing", it is recommended to
              also enable "Type twice to start" to record the first key press.
            </li>
          </ul>
          <BaseSectionHeader>Tips</BaseSectionHeader>
        </div>
      </div>
    </BaseModal>
  );
});
