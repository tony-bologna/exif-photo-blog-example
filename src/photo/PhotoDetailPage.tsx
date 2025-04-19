import AnimateItems from '@/components/AnimateItems';
import { Photo, PhotoDateRange } from '.';
import PhotoLarge from './PhotoLarge';
import SiteGrid from '@/components/SiteGrid';
import PhotoGrid from './PhotoGrid';
import PhotoNav from './PhotoNav';
import TagHeader from '@/tag/TagHeader';
import { Camera } from '@/camera';
import CameraHeader from '@/camera/CameraHeader';
import { FilmSimulation } from '@/simulation';
import FilmSimulationHeader from '@/simulation/FilmSimulationHeader';
import { TAG_HIDDEN } from '@/tag';
import HiddenHeader from '@/tag/HiddenHeader';
import FocalLengthHeader from '@/focal/FocalLengthHeader';

export default function PhotoDetailPage({
  photo,
  photos,
  photosGrid,
  tag,
  camera,
  simulation,
  focal,
  indexNumber,
  count,
  dateRange,
  shouldShare,
  includeFavoriteInAdminMenu,
}: {
  photo: Photo
  photos: Photo[]
  photosGrid?: Photo[]
  tag?: string
  camera?: Camera
  simulation?: FilmSimulation
  focal?: number
  indexNumber?: number
  count?: number
  dateRange?: PhotoDateRange
  shouldShare?: boolean
  includeFavoriteInAdminMenu?: boolean
}) {
  return (
    <div>
      {tag &&
        <SiteGrid
          className="mt-4 mb-8"
          contentMain={tag === TAG_HIDDEN
            ? <HiddenHeader
              photos={photos}
              selectedPhoto={photo}
              indexNumber={indexNumber}
              count={count ?? 0}
            />
            : <TagHeader
              key={tag}
              tag={tag}
              photos={photos}
              selectedPhoto={photo}
              indexNumber={indexNumber}
              count={count}
              dateRange={dateRange}
            />}
        />}
      {camera &&
        <SiteGrid
          className="mt-4 mb-8"
          contentMain={
            <CameraHeader
              camera={camera}
              photos={photos}
              selectedPhoto={photo}
              indexNumber={indexNumber}
              count={count}
              dateRange={dateRange}
            />}
        />}
      {simulation &&
        <SiteGrid
          className="mt-4 mb-8"
          contentMain={
            <FilmSimulationHeader
              simulation={simulation}
              photos={photos}
              selectedPhoto={photo}
              indexNumber={indexNumber}
              count={count}
              dateRange={dateRange}
            />}
        />}
      {focal &&
        <SiteGrid
          className="mt-4 mb-8"
          contentMain={
            <FocalLengthHeader
              focal={focal}
              photos={photos}
              selectedPhoto={photo}
              indexNumber={indexNumber}
              count={count}
              dateRange={dateRange}
            />}
        />}
      <AnimateItems
        animateOnFirstLoadOnly
        items={[
          <SiteGrid
            key="photo-nav"
            className="mb-4"
            contentMain={<PhotoNav {...{
              photo,
              photos,
              className: 'border-t border-gray-100 pt-4',
              tag,
              camera,
              simulation,
              focal,
            }} />}
          />,
        ]}
      />
      <AnimateItems
        className="md:mb-8"
        animateFromAppState
        items={[
          <PhotoLarge
            key={photo.id}
            photo={photo}
            primaryTag={tag}
            priority
            prefetchRelatedLinks
            showTitle={false}
            showCamera={!camera}
            showSimulation={!simulation}
            shouldShare={shouldShare}
            shouldShareTag={tag !== undefined}
            shouldShareCamera={camera !== undefined}
            shouldShareSimulation={simulation !== undefined}
            shouldScrollOnShare={false}
            includeFavoriteInAdminMenu={includeFavoriteInAdminMenu}
          />,
        ]}
      />
      <SiteGrid
        sideFirstOnMobile
        contentMain={<PhotoGrid
          photos={photosGrid ?? photos}
          selectedPhoto={photo}
          tag={tag}
          camera={camera}
          simulation={simulation}
          focal={focal}
          animateOnFirstLoadOnly
        />}
      />
    </div>
  );
}
