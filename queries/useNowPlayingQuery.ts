import { getNowPlaying } from "@/apis/tmdb/tmdb.api";
import { useQuery } from "@tanstack/react-query";

export const useNowPlayingQuery = (page: number) => {
  return useQuery({
    queryKey: ["nowPlaying", page],
    queryFn: () => getNowPlaying(page),
  });
};
