import { memo, useCallback, useEffect, useMemo, useRef } from 'react';

import { BaseModal } from '#/base/components/base-modal.component';
import { BaseInput } from '#/base/components/base-input.component';
import { BaseButton } from '#/base/components/base-button.component';

import type { ComponentProps, FormEvent, KeyboardEvent } from 'react';

type Props = ComponentProps<typeof BaseModal> & {
  isTime: boolean;
};

const MIN = 10;

export const WPMTestAmountCustomSetterModal = memo(function ({
  isTime,
  open,
  onClose,
  onSubmit,
  ...moreProps
}: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const title = useMemo(
    () => `Custom ${isTime ? 'Time' : 'Number of Words'}`,
    [isTime],
  );

  const description = useMemo(
    () => `Set your preferred ${isTime ? 'time in seconds' : 'amount'}.`,
    [isTime],
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key !== '.') return;
      event.preventDefault();
    },
    [],
  );

  const handleInput = useCallback((event: FormEvent<HTMLInputElement>) => {
    (event.target as any).value = (event.target as any).value.replace(
      /[^0-9]*/g,
      '',
    );
  }, []);

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const target = +(inputRef.current as any).value;

      target >= MIN && onSubmit && onSubmit(+(inputRef.current as any).value);

      onClose();
    },
    [onClose, onSubmit],
  );

  useEffect(() => {
    if (!open) return;

    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  }, [open]);

  return (
    <BaseModal
      title={title}
      description={description}
      open={open}
      onClose={onClose}
      small
      {...moreProps}
    >
      <form
        className='flex flex-col items-center gap-4'
        onSubmit={handleSubmit}
      >
        <BaseInput
          ref={inputRef}
          type='number'
          tabIndex={0}
          min={MIN}
          className='text-center text-2xl'
          onKeyDown={handleKeyDown}
          onInput={handleInput}
        />
        <BaseButton type='submit' variant='secondary' className='w-full'>
          Set Value
        </BaseButton>
      </form>
    </BaseModal>
  );
});
