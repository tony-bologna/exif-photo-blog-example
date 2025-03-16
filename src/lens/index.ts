import { Photo } from '@/photo';
import { parameterize } from '@/utility/string';

const LENS_PLACEHOLDER: Lens = { make: 'Lens', model: 'Model' };

const LENS_MAKE_APPLE = 'apple';

export type Lens = {
  make: string
  model: string
};

export interface LensProps {
  params: Promise<Lens>
}

export interface PhotoLensProps {
  params: Promise<Lens & { photoId: string }>
}

export type LensWithCount = {
  lensKey: string
  lens: Lens
  count: number
}

export type Lenses = LensWithCount[];

// Support keys for make-only and model-only lens queries
export const createLensKey = ({ make, model }: Partial<Lens>) =>
  parameterize(`${make ?? 'ANY'}-${model ?? 'ANY'}`, true);

export const getLensFromParams = ({
  make,
  model,
}: {
  make: string,
  model: string,
}): Lens => ({
  make: parameterize(make, true),
  model: parameterize(model, true),
});

export const lensFromPhoto = (
  photo: Photo | undefined,
  fallback?: Lens,
): Lens =>
  photo?.lensMake && photo?.lensModel
    ? { make: photo.lensMake, model: photo.lensModel }
    : fallback ?? LENS_PLACEHOLDER;

const isLensMakeApple = (make?: string) =>
  make?.toLocaleLowerCase() === LENS_MAKE_APPLE;

export const isLensApple = ({ make }: Lens) =>
  isLensMakeApple(make);

export const formatLensText = (
  { make, model: modelRaw }: Lens,
  length:
    'long' |    // Unmodified make and model
    'medium' |  // Make and model, with modifiers removed
    'short'     // Model only
  = 'medium',
) => {
  // Capture simple make without modifiers like 'Corporation' or 'Company'
  const makeSimple = make.match(/^(\S+)/)?.[1];
  const doesModelStartWithMake = (
    makeSimple &&
    modelRaw.toLocaleLowerCase().startsWith(makeSimple.toLocaleLowerCase())
  );
  const model = modelRaw;
  switch (length) {
  case 'long':
  case 'medium':
    return `${make} ${model}`;
  case 'short':
    return doesModelStartWithMake
      ? model.replace(makeSimple, '').trim()
      : model;
  }
};
