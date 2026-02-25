import { searchMovies } from "@/apis/tmdb/tmdb.api";
import { useQuery } from "@tanstack/react-query";

export const useMovieSearchQuery = (query: string, page: number) => {
  return useQuery({
    queryKey: ["movie", query, page],
    queryFn: () => searchMovies(query, page),
  });
};

export const useDebouncedMovieSearchQuery = (
  debouncedQuery: string,
  page: number
) => {
  return useQuery({
    queryKey: ["movie", debouncedQuery, page],
    queryFn: () => searchMovies(debouncedQuery, page),
    enabled: !!debouncedQuery,
  });
};
