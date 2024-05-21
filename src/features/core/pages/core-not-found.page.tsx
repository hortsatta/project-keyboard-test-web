import { BaseScene } from '#/base/components/base-scene.component';
import { BaseSEO } from '#/base/components/base-seo.component';

export function CoreNotFoundPage() {
  return (
    <>
      <BaseSEO />
      <BaseScene className='page-content' title='Not Found'>
        Sorry the requested page does not exist!
      </BaseScene>
    </>
  );
}
