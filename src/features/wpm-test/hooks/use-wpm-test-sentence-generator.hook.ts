import { useCallback, useEffect, useMemo } from 'react';

import { MIN_CHAR_COUNT } from '../config/wpm-test.config';
import { createSentence } from '../config/wpm-test-sentence.config';
import { useBoundStore } from '#/core/hooks/use-store.hook';

type Result = {
  passageList: string[];
  generatePassage: (prependSentence?: string) => void;
};

export function useWPMTestSentenceGenerator(): Result {
  const isPlaying = useBoundStore((state) => state.isPlaying);
  const isComplete = useBoundStore((state) => state.isComplete);
  const passage = useBoundStore((state) => state.passage);
  const setPassage = useBoundStore((state) => state.setPassage);
  const transcripts = useBoundStore((state) => state.transcripts);

  const passageList = useMemo(
    () => passage?.split(/(\s+)/).filter((str) => str.trim().length > 0) || [],
    [passage],
  );

  const generatePassage = useCallback((last?: string) => {
    const sentences = last ? `${last} ${createSentence()}` : createSentence();

    if (sentences.length < MIN_CHAR_COUNT) {
      return generatePassage(sentences);
    } else {
      setPassage(sentences);
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const appendPassage = useCallback(() => {
    const sentence = createSentence();
    setPassage(sentence, true);
  }, [setPassage]);

  useEffect(() => {
    !isPlaying && !isComplete && !passageList.length && generatePassage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying, isComplete, passageList]);

  useEffect(() => {
    const currentCount =
      (passage?.length || 0) -
      transcripts.reduce(
        (total, current) => total + current.targetText.length,
        0,
      );

    if (!isPlaying || isComplete || currentCount >= MIN_CHAR_COUNT) return;

    appendPassage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transcripts, passage, isPlaying, isComplete]);

  return {
    passageList,
    generatePassage,
  };
}
