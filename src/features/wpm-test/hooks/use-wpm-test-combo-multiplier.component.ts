import { useEffect, useMemo, useRef, useState } from 'react';
import useSound from 'use-sound';

import { generateSoundOptions } from '#/core/config/system.config';
import { useBoundStore } from '#/core/hooks/use-store.hook';
import {
  MAX_STOCK_COMBO_MULTIPLIER,
  STOCK_COMBO_MULTIPLIER_SEC,
} from '../config/wpm-test.config';

import multiplierActiveMp3 from '#/assets/sfx/multiplier-active.mp3';
import multiplierEmptyMp3 from '#/assets/sfx/multiplier-empty.mp3';
import multiplierEnoughMp3 from '#/assets/sfx/multiplier-enough.mp3';

type Result = {
  active: boolean;
  stock: number;
  percent: number;
};

const SFX_VOLUME = 0.1;

export function useWPMTestComboMultiplier(): Result {
  const isPlaying = useBoundStore((state) => state.isPlaying);

  const { active, stock } = useBoundStore((state) => state.comboMultiplier);

  const { comboMultiplierAutoActivate } = useBoundStore(
    (state) => state.testSystemOptions,
  );

  const activateComboMultiplier = useBoundStore(
    (state) => state.activateComboMultiplier,
  );

  const clearComboMultiplier = useBoundStore(
    (state) => state.clearComboMultiplier,
  );

  const { comboMultiplierSfx } = useBoundStore(
    (state) => state.testSystemOptions,
  );

  const [playMultiplierActiveSfx] = useSound(
    multiplierActiveMp3,
    generateSoundOptions({
      volume: SFX_VOLUME,
      soundEnabled: comboMultiplierSfx,
    }),
  );

  const [playMultiplierEmptySfx] = useSound(
    multiplierEmptyMp3,
    generateSoundOptions({
      volume: SFX_VOLUME,
      soundEnabled: comboMultiplierSfx,
    }),
  );

  const [playMultiplierEnoughSfx] = useSound(
    multiplierEnoughMp3,
    generateSoundOptions({
      volume: SFX_VOLUME,
      soundEnabled: comboMultiplierSfx,
    }),
  );

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const timeMs = useRef<number>(0);
  const prevMs = useRef<number>(timeMs.current);
  const [timer, setTimer] = useState(0);

  const percent = useMemo(
    () =>
      Math.floor(
        (timer / (MAX_STOCK_COMBO_MULTIPLIER * STOCK_COMBO_MULTIPLIER_SEC)) *
          100,
      ),
    [timer],
  );

  useEffect(() => {
    if (!active || timeMs.current <= 0) return;

    const initialTimeMs = timeMs.current;
    let initialTimestampMs: number;
    let handle: number;

    const step = (timestampMs: number) => {
      if (initialTimestampMs === undefined) {
        initialTimestampMs = timestampMs;
      }

      const elapsed = timestampMs - initialTimestampMs;
      timeMs.current = initialTimeMs - elapsed;

      if (timeMs.current <= 0) {
        setTimer(0);
        cancelAnimationFrame(handle);
        clearComboMultiplier();
      } else {
        const seconds = Math.floor(timeMs.current / 1000);
        const isUpdate = seconds !== Math.floor(prevMs.current / 1000);

        prevMs.current = timeMs.current;

        if (isUpdate) {
          setTimer(seconds);
        }

        if (active) {
          handle = window.requestAnimationFrame(step);
        }
      }
    };

    handle = window.requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(handle);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  useEffect(() => {
    const timeSec = stock * STOCK_COMBO_MULTIPLIER_SEC;

    setTimer(timeSec);
    timeMs.current = timeSec * 1000;
    prevMs.current = timeSec * 1000;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stock]);

  useEffect(() => {
    if (active || percent < 100 || !comboMultiplierAutoActivate) {
      return;
    }

    timeoutRef.current = setTimeout(() => {
      activateComboMultiplier(true);
    }, 300);

    return () => {
      timeoutRef.current && clearTimeout(timeoutRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [percent, active, comboMultiplierAutoActivate]);

  useEffect(() => {
    if (!isPlaying) return;

    active ? playMultiplierActiveSfx() : playMultiplierEmptySfx();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  useEffect(() => {
    if (!isPlaying) return;

    stock === 1 && playMultiplierEnoughSfx();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stock]);

  return {
    active,
    stock,
    percent,
  };
}
