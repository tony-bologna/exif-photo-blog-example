import { TEMPLATE_REPO_NAME, TEMPLATE_REPO_URL } from '@/app/config';
import { clsx } from 'clsx/lite';
import Link from 'next/link';
import { BiLogoGithub } from 'react-icons/bi';

export default function RepoLink() {
  return (
    <span className="flex items-center gap-2 whitespace-nowrap">
      <span className=''>
        Made with 🩷 <div className='hidden sm:inline-block'> & maintained</div> by 
      </span>

        <Link
        href="http://github.com/sambecker/exif-photo-blog"
        target="_blank"
        className={clsx(
          'gap-0.5 break-normal',
          'text-main hover:text-main',
          'hover:underline',
        )}>
        Antonio Ponce
        </Link>

      <span className="hidden sm:inline-block">
        using
      </span>
      <Link
        href={TEMPLATE_REPO_URL}
        target="_blank"
        className={clsx(
          'hidden',
          'sm:flex items-center gap-0.5',
          'text-main hover:text-main',
          'hover:underline',
        )}
      >
        <BiLogoGithub
          size={16}
          className="translate-y-[0.5px] hidden xs:inline-block"
        />
        {TEMPLATE_REPO_NAME}
      </Link>
    </span>
  );
}
