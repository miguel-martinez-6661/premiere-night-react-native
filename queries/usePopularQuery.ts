import { getPopular } from "@/apis/tmdb/tmdb.api";
import { useQuery } from "@tanstack/react-query";

export const usePopularQuery = (page: number) => {
  return useQuery({
    queryKey: ["popular", page],
    queryFn: () => getPopular(page),
  });
};
