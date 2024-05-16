import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import cx from 'classix';

import { BaseButton } from '#/base/components/base-button.component';
import { BaseIcon } from '#/base/components/base-icon.component';
import { BaseModal } from '#/base/components/base-modal.component';
import { TestMode } from '../models/wpm-test.model';

import type { ComponentProps, KeyboardEvent } from 'react';
import type { IconName } from '#/base/models/base.model';

type Props = ComponentProps<typeof BaseModal> & {
  mode: TestMode;
  testModes: {
    value: TestMode;
    iconName: string;
    label: string;
  }[];
  timeWordAmount: number;
  isTimeWordAmountCustom: boolean;
  amountList?: number[] | undefined;
  resetTest: () => void;
  onModeChange: (targetMode: TestMode) => () => void;
  onAmountChange: (amount: number) => () => void;
  onOpenAmountCustomSetter: () => void;
  onOpenSystemOptions: () => void;
};

const BUTTON_COL_CLASSNAME = 'flex h-10 gap-2 !px-1';
const BUTTON_ROW_CLASSNAME = 'flex h-10 w-12 gap-2 !px-1';
const WRAPPER_OPTIONS_COL_CLASSNAME = 'flex flex-col gap-2';

export const WPMTestMainMenuModal = memo(function ({
  open,
  mode,
  testModes,
  timeWordAmount,
  amountList,
  isTimeWordAmountCustom,
  resetTest,
  onModeChange,
  onAmountChange,
  onOpenAmountCustomSetter,
  onOpenSystemOptions,
  onClose,
  ...moreProps
}: Props) {
  const [cursor, setCursor] = useState<number | null>(null);

  const customAmountClassName = useMemo(
    () => `menu-item-${testModes.length + (amountList?.length || 0) + 1}`,
    [testModes, amountList],
  );

  const systemOptionsClassName = useMemo(() => {
    const count = amountList?.length || 0;
    return `menu-item-${testModes.length + count + (count > 0 ? 2 : 1)}`;
  }, [testModes, amountList]);

  const closeMenuClassName = useMemo(() => {
    const count = amountList?.length || 0;
    return `menu-item-${testModes.length + count + (count > 0 ? 3 : 2)}`;
  }, [testModes, amountList]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'ArrowUp') {
        setCursor((prev) => (prev == null || prev <= 0 ? 0 : prev - 1));
      } else if (event.key === 'ArrowDown') {
        if (cursor == null) {
          setCursor(0);
        } else {
          const element = document.querySelector(`.menu-item-${cursor + 1}`);

          if (!element) return;

          setCursor((prev) => (prev || 0) + 1);
        }
      }
    },
    [cursor],
  );

  useEffect(() => {
    const element = document.querySelector(`.menu-item-${cursor}`);
    (element as any)?.focus();
  }, [cursor]);

  useEffect(() => {
    if (open) return;
    setCursor(null);
  }, [open]);

  return (
    <BaseModal
      open={open}
      title='Menu'
      description='Set typing mode and options'
      onKeyDown={handleKeyDown}
      onClose={onClose}
      {...moreProps}
    >
      <div className='flex flex-col gap-5'>
        <div className={WRAPPER_OPTIONS_COL_CLASSNAME}>
          <BaseButton
            className={cx(BUTTON_COL_CLASSNAME, 'menu-item-0')}
            iconName='rewind'
            onClick={resetTest}
          >
            Reset Test
          </BaseButton>
        </div>
        <div className='w-full border-b border-b-border' />
        <div className='flex items-center justify-center gap-5'>
          <div className={WRAPPER_OPTIONS_COL_CLASSNAME}>
            {testModes.map(({ value, iconName }, index) => (
              <BaseButton
                key={`tm-${value}`}
                className={cx(BUTTON_ROW_CLASSNAME, `menu-item-${index + 1}`)}
                iconName={iconName as IconName}
                onClick={onModeChange(value)}
                active={value === mode}
              />
            ))}
          </div>
          <div className='h-32 border-r border-r-border' />
          <div className='grid grid-cols-2 gap-2'>
            {amountList?.map((amount, index) => (
              <BaseButton
                key={`ta-${amount}`}
                className={cx(
                  BUTTON_ROW_CLASSNAME,
                  `menu-item-${testModes.length + index + 1}`,
                )}
                onClick={onAmountChange(amount)}
                active={amount === timeWordAmount}
              >
                {amount}
              </BaseButton>
            ))}
            {mode === TestMode.Zen ? (
              <BaseIcon name='minus' className='opacity-50' />
            ) : (
              <BaseButton
                className={cx(BUTTON_ROW_CLASSNAME, customAmountClassName)}
                iconName='magic-wand'
                active={isTimeWordAmountCustom}
                onClick={onOpenAmountCustomSetter}
              />
            )}
          </div>
        </div>
        <div className='w-full border-b border-b-border' />
        <div className={WRAPPER_OPTIONS_COL_CLASSNAME}>
          <BaseButton
            className={cx(BUTTON_COL_CLASSNAME, systemOptionsClassName)}
            iconName='faders'
            onClick={onOpenSystemOptions}
          >
            System Options
          </BaseButton>
          <BaseButton
            className={cx(BUTTON_COL_CLASSNAME, closeMenuClassName)}
            iconName='x-mark'
            onClick={onClose}
          >
            Close Menu
          </BaseButton>
        </div>
      </div>
    </BaseModal>
  );
});
