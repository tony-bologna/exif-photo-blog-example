import { getPhotosCached } from '@/photo/cache';
import SiteGrid from '@/components/SiteGrid';
import {
  INFINITE_SCROLL_MULTIPLE_GRID,
  generateOgImageMetaForPhotos,
} from '@/photo';
import PhotoGrid from '@/photo/PhotoGrid';
import PhotosEmptyState from '@/photo/PhotosEmptyState';
import { MAX_PHOTOS_TO_SHOW_OG } from '@/image-response';
import { Metadata } from 'next/types';
import PhotoGridSidebar from '@/photo/PhotoGridSidebar';
import { getPhotoSidebarDataCached } from '@/photo/data';
import { MorePhotosGrid } from '@/photo/MorePhotosGrid';
import { Suspense } from 'react';

export async function generateMetadata(): Promise<Metadata> {
  const photos = await getPhotosCached({ limit: MAX_PHOTOS_TO_SHOW_OG });
  return generateOgImageMetaForPhotos(photos);
}

export default async function GridPage() {
  const [
    photos,
    photosCount,
    tags,
    cameras,
    simulations,
  ] = await Promise.all([
    getPhotosCached({ limit: INFINITE_SCROLL_MULTIPLE_GRID }),
    ...getPhotoSidebarDataCached(),
  ]);

  return (
    photos.length > 0
      ? <SiteGrid
        contentMain={<div className="space-y-0.5 sm:space-y-1">
          <PhotoGrid {...{ photos, photoPriority: true }} />
          <Suspense>
            <MorePhotosGrid
              initialOffset={INFINITE_SCROLL_MULTIPLE_GRID}
              itemsPerRequest={INFINITE_SCROLL_MULTIPLE_GRID}
              totalPhotosCount={photosCount}
            />
          </Suspense>
        </div>}
        contentSide={<div className="sticky top-4 space-y-4 mt-[-4px]">
          <PhotoGridSidebar {...{
            tags,
            cameras,
            simulations,
            photosCount,
          }} />
        </div>}
        sideHiddenOnMobile
      />
      : <PhotosEmptyState />
  );
}
