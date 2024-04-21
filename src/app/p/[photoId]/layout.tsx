import {
  GENERATE_STATIC_PARAMS_LIMIT,
  GRID_THUMBNAILS_TO_SHOW_MAX,
  descriptionForPhoto,
  titleForPhoto,
} from '@/photo';
import { Metadata } from 'next/types';
import { redirect } from 'next/navigation';
import {
  PATH_ROOT,
  absolutePathForPhoto,
  absolutePathForPhotoImage,
} from '@/site/paths';
import PhotoDetailPage from '@/photo/PhotoDetailPage';
import { getPhotoIds, getPhotosNearId } from '@/services/vercel-postgres';
import { STATICALLY_OPTIMIZED } from '@/site/config';
import { cache } from 'react';

export const dynamic = 'auto';

const getPhotosNearIdCached = cache(getPhotosNearId);

export let generateStaticParams:
  (() => Promise<{ photoId: string }[]>) | undefined = undefined;

if (STATICALLY_OPTIMIZED) {
  generateStaticParams = async () => {
    const photos = await getPhotoIds({ limit: GENERATE_STATIC_PARAMS_LIMIT });
    return photos.map(photoId => ({ photoId }));
  };
}

interface PhotoProps {
  params: { photoId: string }
}

export async function generateMetadata({
  params: { photoId },
}:PhotoProps): Promise<Metadata> {
  const { photo } = await getPhotosNearIdCached(
    photoId,
    GRID_THUMBNAILS_TO_SHOW_MAX + 2,
  );

  if (!photo) { return {}; }

  const title = titleForPhoto(photo);
  const description = descriptionForPhoto(photo);
  const images = absolutePathForPhotoImage(photo);
  const url = absolutePathForPhoto(photo);

  return {
    title,
    description,
    openGraph: {
      title,
      images,
      description,
      url,
    },
    twitter: {
      title,
      description,
      images,
      card: 'summary_large_image',
    },
  };
}

export default async function PhotoPage({
  params: { photoId },
  children,
}: PhotoProps & { children: React.ReactNode }) {
  const { photos, photo } = await getPhotosNearIdCached(
    photoId,
    GRID_THUMBNAILS_TO_SHOW_MAX + 2,
  );

  if (!photo) { redirect(PATH_ROOT); }
  
  const isPhotoFirst = photos.findIndex(p => p.id === photoId) === 0;

  return <>
    {children}
    <PhotoDetailPage
      photo={photo}
      photos={photos}
      photosGrid={photos.slice(
        isPhotoFirst ? 1 : 2,
        isPhotoFirst
          ? GRID_THUMBNAILS_TO_SHOW_MAX + 1
          : GRID_THUMBNAILS_TO_SHOW_MAX + 2,
      )}
    />
  </>;
}
