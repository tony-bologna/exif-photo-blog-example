import MoreComponents from '@/components/MoreComponents';
import PhotosLarge from './PhotosLarge';
import { getPhotosCached } from '@/photo/cache';
import { useCallback } from 'react';

export function MorePhotosRoot({
  initialOffset,
  itemsPerRequest,
  totalPhotosCount,
}: {
  initialOffset: number
  itemsPerRequest: number
  totalPhotosCount: number
}) {
  const getNextComponent = useCallback(async (
    offset: number,
    limit: number,
  ) => {
    'use server';
    if (
      process.env.NODE_ENV === 'development' &&
      Math.random() < 0.5
    ) {
      return { didFail: true };
    }
    const photos = await getPhotosCached({ limit: offset + limit })
      .catch(() => undefined);
    if (!photos) {
      return { didFail: true };
    } else {
      const nextPhotos = photos.slice(offset);
      return {
        nextComponent: <PhotosLarge photos={nextPhotos} />,
        isFinished: offset + limit >= totalPhotosCount,
      };
    }
  }, [totalPhotosCount]);
  return (
    <MoreComponents
      stateKey="PhotosRoot"
      label="More photos"
      initialOffset={initialOffset}
      itemsPerRequest={itemsPerRequest}
      getNextComponent={getNextComponent}
      wrapMoreButtonInSiteGrid
    />
  );
}
