import { useState, useMemo, useEffect } from 'react';
import levenshtein from 'damerau-levenshtein';

type Result = {
  inputValueList: string[];
  wasteInputValue: string | undefined;
  isDirty: boolean;
  isExact: boolean;
  isPerfect: boolean;
};

export function useWPMTestWordSingle(
  value: string,
  inputValue?: string,
  active?: boolean,
): Result {
  const [isDirty, setIsDirty] = useState(false);
  const [isPerfect, setIsPerfect] = useState(true);

  const inputValueList = useMemo(
    () => inputValue?.split('') || [],
    [inputValue],
  );

  const wasteInputValue = useMemo(
    () => inputValue?.slice(value.length),
    [value, inputValue],
  );

  const isExact = useMemo(() => {
    const { similarity } = levenshtein(value, inputValue || '');

    return similarity === 1;
  }, [value, inputValue]);

  // Set dirty status
  useEffect(() => {
    if (!active) {
      return;
    }

    setIsDirty((prev) => {
      if (prev) {
        return true;
      }

      return inputValue?.trim().length ? true : false;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue]);

  // Check if input has mistake, set as perfect if none
  useEffect(() => {
    if (!isDirty) {
      return;
    }

    const hasMistake = inputValue
      ?.split('')
      .some((char, index) => char !== value[index]);

    if (!hasMistake) {
      return;
    }

    setIsPerfect(false);
  }, [isDirty, value, inputValue]);

  return {
    inputValueList,
    wasteInputValue,
    isDirty,
    isExact,
    isPerfect,
  };
}
