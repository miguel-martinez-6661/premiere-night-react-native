/** Domain types used across the app (mapped from TMDb). */

export interface Genre {
  id: number;
  name: string;
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

export interface MovieDetail {
  id: number;
  title: string;
  overview: string;
  releaseDate: string | null;
  genres: Genre[];
  posterPath: string | null;
}
