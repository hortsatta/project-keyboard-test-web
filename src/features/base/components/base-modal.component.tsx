import { Fragment, memo } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import cx from 'classix';

import type { ComponentProps, ReactNode } from 'react';

type Props = Omit<ComponentProps<typeof Dialog>, 'children'> & {
  open: boolean;
  title?: string;
  description?: string;
  children?: ReactNode;
  onClose?: () => void;
};

export const BaseModal = memo(function ({
  open,
  title,
  description,
  onClose,
  children,
}: Props) {
  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as='div' className='relative z-50' onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black/25' />
        </Transition.Child>
        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4 text-center'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <Dialog.Panel className='bg-surface min-h-60 w-full max-w-md transform overflow-hidden rounded-md border border-border px-8 py-6 text-left align-middle transition-all'>
                {title && (
                  <Dialog.Title
                    as='h3'
                    className='text-lg font-medium leading-none'
                  >
                    {title}
                  </Dialog.Title>
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
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
});