import { TMDB_IMAGE_BASE, TMDB_POSTER_WIDTH } from "@/constants";

/** Returns full TMDB poster URL or null if path is missing. */
export function getTmdbPosterUrl(posterPath: string | null, width = TMDB_POSTER_WIDTH): string | null {
  if (!posterPath) return null;
  return `${TMDB_IMAGE_BASE}/w${width}${posterPath}`;
}
