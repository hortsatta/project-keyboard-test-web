import { memo, useCallback, useMemo, useState } from 'react';
import WavesurferPlayer from '@wavesurfer/react';
import cx from 'classix';

import type { ComponentProps } from 'react';
import { BaseButton } from './base-button.component';

type Props = ComponentProps<'div'> & {
  audio?: Blob;
};

const APP_TITLE = import.meta.env.VITE_APP_TITLE;

const options = {
  waveColor: '#1a521b',
  cursorColor: '#2f9632',
  progressColor: '#2f9632',
  cursorWidth: 0,
  height: 80,
  barWidth: 2,
  barGap: 1,
  barHeight: 2,
  barRadius: 2,
  dragToSeek: true,
  normalize: true,
};

export const BaseAudioPlayer = memo(function ({
  className,
  audio,
  ...moreProps
}: Props) {
  const [wavesurfer, setWavesurfer] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const url = useMemo(() => (audio ? URL.createObjectURL(audio) : ''), [audio]);

  const toggleIsPlaying = useCallback(
    (isPlaying: boolean) => () => {
      setIsPlaying(isPlaying);
    },
    [],
  );

  const handleReady = useCallback((ws: unknown) => {
    setWavesurfer(ws);
    setIsPlaying(false);
  }, []);

  const handlePlayPause = useCallback(() => {
    wavesurfer && wavesurfer.playPause();
  }, [wavesurfer]);

  const handleDownload = useCallback(() => {
    const a = document.createElement('a');
    const currentTimeText = new Date()
      .toISOString()
      .toLowerCase()
      .replace(/\D/g, '');
    const filename = `${APP_TITLE.toLowerCase()}-recording-${currentTimeText}.webm`;

    a.href = url;
    a.className = 'hidden';
    a.download = filename;
    document.body.appendChild(a);
    a.click();
  }, [url]);

  return (
    <div
      className={cx('audio-player flex w-full items-center gap-2.5', className)}
      {...moreProps}
    >
      <BaseButton
        iconName={isPlaying ? 'pause' : 'play'}
        onClick={handlePlayPause}
      />
      <div className='w-full'>
        <WavesurferPlayer
          url={url}
          onReady={handleReady}
          onPlay={toggleIsPlaying(true)}
          onPause={toggleIsPlaying(false)}
          {...options}
        />
      </div>
      <BaseButton iconName='arrow-line-down' onClick={handleDownload} />
    </div>
  );
});
