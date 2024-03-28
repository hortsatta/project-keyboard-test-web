import { useRef, useState, useCallback, ChangeEvent } from 'react';

import type { RefObject } from 'react';

type Result = {
  inputRef: RefObject<HTMLInputElement>;
  inputValue: string;
  fullInputValue: string | undefined;
  activeIndex: number;
  handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleInputNext: () => void;
  handleInputBack: () => void;
  handleWrapperClick: () => void;
};

export function useKeyboardTypeingStage(): Result {
  const inputRef = useRef<HTMLInputElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [inputValue, setInputValue] = useState<string>('');
  const [fullInputValue, setFullInputValue] = useState<string | undefined>('');

  const handleWrapperClick = useCallback(() => {
    inputRef.current?.focus();
  }, []);

  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setInputValue(value);
    },
    [],
  );

  const handleInputNext = useCallback(() => {
    setActiveIndex((prev) => prev + 1);
    setFullInputValue((prev) => prev + ' ' + inputValue);
  }, [inputValue]);

  const handleInputBack = useCallback(() => {
    const targetIndex = activeIndex > 0 ? activeIndex - 1 : 0;
    const fullInputValueList =
      fullInputValue?.split(/(\s+)/).filter((str) => str.trim().length > 0) ||
      [];

    setActiveIndex(targetIndex);
    setInputValue(fullInputValueList[targetIndex] || '');
    setFullInputValue(fullInputValueList.slice(0, -1).join(' '));
  }, [activeIndex, fullInputValue]);

  return {
    inputRef,
    inputValue,
    fullInputValue,
    activeIndex,
    handleInputChange,
    handleInputNext,
    handleInputBack,
    handleWrapperClick,
  };
}
