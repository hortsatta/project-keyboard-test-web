import levenshtein from 'damerau-levenshtein';
import type { Transcript } from '../models/wpm-test.model';

export function appendTranscripts(
  transcripts: Transcript[],
  targetText: string,
  inputValue?: string,
) {
  const tagetInputValue = inputValue || '';

  return [
    ...transcripts,
    {
      inputValue: tagetInputValue,
      totalInputValue: tagetInputValue,
      targetText,
      hasBackspace: false,
    },
  ];
}

export function updateTranscripts(
  transcripts: Transcript[],
  index: number,
  inputValue: string,
) {
  const target = transcripts[index];

  if (!target) {
    return null;
  }

  const clonedTranscripts = [...transcripts];

  if (!target.isDirty && inputValue.length) {
    clonedTranscripts[index].isDirty = true;
  }

  if (!target.hasBackspace && target.inputValue.length > inputValue.length) {
    clonedTranscripts[index].hasBackspace = true;
  }

  if (inputValue.length && target.inputValue.length < inputValue.length) {
    clonedTranscripts[index].totalInputValue +=
      inputValue[inputValue.length - 1];
  }

  clonedTranscripts[index].inputValue = inputValue;

  return clonedTranscripts;
}

export function checkMistake(
  inputText: string,
  targetText: string,
  hasBackspace: boolean,
  callback: () => void,
) {
  const hasMistake = inputText
    ?.split('')
    .some((char, index) => char !== targetText[index]);

  (hasMistake || hasBackspace) && callback();
}

export function checkSimilarity(
  inputText: string,
  targetText: string,
  hasBackspace: boolean,
  isSimilarCallback: () => void,
  notSimilarCallback: () => void,
) {
  const { similarity } = levenshtein(inputText, targetText);

  if (similarity === 1) {
    !hasBackspace && isSimilarCallback();
  } else {
    notSimilarCallback();
  }
}
