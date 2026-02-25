import type { MovieSummary } from "@/types";
import { WATCHLIST_STORAGE_KEY } from "@/constants";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { createFileStorage } from "./fileStorage";

interface WatchlistState {
  items: MovieSummary[];
  add: (movie: MovieSummary) => void;
  remove: (id: number) => void;
  isInWatchlist: (id: number) => boolean;
  toggle: (movie: MovieSummary) => void;
}

export const useWatchlistStore = create<WatchlistState>()(
  persist(
    (set, get) => ({
      items: [],
      add: (movie) =>
        set((state) => {
          if (state.items.some((m) => m.id === movie.id)) return state;
          return { items: [...state.items, movie] };
        }),
      remove: (id) =>
        set((state) => ({
          items: state.items.filter((m) => m.id !== id),
        })),
      isInWatchlist: (id) => get().items.some((m) => m.id === id),
      toggle: (movie) => {
        const inList = get().items.some((m) => m.id === movie.id);
        if (inList) get().remove(movie.id);
        else get().add(movie);
      },
    }),
    {
      name: WATCHLIST_STORAGE_KEY,
      storage: createJSONStorage(() => createFileStorage()),
    }
  )
);
