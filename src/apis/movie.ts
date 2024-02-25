import { IListResult } from "../models/common";
import { IMovieDetail } from "../models/movie";

const API_KEY = import.meta.env.VITE_MOVIE_API_KEY;
const BASE_URL = import.meta.env.VITE_MOVIE_URL;

export async function getLatest(): Promise<IMovieDetail> {
  return (await fetch(`${BASE_URL}/movie/latest?api_key=${API_KEY}`)).json();
}

export async function getNowPlayingMovies(): Promise<IListResult> {
  return (
    await fetch(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}`)
  ).json();
}

export async function getPopularMovies(): Promise<IListResult> {
  return (await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`)).json();
}

export async function getTopRatedMovies(): Promise<IListResult> {
  return (await fetch(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}`)).json();
}

export async function getUpcomingMovies(): Promise<IListResult> {
  return (await fetch(`${BASE_URL}/movie/upcoming?api_key=${API_KEY}`)).json();
}

export async function getMovieById(id?: string): Promise<IMovieDetail | null> {
  if (!id) return null;
  return (await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`)).json();
}
