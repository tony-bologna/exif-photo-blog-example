import { ComponentProps, ReactNode, useCallback, useState } from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { clsx } from 'clsx/lite';
import { FiMoreHorizontal } from 'react-icons/fi';
import MoreMenuItem from './MoreMenuItem';

export default function MoreMenu({
  items,
  icon,
  header,
  className,
  buttonClassName,
  ariaLabel,
  align = 'end',
  ...props
}: {
  items: ComponentProps<typeof MoreMenuItem> []
  icon?: ReactNode
  header?: ReactNode
  className?: string
  buttonClassName?: string
  ariaLabel: string
} & ComponentProps<typeof DropdownMenu.Content>){
  const [isOpen, setIsOpen] = useState(false);

  const dismissMenu = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  return (
    <DropdownMenu.Root open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenu.Trigger asChild>
        <button
          className={clsx(
            'p-1 min-h-0 border-none shadow-none hover:outline-hidden',
            'hover:bg-gray-100 active:bg-gray-100',
            'dark:hover:bg-gray-800/75 dark:active:bg-gray-900',
            'text-dim',
            buttonClassName,
          )}
          aria-label={ariaLabel}
        >
          {icon ?? <FiMoreHorizontal size={18} />}
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          {...props}
          align={align}
          className={clsx(
            'z-10',
            'min-w-[8rem]',
            'component-surface',
            'p-1',
            'shadow-lg dark:shadow-xl',
            'data-[side=top]:animate-fade-in-from-bottom',
            'data-[side=bottom]:animate-fade-in-from-top',
            className,
          )}
        >
          {header && <div className={clsx(
            'px-2 py-1.5 text-medium uppercase',
            'text-sm',
          )}>
            {header}
          </div>}
          {items.map(props =>
            <MoreMenuItem
              key={`${props.label}`}
              {...props}
              dismissMenu={dismissMenu}
            />,
          )}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};
