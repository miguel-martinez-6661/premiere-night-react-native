import { mapRawToMovieDetail, mapRawToMovieSummary } from "./tmdb.mapper";
import type {
  MovieDetail,
  MovieSummary,
  TmdbMovieRaw,
  TmdbPaginatedResponseRaw,
} from "./tmdb.types";
import { tmdbRequest } from "./tmdbClient";

export async function getNowPlaying(page = 1): Promise<{
  results: MovieSummary[];
  page: number;
  totalPages: number;
  totalResults: number;
}> {
  const path = "/movie/now_playing";
  const raw = await tmdbRequest<TmdbPaginatedResponseRaw>(path, {
    page: String(page),
  });
  return {
    results: raw.results.map(mapRawToMovieSummary),
    page: raw.page,
    totalPages: raw.total_pages,
    totalResults: raw.total_results,
  };
}

export async function getPopular(page = 1): Promise<{
  results: MovieSummary[];
  page: number;
  totalPages: number;
  totalResults: number;
}> {
  const path = "/movie/popular";
  const raw = await tmdbRequest<TmdbPaginatedResponseRaw>(path, {
    page: String(page),
  });
  return {
    results: raw.results.map(mapRawToMovieSummary),
    page: raw.page,
    totalPages: raw.total_pages,
    totalResults: raw.total_results,
  };
}

export async function getMovieDetail(id: number): Promise<MovieDetail> {
  const path = `/movie/${id}`;
  const raw = await tmdbRequest<TmdbMovieRaw>(path);
  return mapRawToMovieDetail(raw);
}

export async function searchMovies(
  query: string,
  page = 1
): Promise<{
  results: MovieSummary[];
  page: number;
  totalPages: number;
  totalResults: number;
}> {
  const path = "/search/movie";
  const raw = await tmdbRequest<TmdbPaginatedResponseRaw>(path, {
    query: query.trim(),
    page: String(page),
  });
  return {
    results: raw.results.map(mapRawToMovieSummary),
    page: raw.page,
    totalPages: raw.total_pages,
    totalResults: raw.total_results,
  };
}
