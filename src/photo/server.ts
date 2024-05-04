import {
  getExtensionFromStorageUrl,
  getIdFromStorageUrl,
} from '@/services/storage';
import { convertExifToFormData } from '@/photo/form';
import {
  getFujifilmSimulationFromMakerNote,
  isExifForFujifilm,
} from '@/vendors/fujifilm';
import { ExifData, ExifParserFactory } from 'ts-exif-parser';
import { PhotoFormData } from './form';
import { FilmSimulation } from '@/simulation';
import sharp from 'sharp';

export const extractExifDataFromBlobPath = async (
  blobPath: string,
  includeInitialPhotoFields?: boolean,
): Promise<{
  blobId?: string
  photoFormExif?: Partial<PhotoFormData>
}> => {
  const url = decodeURIComponent(blobPath);

  const blobId = getIdFromStorageUrl(url);

  const extension = getExtensionFromStorageUrl(url);

  const fileBytes = blobPath
    ? await fetch(url)
      .then(res => res.arrayBuffer())
    : undefined;

  let exifData: ExifData | undefined;
  let filmSimulation: FilmSimulation | undefined;

  if (fileBytes) {
    const parser = ExifParserFactory.create(Buffer.from(fileBytes));

    // Data for form
    parser.enableBinaryFields(false);
    exifData = parser.parse();

    // Capture film simulation for Fujifilm cameras
    if (isExifForFujifilm(exifData)) {
      // Parse exif data again with binary fields
      // in order to access MakerNote tag
      parser.enableBinaryFields(true);
      const exifDataBinary = parser.parse();
      const makerNote = exifDataBinary.tags?.MakerNote;
      if (Buffer.isBuffer(makerNote)) {
        filmSimulation = getFujifilmSimulationFromMakerNote(makerNote);
      }
    }
  }

  return {
    blobId,
    ...exifData && {
      photoFormExif: {
        ...includeInitialPhotoFields && {
          hidden: 'false',
          favorite: 'false',
          extension,
          url,
        },
        ...convertExifToFormData(exifData, filmSimulation),
      },
    },
  };
};

export const blurImage = async (url: string) => {
  const image = await fetch(decodeURIComponent(url))
    .then(res => res.arrayBuffer());
  return sharp(image)
    .resize(200)
    .blur(20)
    .toBuffer()
    .then(data => `data:image/png;base64,${data.toString('base64')}`);
};
