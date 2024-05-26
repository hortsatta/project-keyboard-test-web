import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useBoundStore } from '#/core/hooks/use-store.hook';
import { BaseScene } from '#/base/components/base-scene.component';
import { WPMTestResults } from '../components/wpm-test-results.component';

export function WPMTestResultsPage() {
  const navigate = useNavigate();
  const isComplete = useBoundStore((state) => state.isComplete);

  useEffect(() => {
    !isComplete && navigate('/');
  }, [isComplete, navigate]);

  return (
    <BaseScene>
      <WPMTestResults className='mt-48' />
    </BaseScene>
  );
}
