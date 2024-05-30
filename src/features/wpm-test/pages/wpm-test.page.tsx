import { useCoreMinimalUI } from '#/core/hooks/use-core-minimal-ui.hook';
import {
  useBasePreloadImages,
  useBasePreloadSounds,
} from '#/base/hooks/use-base-preload-assets.hook';
import { BaseScene } from '#/base/components/base-scene.component';
import { WPMTestStage } from '../components/wpm-test-stage.component';

import iconCorrectPng from '#/assets/images/icon-correct.png';
import iconNotCorrectPng from '#/assets/images/icon-not-correct.png';
import iconPerfectPng from '#/assets/images/icon-perfect.png';
import iconPerfect2Png from '#/assets/images/icon-perfect-2.png';
import ratingBgPng from '#/assets/images/rating-bg.png';
import wordPerfectMp3 from '#/assets/sfx/word-perfect.mp3';
import wordNotCorrectMp3 from '#/assets/sfx/word-not-correct.mp3';
import multiplierActiveMp3 from '#/assets/sfx/multiplier-active.mp3';
import multiplierEnoughMp3 from '#/assets/sfx/multiplier-enough.mp3';
import multiplierEmptyMp3 from '#/assets/sfx/multiplier-empty.mp3';

const preloadImages = [
  iconCorrectPng,
  iconNotCorrectPng,
  iconPerfectPng,
  iconPerfect2Png,
  ratingBgPng,
  '/images/rating-a.svg',
  '/images/rating-b.svg',
  '/images/rating-c.svg',
  '/images/rating-d.svg',
  '/images/rating-e.svg',
  '/images/rating-s.svg',
  '/images/rating-sss.svg',
  '/images/rating-a-stroke.svg',
  '/images/rating-b-stroke.svg',
  '/images/rating-c-stroke.svg',
  '/images/rating-d-stroke.svg',
  '/images/rating-e-stroke.svg',
  '/images/rating-s-stroke.svg',
  '/images/rating-sss-stroke.svg',
];

const preloadSounds = [
  wordPerfectMp3,
  wordNotCorrectMp3,
  multiplierActiveMp3,
  multiplierEnoughMp3,
  multiplierEmptyMp3,
];

export function WPMTestPage() {
  useBasePreloadImages(preloadImages);
  useBasePreloadSounds(preloadSounds);
  useCoreMinimalUI();

  return (
    <BaseScene className='!mt-0 h-screen !items-start !pb-0 2lg:justify-center'>
      <WPMTestStage className='mb-24 w-full pb-12' />
    </BaseScene>
  );
}
