import type { MovieDetail, PaginatedResults } from "@/types";
import { mapRawToMovieDetail, mapRawToMovieSummary } from "./tmdb.mapper";
import type { TmdbMovieRaw, TmdbPaginatedResponseRaw } from "./tmdb.types";
import { tmdbRequest } from "./tmdbClient";

async function fetchPaginated(
  path: string,
  params: Record<string, string> = {}
): Promise<PaginatedResults> {
  const raw = await tmdbRequest<TmdbPaginatedResponseRaw>(path, params);
  return {
    results: raw.results.map(mapRawToMovieSummary),
    page: raw.page,
    totalPages: raw.total_pages,
    totalResults: raw.total_results,
  };
}

export async function getNowPlaying(page = 1): Promise<PaginatedResults> {
  return fetchPaginated("/movie/now_playing", { page: String(page) });
}

export async function getPopular(page = 1): Promise<PaginatedResults> {
  return fetchPaginated("/movie/popular", { page: String(page) });
}

export async function getMovieDetail(id: number): Promise<MovieDetail> {
  const raw = await tmdbRequest<TmdbMovieRaw>(`/movie/${id}`);
  return mapRawToMovieDetail(raw);
}

export async function searchMovies(query: string, page = 1): Promise<PaginatedResults> {
  return fetchPaginated("/search/movie", {
    query: query.trim(),
    page: String(page),
  });
}
