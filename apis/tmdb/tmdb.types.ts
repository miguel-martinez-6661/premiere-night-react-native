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

export interface MovieSummary {
  id: number;
  title: string;
  posterPath: string | null;
  genreIds: number[];
  releaseDate: string | null;
  /** 0–10 scale from TMDb. */
  voteAverage: number | null;
}

export interface Genre {
  id: number;
  name: string;
}

export interface MovieDetail {
  id: number;
  title: string;
  overview: string;
  releaseDate: string | null;
  genres: Genre[];
  posterPath: string | null;
}
