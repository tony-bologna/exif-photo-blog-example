'use client'
import { useRouter } from 'next/navigation';
import { clsx } from 'clsx/lite';

interface ButtonLinkProps {
  label: string; // The text displayed on the button
  href: string;  // The path to navigate to when the button is clicked
  className?: string; // Optional additional classes for styling
}

export default function ButtonLink({ label, href }: ButtonLinkProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(href); // Navigate to the provided path
  };

  return (
    <button
      onClick={handleClick}
      className={clsx(
        'px-4 py-2 rounded-lg', // Base styles
        'bg-blue-500 hover:bg-blue-600 active:bg-blue-700', // Hover and active states
        'transition-colors duration-200 ease-in-out', // Smooth color transitions
      )}
    >
      {label}
    </button>
  );
}