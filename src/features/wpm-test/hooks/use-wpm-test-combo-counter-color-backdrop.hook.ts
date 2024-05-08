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
    if (comboBackdropColorSync && count >= 20 && count < 100) {
      const index = +count.toString()[0] - 2;
      return COUNTER_COLOR_CLASSNAMES[index];
    }

    return undefined;
  }, [comboBackdropColorSync, count]);

  return color;
}
