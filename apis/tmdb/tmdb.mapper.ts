import type { Genre, MovieDetail, MovieSummary } from "@/types";
import type { TmdbMovieRaw } from "./tmdb.types";

export function mapRawToMovieSummary(raw: TmdbMovieRaw): MovieSummary {
  return {
    id: raw.id,
    title: raw.title,
    posterPath: raw.poster_path ?? null,
    genreIds: raw.genre_ids ?? [],
    releaseDate: raw.release_date ?? null,
    voteAverage: raw.vote_average ?? null,
  };
}

export function mapRawToMovieDetail(raw: TmdbMovieRaw): MovieDetail {
  const genres: Genre[] = (raw.genres ?? []).map((g) => ({
    id: g.id,
    name: g.name,
  }));
  return {
    id: raw.id,
    title: raw.title,
    overview: raw.overview ?? "",
    releaseDate: raw.release_date ?? null,
    genres,
    posterPath: raw.poster_path ?? null,
  };
}
