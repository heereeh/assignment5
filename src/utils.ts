const MOVIE_IMG_URL = import.meta.env.VITE_MOVIE_IMG_URL;
const ORIGINAL = "original";
const W500 = "w500";

export function make500ImagePath(id: string) {
  return `${MOVIE_IMG_URL}/${W500}/${id}`;
}

export function makeOriginalImagePath(id: string) {
  return `${MOVIE_IMG_URL}/${ORIGINAL}/${id}`;
}
