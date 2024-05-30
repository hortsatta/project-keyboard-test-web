import type { HookOptions } from 'use-sound/dist/types';

export function generateSoundOptions({
  soundEnabled,
  volume = 0.3,
  ...moreOptions
}: HookOptions) {
  return {
    volume,
    soundEnabled,
    ...moreOptions,
  };
}
