import { Photo, altTextForPhoto } from '.';
import ImageSmall from '@/components/ImageSmall';
import Link from 'next/link';
import { clsx } from 'clsx/lite';
import { pathForPhoto } from '@/site/paths';
import { Camera } from '@/camera';
import { FilmSimulation } from '@/simulation';
import { SHOULD_PREFETCH_GLOBAL } from '@/site/config';

export default function PhotoSmall({
  photo,
  tag,
  camera,
  simulation,
  selected,
  priority,
  prefetch = SHOULD_PREFETCH_GLOBAL,
}: {
  photo: Photo
  tag?: string
  camera?: Camera
  simulation?: FilmSimulation
  selected?: boolean
  priority?: boolean
  prefetch?: boolean
}) {
  return (
    <Link
      href={pathForPhoto(photo, tag, camera, simulation)}
      className={clsx(
        'flex w-full h-full',
        'active:brightness-75',
        selected && 'brightness-50',
      )}
      prefetch={prefetch}
    >
      <ImageSmall
        src={photo.url}
        aspectRatio={photo.aspectRatio}
        blurData={photo.blurData}
        className="w-full"
        alt={altTextForPhoto(photo)}
        priority={priority}
      />
    </Link>
  );
};
