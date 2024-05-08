import { memo, useCallback, useMemo, useRef } from 'react';

import { BaseModal } from '#/base/components/base-modal.component';
import { BaseInput } from '#/base/components/base-input.component';
import { BaseButton } from '#/base/components/base-button.component';

import type { ComponentProps, FormEvent, KeyboardEvent } from 'react';

type Props = ComponentProps<typeof BaseModal> & {
  isTime: boolean;
};

export const WPMTestAmountCustomSetterModal = memo(function ({
  isTime,
  onClose,
  onSubmit,
  ...moreProps
}: Props) {
  const inputRef = useRef(null);

  const title = useMemo(
    () => `Custom ${isTime ? 'Time' : 'Number of Words'}`,
    [isTime],
  );

  const description = useMemo(
    () => `Set your preferred ${isTime ? 'time' : 'amount'}.`,
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

      if (onSubmit && inputRef.current) {
        onSubmit && onSubmit(+(inputRef.current as any).value);
      }

      onClose();
    },
    [onClose, onSubmit],
  );

  return (
    <BaseModal
      title={title}
      description={description}
      onClose={onClose}
      {...moreProps}
    >
      <form className='flex items-center gap-4' onSubmit={handleSubmit}>
        <BaseInput
          ref={inputRef}
          type='number'
          tabIndex={0}
          description={isTime ? 'Seconds' : 'Words'}
          min={10}
          className='text-right text-2xl'
          onKeyDown={handleKeyDown}
          onInput={handleInput}
        />
        <BaseButton
          type='submit'
          className='h-[66px] w-60 border border-primary bg-primary/20'
        >
          Set
        </BaseButton>
      </form>
    </BaseModal>
  );
});
