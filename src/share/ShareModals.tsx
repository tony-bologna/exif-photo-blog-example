'use client';

import PhotoShareModal from '@/photo/PhotoShareModal';
import TagShareModal from '@/tag/TagShareModal';
import CameraShareModal from '@/camera/CameraShareModal';
import FilmShareModal from '@/film/FilmShareModal';
import FocalLengthShareModal from '@/focal/FocalLengthShareModal';
import { useAppState } from '@/state/AppState';
import RecipeShareModal from '@/recipe/RecipeShareModal';
import LensShareModal from '@/lens/LensShareModal';

export default function ShareModals() {
  const { shareModalProps = {} } = useAppState();
  
  const {
    photo,
    photos,
    count,
    dateRange,
    camera,
    lens,
    tag,
    film: simulation,
    recipe,
    focal,
  } = shareModalProps;

  if (photo) {
    return <PhotoShareModal {...{
      photo,
      tag,
      camera,
      film: simulation,
      recipe,
      focal,
    }} />;
  } else if (photos) {
    const attributes = {photos, count, dateRange};
    if (tag) {
      return <TagShareModal {...{ tag, ...attributes }} />;
    } else if (camera) {
      return <CameraShareModal {...{ camera, ...attributes }} />;
    } else if (lens) {
      return <LensShareModal {...{ lens, ...attributes }} />;
    } else if (simulation) {
      return <FilmShareModal {...{ simulation, ...attributes }} />;
    } else if (recipe) {
      return <RecipeShareModal {...{ recipe, ...attributes }} />;
    } else if (focal !== undefined) {
      return <FocalLengthShareModal {...{ focal, ...attributes }} />;
    } 
  }
}
