import { useEffect, useState } from 'react';
import { useAudioRecorder } from 'react-audio-voice-recorder';

import { useBoundStore } from '#/core/hooks/use-store.hook';

type Result = {
  hasError: boolean;
  recordingBlob: Blob | undefined;
};

export function useWPMTestAudioRecorder(): Result {
  const isPlaying = useBoundStore((state) => state.isPlaying);
  const isTwicePlaying = useBoundStore((state) => state.isTwicePlaying);
  const isComplete = useBoundStore((state) => state.isComplete);
  const { typeTwiceToStart, recordAudioWhenPlaying } = useBoundStore(
    (state) => state.testSystemOptions,
  );
  const [hasError, setHasError] = useState(false);

  const { startRecording, stopRecording, recordingBlob, isRecording } =
    useAudioRecorder(undefined, () => setHasError(true));

  useEffect(() => {
    if (!recordAudioWhenPlaying || isRecording) return;

    if (typeTwiceToStart) {
      isTwicePlaying && startRecording();
    } else {
      isPlaying && startRecording();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying, isTwicePlaying, typeTwiceToStart, recordAudioWhenPlaying]);

  useEffect(() => {
    (!isRecording || !isPlaying || isComplete) && stopRecording();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRecording, isPlaying, isComplete]);

  return {
    hasError,
    recordingBlob,
  };
}
