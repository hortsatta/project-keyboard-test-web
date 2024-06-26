import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useBoundStore } from '#/core/hooks/use-store.hook';
import { BaseScene } from '#/base/components/base-scene.component';
import { WPMTestResults } from '../components/wpm-test-results.component';

import '#/assets/css/odometer-theme-default.css';

export function WPMTestResultsPage() {
  const navigate = useNavigate();
  const isComplete = useBoundStore((state) => state.isComplete);

  useEffect(() => {
    !isComplete && navigate('/');
  }, [isComplete, navigate]);

  return (
    <BaseScene>
      <WPMTestResults className='mt-40' />
    </BaseScene>
  );
}
