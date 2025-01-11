import { absolutePathForCamera, pathForCamera } from '@/site/paths';
import { PhotoSetAttributes } from '../photo';
import ShareModal from '@/components/ShareModal';
import CameraOGTile from './CameraOGTile';
import { Camera } from '.';
import { shareTextForCamera } from './meta';

export default function CameraShareModal({
  camera,
  photos,
  count,
  dateRange,
}: {
  camera: Camera
} & PhotoSetAttributes) {
  return (
    <ShareModal
      pathShare={absolutePathForCamera(camera)}
      pathClose={pathForCamera(camera)}
      socialText={shareTextForCamera(camera, photos)}
    >
      <CameraOGTile {...{ camera, photos, count, dateRange }} />
    </ShareModal>
  );
};
