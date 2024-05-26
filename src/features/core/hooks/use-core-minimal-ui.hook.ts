import { useCallback, useEffect, useRef } from 'react';
import { useEventListener } from 'usehooks-ts';

import { useBoundStore } from './use-store.hook';

export function useCoreMinimalUI() {
  const isPlaying = useBoundStore((state) => state.isPlaying);
  const isMinimalUI = useBoundStore((state) => state.isMinimalUI);
  const setMinimalUI = useBoundStore((state) => state.setMinimalUI);
  const timeout = useRef<NodeJS.Timeout | null>(null);

  const triggerMinimalUI = useCallback(() => {
    isMinimalUI && setMinimalUI(false);

    if (!isPlaying) return;

    timeout.current && clearTimeout(timeout.current);
    timeout.current = setTimeout(() => {
      setMinimalUI(isPlaying);
    }, 1000);
  }, [isMinimalUI, isPlaying, setMinimalUI]);

  useEventListener('pointermove', triggerMinimalUI);

  useEffect(() => {
    !isPlaying && timeout.current && clearTimeout(timeout.current);
  }, [isPlaying]);
}
