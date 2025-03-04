'use client';

import { clsx } from 'clsx/lite';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import SiteGrid from '../components/SiteGrid';
import { SITE_DOMAIN_OR_TITLE } from '@/site/config';
import ViewSwitcher, { SwitcherSelection } from '@/site/ViewSwitcher';
import { PATH_ROOT,
  isPathAdmin,
  isPathGrid,
  isPathProtected,
  isPathSets,
  isPathSignIn,
  PATH_ABOUT,
} from '@/site/paths';
import AnimateItems from '../components/AnimateItems';
import Image from 'next/image';

export default function NavClient({
  showAdmin,
}: {
  showAdmin?: boolean,
}) {
  const pathname = usePathname();

  const showNav = !isPathSignIn(pathname);

  const shouldAnimate = !isPathAdmin(pathname);

  const renderLink = (
    text: string,
    linkOrAction: string | (() => void),
  ) =>
    typeof linkOrAction === 'string'
      ? <Link href={linkOrAction}>{text}</Link>
      : <button onClick={linkOrAction}>{text}</button>;


  const switcherSelectionForPath = (): SwitcherSelection | undefined => {
    if (pathname === PATH_ROOT) {
      return 'full-frame';
    } else if (isPathGrid(pathname)) {
      return 'grid';
    } else if (isPathSets(pathname)) {
      return 'sets';
    } else if (isPathProtected(pathname)) {
      return 'admin';
    }
  };

  return (
    <SiteGrid
      contentMain={
        <AnimateItems
          animateOnFirstLoadOnly
          type={!shouldAnimate ? 'none' : 'bottom'}
          distanceOffset={10}
          items={showNav
            ? [<div
              key="nav"
              className={clsx(
                'flex items-center',
                'w-full min-h-[4rem]',
                'leading-none',
              )}>
              <div className="hidden xs:block mr-4">
                {renderLink(SITE_DOMAIN_OR_TITLE, PATH_ROOT)}
              </div>

              <div className="flex flex-grow items-center gap-4">
                <ViewSwitcher
                  currentSelection={switcherSelectionForPath()}
                  showAdmin={showAdmin}
                />
              </div>

              <div className='mr-2'>
              <Link href={PATH_ABOUT}>
                About
              {/* <Image className='hover:bg-black transition-all duration-500' src={'/staticPics/milli_aboout2.png'} width={100} height={50} alt="about section link"/> */}
              </Link>
              </div>

            </div>]
            : []}
        />
      }
    />
  );
};
