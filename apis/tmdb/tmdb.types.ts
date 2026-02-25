export interface TmdbGenreRaw {
  id: number;
  name: string;
}

export interface TmdbMovieRaw {
  id: number;
  title: string;
  poster_path: string | null;
  overview?: string | null;
  release_date?: string | null;
  genre_ids?: number[];
  genres?: TmdbGenreRaw[];
  vote_average?: number;
  [key: string]: unknown;
}

export interface TmdbPaginatedResponseRaw {
  page: number;
  results: TmdbMovieRaw[];
  total_pages: number;
  total_results: number;
}

export type { Genre, MovieDetail, MovieSummary } from "@/types";
