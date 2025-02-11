import Spinner from '@/components/Spinner';
import Tooltip from '@/components/Tooltip';
import clsx from 'clsx/lite';
import { ReactNode } from 'react';
import { BiLogoGithub } from 'react-icons/bi';

export default function GitHubForkStatusBadgeClient({
  label,
  style = 'mono',
  tooltip,
}: {
  label?: ReactNode
  style?: 'info' |'success' | 'warning' | 'error' | 'mono'
  tooltip?: ReactNode
}) {
  const classNameForStyle = () => {
    switch (style) {
    case 'info': return clsx(
      'text-blue-600 hover:text-blue-600',
      'dark:text-blue-400 dark:hover:text-blue-400',
      'bg-blue-100/40 dark:bg-blue-900/25',
      'border-blue-300/40 dark:border-blue-900/50',
    );
    case 'success': return clsx(
      'text-green-700 hover:text-green-700',
      'dark:text-green-400 dark:hover:text-green-400',
      'bg-green-100/40 dark:bg-green-900/25',
      'border-green-300/40 dark:border-green-900/50',
    );
    case 'warning': return clsx(
      'text-amber-800/90 hover:text-amber-800/90',
      'dark:text-amber-400 dark:hover:text-amber-400',
      'bg-amber-100/40 dark:bg-amber-900/25',
      'border-amber-300/40 dark:border-amber-900/50',
    );
    case 'error': return clsx(
      'text-red-700/90 hover:text-red-700/90',
      'dark:text-red-400 dark:hover:text-red-400',
      'bg-red-100/20 dark:bg-red-900/25',
      'border-red-300/40 dark:border-red-900/50',
    );
    default: return clsx(
      'text-main',
      'bg-white dark:bg-transparent',
      'border-main',
    );
    }
  };

  return (
    <Tooltip content={tooltip}>
      <div className={clsx(
        'opacity-0 transition-opacity animate-fade-in',
        'inline-flex items-center gap-2',
        'border transition-colors',
        'select-none',
        'pl-[4.5px] pr-2.5 py-[3px]',
        'rounded-full shadow-xs',
        classNameForStyle(),
      )}>
        {!label
          ? <Spinner
            color="text"
            className="translate-x-[3px]"
          />
          : <BiLogoGithub size={17} />}
        {label ?? 'Checking'}
      </div>
    </Tooltip>
  );
}
