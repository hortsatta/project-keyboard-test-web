import { memo, useCallback } from 'react';

import { useBoundStore } from '#/core/hooks/use-store.hook';
import { BaseSwitchToggle } from '#/base/components/base-switch-toggle.component';
import { BaseModal } from '#/base/components/base-modal.component';

import type { ComponentProps } from 'react';
import type { TestSystemOptions } from '../models/wpm-test.model';

const HEADER_CLASSNAME =
  'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl uppercase text-primary/10';

export const WPMTestSystemOptionsModal = memo(function (
  props: ComponentProps<typeof BaseModal>,
) {
  const {
    comboMultiplierAutoActivate,
    comboBackdropColorSync,
    perfectWordSfx,
    notCorrectWordSfx,
  } = useBoundStore((state) => state.testSystemOptions);

  const setTestSystemOptions = useBoundStore(
    (state) => state.setTestSystemOptions,
  );

  const settingsToggle = useCallback(
    (testSystemOptions: TestSystemOptions) => () => {
      setTestSystemOptions(testSystemOptions);
    },
    [setTestSystemOptions],
  );

  return (
    <BaseModal
      title='System Settings'
      description='Toggle features to fit your style.'
      {...props}
    >
      <div className='flex flex-col gap-5'>
        <div className='relative'>
          <div className='relative z-10 flex flex-col gap-2.5'>
            <BaseSwitchToggle
              enabled={!!comboMultiplierAutoActivate}
              onChange={settingsToggle({
                comboMultiplierAutoActivate: !comboMultiplierAutoActivate,
              })}
            >
              Auto activate multiplier
            </BaseSwitchToggle>
            <BaseSwitchToggle
              enabled={!!comboBackdropColorSync}
              onChange={settingsToggle({
                comboBackdropColorSync: !comboBackdropColorSync,
              })}
            >
              Sync background color
            </BaseSwitchToggle>
          </div>
          <h4 className={HEADER_CLASSNAME}>Combo</h4>
        </div>
        <div className='w-full border-b border-border' />
        <div className='relative'>
          <div className='relative z-10 flex flex-col gap-2.5'>
            <BaseSwitchToggle
              enabled={!!perfectWordSfx}
              onChange={settingsToggle({ perfectWordSfx: !perfectWordSfx })}
            >
              Perfect word
            </BaseSwitchToggle>
            <BaseSwitchToggle
              enabled={!!notCorrectWordSfx}
              onChange={settingsToggle({
                notCorrectWordSfx: !notCorrectWordSfx,
              })}
            >
              Mistake word
            </BaseSwitchToggle>
          </div>
          <h4 className={HEADER_CLASSNAME}>Sound</h4>
        </div>
      </div>
    </BaseModal>
  );
});
