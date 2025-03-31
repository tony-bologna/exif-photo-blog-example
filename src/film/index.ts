import {
  Photo,
  PhotoDateRange,
  descriptionForPhotoSet,
  photoQuantityText,
} from '@/photo';
import {
  absolutePathForFilm,
  absolutePathForFilmImage,
} from '@/app/paths';
import {
  FILM_SIMULATION_FORM_INPUT_OPTIONS,
  FujifilmSimulation,
  labelForFilm,
} from '@/platforms/fujifilm/simulation';
import { formatCount } from '@/utility/string';
import { formatCountDescriptive } from '@/utility/string';
import { AnnotatedTag } from '@/photo/form';

export type FilmSimulation = FujifilmSimulation;

export type FilmWithCount = {
  film: FilmSimulation
  count: number
}

export type Films = FilmWithCount[]

export const sortFilms = (
  films: Films,
) => films.sort(sortFilmsWithCount);

export const sortFilmsWithCount = (
  a: FilmWithCount,
  b: FilmWithCount,
) => {
  const aLabel = labelForFilm(a.film).large;
  const bLabel = labelForFilm(b.film).large;
  return aLabel.localeCompare(bLabel);
};

export const titleForFilm = (
  film: FilmSimulation,
  photos: Photo[],
  explicitCount?: number,
) => [
  labelForFilm(film).large,
  photoQuantityText(explicitCount ?? photos.length),
].join(' ');

export const shareTextForFilm = (
  film: FilmSimulation,
) =>
  `Photos shot on Fujifilm ${labelForFilm(film).large}`;

export const descriptionForFilmPhotos = (
  photos: Photo[],
  dateBased?: boolean,
  explicitCount?: number,
  explicitDateRange?: PhotoDateRange,
) =>
  descriptionForPhotoSet(
    photos,
    undefined,
    dateBased,
    explicitCount,
    explicitDateRange,
  );

export const generateMetaForFilm = (
  film: FilmSimulation,
  photos: Photo[],
  explicitCount?: number,
  explicitDateRange?: PhotoDateRange,
) => ({
  url: absolutePathForFilm(film),
  title: titleForFilm(film, photos, explicitCount),
  description: descriptionForFilmPhotos(
    photos,
    true,
    explicitCount,
    explicitDateRange,
  ),
  images: absolutePathForFilmImage(film),
});

export const photoHasFilmData = (photo: Photo) =>
  Boolean(photo.film);

export const convertFilmsForForm = (
  _films: Films = [],
  includeAllFujifilmSimulations?: boolean,
): AnnotatedTag[] => {
  const films = includeAllFujifilmSimulations
    ? FILM_SIMULATION_FORM_INPUT_OPTIONS.map(film => ({
      value: film.value,
    } as AnnotatedTag))
    : [];

  _films.forEach(({ film, count }) => {
    const index = films.findIndex(f => f.value === film);
    const annotation = formatCount(count);
    const annotationAria = formatCountDescriptive(count);
    if (index !== -1) {
      films[index] = {
        ...films[index],
        annotation,
        annotationAria,
      };
    } else {
      films.push({ value: film, annotation, annotationAria });
    }
  });

  return films.sort((a, b) => a.value.localeCompare(b.value));
};
