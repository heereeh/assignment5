import { IListResult } from "../models/common";

const ACCESS_TOKEN = import.meta.env.VITE_ACCESS_TOKEN;
const BASE_URL = import.meta.env.VITE_MOVIE_URL;

export async function searchMovies(query: string): Promise<IListResult> {
  return (
    await fetch(`${BASE_URL}/search/movie?query=${query}}`, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    })
  ).json();
}

export async function searchTvs(query: string): Promise<IListResult> {
  return (
    await fetch(`${BASE_URL}/search/tv?query=${query}`, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    })
  ).json();
}
