import { useMemo } from 'react';

import { useBoundStore } from '#/core/hooks/use-store.hook';

const COUNTER_COLOR_CLASSNAMES = [
  '#061b19',
  '#041a1d',
  '#07171e',
  '#191502',
  '#1a0f06',
  '#1a0707',
  '#1a0811',
  '#0f0a1b',
];

export function useWPMTestComboCounterColorBackdrop() {
  const comboBackdropColorSync = useBoundStore(
    (state) => state.testSystemOptions.comboBackdropColorSync,
  );

  const count = useBoundStore((state) => state.comboCounter.count);

  const color = useMemo(() => {
    const transformedCount = +count.toString().padStart(3, '0').slice(-2);

    if (!comboBackdropColorSync || transformedCount < 20) return undefined;

    const index = +transformedCount.toString()[0] - 2;

    return COUNTER_COLOR_CLASSNAMES[index];
  }, [comboBackdropColorSync, count]);

  return color;
}
