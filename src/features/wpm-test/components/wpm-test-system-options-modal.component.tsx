import { memo, useCallback } from 'react';

import { useBoundStore } from '#/core/hooks/use-store.hook';
import { BaseSwitchToggle } from '#/base/components/base-switch-toggle.component';
import { BaseModal } from '#/base/components/base-modal.component';

import type { ComponentProps } from 'react';
import type { TestSystemOptions } from '../models/wpm-test.model';

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
      <div className='flex flex-col gap-2.5'>
        <BaseSwitchToggle
          enabled={!!comboMultiplierAutoActivate}
          onChange={settingsToggle({
            comboMultiplierAutoActivate: !comboMultiplierAutoActivate,
          })}
        >
          Auto activate combo multiplier
        </BaseSwitchToggle>
        <BaseSwitchToggle
          enabled={!!comboBackdropColorSync}
          onChange={settingsToggle({
            comboBackdropColorSync: !comboBackdropColorSync,
          })}
        >
          Sync combo background color
        </BaseSwitchToggle>
        <BaseSwitchToggle
          enabled={!!perfectWordSfx}
          onChange={settingsToggle({ perfectWordSfx: !perfectWordSfx })}
        >
          Sfx on perfect word
        </BaseSwitchToggle>
        <BaseSwitchToggle
          enabled={!!notCorrectWordSfx}
          onChange={settingsToggle({ notCorrectWordSfx: !notCorrectWordSfx })}
        >
          Sfx on mistake word
        </BaseSwitchToggle>
      </div>
    </BaseModal>
  );
});
