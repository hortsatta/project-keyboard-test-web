import { Fragment, memo, useEffect, useMemo, useRef, useState } from 'react';
import cx from 'classix';

import { KeyboardTypingWord } from './keyboard-typing-word.component';

import type { ComponentProps } from 'react';

type Props = ComponentProps<'div'> & {
  activeIndex: number;
  value?: string;
  inputValue?: string;
  fullInputValue?: string;
};

export const KeyboardTypingWordPassage = memo(function ({
  className,
  value,
  inputValue,
  fullInputValue,
  activeIndex,
  ...moreProps
}: Props) {
  const charSampleRef = useRef<HTMLElement>(null);
  const [charSize, setCharSize] = useState({ width: 0, height: 0 });

  const valueList = useMemo(
    () => value?.split(/(\s+)/).filter((str) => str.trim().length > 0),
    [value],
  );

  const fullInputValueList = useMemo(
    () =>
      fullInputValue?.split(/(\s+)/).filter((str) => str.trim().length > 0) ||
      [],
    [fullInputValue],
  );

  useEffect(() => {
    const size = {
      width: charSampleRef.current?.clientWidth || 0,
      height: charSampleRef.current?.clientHeight || 0,
    };

    setCharSize(size);
  }, [charSampleRef.current?.clientWidth]);

  return (
    <div
      className={cx('flex items-baseline font-light', className)}
      {...moreProps}
    >
      {/* Create sample tag for char width */}
      <i ref={charSampleRef} className='absolute left-0 top-0 opacity-0'>
        q
      </i>
      {valueList?.map((str, index) => (
        <Fragment key={`word-${index}`}>
          {activeIndex === index ? (
            <KeyboardTypingWord
              value={str}
              inputValue={inputValue}
              charSize={charSize}
              active
            />
          ) : (
            <KeyboardTypingWord
              value={str}
              inputValue={fullInputValueList[index]}
            />
          )}
          {index < valueList.length - 1 && <span>&nbsp;</span>}
        </Fragment>
      ))}
    </div>
  );
});
