import SiteGrid from '@/components/SiteGrid';
import { getPhoto, getPhotos } from '@/photo/db/query';
import PhotoRecipeOverlay from '@/photo/PhotoRecipeOverlay';

export default async function AdminRecipePage({
  params,
}: {
  params: Promise<{ photoId: string }>
}) {
  const { photoId } = await params;
  const photo = await getPhoto(photoId);
  const photosHidden = await getPhotos({ hidden: 'only' });
  const { filmSimulation } = photo!;
  const { fujifilmRecipe } = photosHidden[0];
  
  return (
    <SiteGrid
      contentMain={photo && fujifilmRecipe && filmSimulation
        ? <PhotoRecipeOverlay
          backgroundImageUrl={photo.url}
          recipe={fujifilmRecipe}
          simulation={filmSimulation}
          exposure={photo.exposureCompensationFormatted ?? '+0ev'}
          iso={photo.isoFormatted ?? 'ISO 0'}
        />
        : <div>
          Can&apos;t find photo/recipe
        </div>}
    />
  );
}
