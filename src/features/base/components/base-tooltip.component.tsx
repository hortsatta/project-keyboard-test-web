import {
  HTMLProps,
  cloneElement,
  forwardRef,
  isValidElement,
  memo,
} from 'react';
import { FloatingPortal, useMergeRefs } from '@floating-ui/react';

import {
  TooltipContext,
  useBaseTooltip,
  useBaseTooltipContext,
} from '../hooks/use-base-tooltip.hook';

import type { ReactNode } from 'react';
import type { TooltipOptions } from '../models/base.model';

type Props = TooltipOptions & {
  children: ReactNode;
};

export const BaseTooltip = memo(function ({ children, ...morProps }: Props) {
  // This can accept any props as options, e.g. `placement`,
  // or other positioning options.
  const tooltip = useBaseTooltip(morProps);

  return (
    <TooltipContext.Provider value={tooltip}>
      {children}
    </TooltipContext.Provider>
  );
});

export const BaseTooltipTrigger = memo(
  forwardRef<HTMLElement, HTMLProps<HTMLElement>>(function TooltipTrigger(
    { children, ...moreProps },
    propRef,
  ) {
    const context = useBaseTooltipContext();
    const childrenRef = (children as any).ref;
    const ref = useMergeRefs([context.refs.setReference, propRef, childrenRef]);

    if (!isValidElement(children)) return null;

    return cloneElement(
      children,
      context.getReferenceProps({
        ref,
        ...moreProps,
        ...children.props,
        'data-state': context.open ? 'open' : 'closed',
      }),
    );
  }),
);

export const BaseTooltipContent = memo(
  forwardRef<HTMLDivElement, HTMLProps<HTMLDivElement>>(function TooltipContent(
    { style, ...moreProps },
    propRef,
  ) {
    const context = useBaseTooltipContext();
    const ref = useMergeRefs([context.refs.setFloating, propRef]);

    if (!context.open) return null;

    return (
      <FloatingPortal>
        <div
          ref={ref}
          style={{
            ...context.floatingStyles,
            ...style,
          }}
          className='relative z-50 rounded-sm border border-border bg-surface px-2.5 py-1 text-xs text-text/50'
          {...context.getFloatingProps(moreProps)}
        />
      </FloatingPortal>
    );
  }),
);
