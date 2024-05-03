import { PATH_ADMIN } from '@/site/paths';
import { blurImage, extractExifDataFromBlobPath } from '@/photo/server';
import { redirect } from 'next/navigation';
import { getUniqueTagsCached } from '@/photo/cache';
import UploadPageClient from '@/photo/UploadPageClient';
import {
  AI_TEXT_AUTO_GENERATED_FIELDS,
  AI_TEXT_GENERATION_ENABLED,
} from '@/site/config';

interface Params {
  params: { uploadPath: string }
}

export default async function UploadPage({ params: { uploadPath } }: Params) {
  const {
    blobId,
    photoFormExif,
  } = await extractExifDataFromBlobPath(uploadPath, true);

  const blurBase64 = await blurImage(uploadPath);

  if (!photoFormExif) { redirect(PATH_ADMIN); }

  const uniqueTags = await getUniqueTagsCached();

  const hasAiTextGeneration = AI_TEXT_GENERATION_ENABLED;

  const textFieldsToAutoGenerate = AI_TEXT_AUTO_GENERATED_FIELDS;

  return (
    <>
      <img
        alt="Blur Debug"
        src={blurBase64}
      />
      <UploadPageClient {...{
        blobId,
        photoFormExif,
        uniqueTags,
        hasAiTextGeneration,
        textFieldsToAutoGenerate,
      }} />
    </>
  );
};
