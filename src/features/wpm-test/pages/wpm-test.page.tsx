import { WPMTestStage } from '../components/wpm-test-stage.component';
import { WPMTestToolbarMenu } from '../components/wpm-test-toolbar-menu.component';

export function WPMTestPage() {
  return (
    <div className='relative flex h-[calc(100vh-110px)] flex-col justify-center'>
      <WPMTestStage className='pb-40' />
      <div className='absolute bottom-0 flex w-full justify-center pb-10'>
        <WPMTestToolbarMenu className='max-w-4xl pl-2 pr-4' />
      </div>
    </div>
  );
}
