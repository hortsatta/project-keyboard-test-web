import { useCoreMinimalUI } from '#/core/hooks/use-core-minimal-ui.hook';
import { BaseScene } from '#/base/components/base-scene.component';
import { WPMTestStage } from '../components/wpm-test-stage.component';

export function WPMTestPage() {
  useCoreMinimalUI();

  return (
    <BaseScene>
      <WPMTestStage className='mb-24 w-full pb-12' />
    </BaseScene>
  );
}
