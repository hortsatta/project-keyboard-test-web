import { Fragment, memo } from 'react';
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from '@headlessui/react';
import cx from 'classix';

import type { ComponentProps, ReactNode } from 'react';

type Props = Omit<ComponentProps<typeof Dialog>, 'children'> & {
  open: boolean;
  title?: string;
  description?: string;
  small?: boolean;
  children?: ReactNode;
  onClose?: () => void;
};

export const BaseModal = memo(function ({
  open,
  title,
  description,
  small,
  children,
  onClose,
  onKeyDown,
}: Props) {
  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog
        as='div'
        className='relative z-50'
        onClose={onClose}
        onKeyDown={onKeyDown}
      >
        <TransitionChild
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black/25' />
        </TransitionChild>
        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4 text-center'>
            <TransitionChild
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <DialogPanel
                className={cx(
                  'min-h-60 w-full transform overflow-hidden rounded-md border border-border bg-surface px-8 py-6 text-left align-middle transition-all',
                  small ? 'max-w-xs' : 'max-w-md',
                )}
              >
                {title && (
                  <DialogTitle
                    as='h3'
                    className='text-lg font-medium leading-none'
                  >
                    {title}
                  </DialogTitle>
                )}
                {description && (
                  <div className='mt-2'>
                    <p className='text-xs italic text-white/60'>
                      {description}
                    </p>
                  </div>
                )}
                {(title || description) && (
                  <div className='mb-4 mt-5 w-full border-b border-border' />
                )}
                <div className={cx((title || description) && 'mt-5')}>
                  {children}
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
});
