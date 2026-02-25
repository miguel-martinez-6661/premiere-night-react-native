import { getMovieDetail } from "@/apis/tmdb/tmdb.api";
import { useQuery } from "@tanstack/react-query";

export const useMovieDetailQuery = (id: number) => {
  return useQuery({
    queryKey: ["movie", id],
    queryFn: () => getMovieDetail(id),
    enabled: !!id,
  });
};
