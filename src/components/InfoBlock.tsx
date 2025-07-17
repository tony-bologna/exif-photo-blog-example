import { clsx } from 'clsx/lite';
import { ReactNode } from 'react';
import AnimateItems from './AnimateItems';

export default function InfoBlock({
  children,
  className,
  padding = 'normal',
  centered = true,
  animate = true,
}: {
  children: ReactNode
  className?: string
  padding?: 'loose' | 'normal' | 'tight';
  centered?: boolean,
  animate?: boolean;
} ) {
  const getPaddingClasses = () => {
    switch (padding) {
    case 'loose': return 'p-4 md:p-24';
    case 'normal': return 'p-4 md:p-8';
    case 'tight': return 'py-2 px-3';
    }
  };

  return (
    <AnimateItems
      className="space-y-1"
      type={animate ? 'scale' : 'none'}
      duration={0.7}
      staggerDelay={0.15}
      distanceOffset={0}
      staggerOnFirstLoadOnly
      items={ [<div className={clsx(
      'flex flex-col items-center justify-center',
      'rounded-lg border',
      'bg-gray-50 border-gray-200',
      'dark:bg-gray-900/40 dark:border-gray-800',
      getPaddingClasses(),
      className,
      )}
      key="InfoBlock">
      <div className={clsx(
        'flex flex-col justify-center w-full',
        centered && 'items-center',
        'space-y-4',
        'text-medium',
      )}>
        {children},
      </div>
    </div>
      ]}
      />
  );
}
