import type { MovieDetail, MovieSummary } from "@/types";

/** Convert full movie detail to summary (e.g. for watchlist). */
export function movieDetailToSummary(movie: MovieDetail): MovieSummary {
  return {
    id: movie.id,
    title: movie.title,
    posterPath: movie.posterPath,
    genreIds: movie.genres.map((g) => g.id),
    releaseDate: movie.releaseDate,
    voteAverage: null,
  };
}
