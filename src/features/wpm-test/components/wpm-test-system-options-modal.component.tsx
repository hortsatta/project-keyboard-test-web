import { memo, useCallback } from 'react';

import { useBoundStore } from '#/core/hooks/use-store.hook';
import { BaseSwitchToggle } from '#/base/components/base-switch-toggle.component';
import { BaseModal } from '#/base/components/base-modal.component';

import type { ComponentProps } from 'react';

export const WPMTestSystemOptionsModal = memo(function (
  props: ComponentProps<typeof BaseModal>,
) {
  const { comboBackdropColorSync } = useBoundStore(
    (state) => state.testSystemOptions,
  );

  const setTestSystemOptions = useBoundStore(
    (state) => state.setTestSystemOptions,
  );

  const handleComboColorSyncToggle = useCallback(() => {
    setTestSystemOptions({ comboBackdropColorSync: !comboBackdropColorSync });
  }, [comboBackdropColorSync, setTestSystemOptions]);

  return (
    <BaseModal
      title='System Settings'
      description='Toggle features to fit your style.'
      {...props}
    >
      <BaseSwitchToggle
        enabled={!comboBackdropColorSync}
        onChange={handleComboColorSyncToggle}
      >
        Disable combo background color sync
      </BaseSwitchToggle>
    </BaseModal>
  );
});
