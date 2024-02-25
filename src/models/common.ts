export interface IListResult {
  dates?: IDates;
  page: number;
  results: IListItem[];
  total_pages: number;
  total_results: number;
}

export interface IDates {
  maximum: string;
  minimum: string;
}

export interface IListItem {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title?: string;
  original_name?: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title?: string;
  name?: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface IGenre {
  id: number;
  name: string;
}

export interface ICommon extends IListItem {
  tagline: string;
  genres: IGenre[];
}
