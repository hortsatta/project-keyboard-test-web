import { memo, useMemo } from 'react';
import cx from 'classix';

import type { ComponentProps } from 'react';

type Props = ComponentProps<'div'> & {
  value: string;
  inputValue?: string;
  active?: boolean;
  charSize?: { width: number; height: number };
};

export const KeyboardTypingWord = memo(function ({
  className,
  value,
  inputValue,
  active,
  charSize = { width: 0, height: 0 },
  ...moreProps
}: Props) {
  const inputValueList = useMemo(
    () => inputValue?.split('') || [],
    [inputValue],
  );

  const textCursorStyle = useMemo(
    () => ({
      width: charSize.width,
      height: `calc(${charSize.height}px - 2px)`,
      transform: `translateX(${inputValueList.length * charSize.width}px)`,
    }),
    [charSize, inputValueList],
  );

  const wasteInputValue = useMemo(
    () => inputValue?.slice(value.length),
    [value, inputValue],
  );

  return (
    <span className={cx('relative my-0.5', className)} {...moreProps}>
      {/* Create cursor if word is active */}
      {active && (
        <div
          style={textCursorStyle}
          className='border-primary from-primary/30 animate-blink absolute -ml-px mt-px border-l-2 bg-gradient-to-r transition-transform duration-75'
        />
      )}
      {value.split('').map((char, index) => (
        <i
          key={`char-${index}`}
          className={cx(
            'relative z-10 not-italic',
            inputValueList[index] == null ? 'opacity-30' : 'opacity-80',
            inputValueList[index] != null &&
              inputValueList[index] !== char &&
              'text-red-400',
          )}
        >
          {char}
        </i>
      ))}
      {wasteInputValue?.trim() &&
        wasteInputValue
          .split('')
          .map((char) => (
            <i className='not-italic text-red-400/60 opacity-80'>{char}</i>
          ))}
    </span>
  );
});
