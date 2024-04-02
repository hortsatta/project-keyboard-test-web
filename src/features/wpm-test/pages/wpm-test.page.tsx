import { WPMTestStage } from '../components/wpm-test-stage.component';

export function WPMTestPage() {
  return (
    <div className='relative flex h-screen w-full flex-col items-center justify-center'>
      <WPMTestStage className='mb-24 w-full pb-12' />
    </div>
  );
}
