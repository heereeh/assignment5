import { IListResult } from "../models/common";
import { ITvDetail } from "../models/tv";

const API_KEY = import.meta.env.VITE_MOVIE_API_KEY;
const BASE_URL = import.meta.env.VITE_MOVIE_URL;

export async function getLatest(): Promise<ITvDetail> {
  return (await fetch(`${BASE_URL}/tv/latest?api_key=${API_KEY}`)).json();
}

export async function getAiringToday(): Promise<IListResult> {
  return (await fetch(`${BASE_URL}/tv/airing_today?api_key=${API_KEY}`)).json();
}

export async function getOnTheAir(): Promise<IListResult> {
  return (await fetch(`${BASE_URL}/tv/on_the_air?api_key=${API_KEY}`)).json();
}

export async function getPopular(): Promise<IListResult> {
  return (await fetch(`${BASE_URL}/tv/popular?api_key=${API_KEY}`)).json();
}

export async function getTopRated(): Promise<IListResult> {
  return (await fetch(`${BASE_URL}/tv/top_rated?api_key=${API_KEY}`)).json();
}

export async function getTvById(id?: string): Promise<ITvDetail | null> {
  if (!id) return null;
  return (await fetch(`${BASE_URL}/tv/${id}?api_key=${API_KEY}`)).json();
}
