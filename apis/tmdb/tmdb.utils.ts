const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p";

export const POSTER_WIDTH = 500;

/** Returns full TMDB poster URL or null if path is missing. */
export function getTmdbPosterUrl(posterPath: string | null, width = POSTER_WIDTH): string | null {
  if (!posterPath) return null;
  return `${TMDB_IMAGE_BASE}/w${width}${posterPath}`;
}
