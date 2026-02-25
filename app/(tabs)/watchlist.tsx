import type { MovieSummary } from "@/types";
import { getTmdbPosterUrl } from "@/apis/tmdb/tmdb.utils";
import { formatReleaseDate } from "@/components/MovieCard/helpers";
import {
  LIST_PADDING_H,
  WATCHLIST_CARD_GAP,
  WATCHLIST_POSTER_HEIGHT,
  WATCHLIST_POSTER_WIDTH,
} from "@/constants";
import { useWatchlistStore } from "@/store/watchlistStore";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useCallback } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

function WatchlistRow({
  movie,
  onRemove,
}: {
  movie: MovieSummary;
  onRemove: () => void;
}) {
  const router = useRouter();
  const posterUri = getTmdbPosterUrl(movie.posterPath);
  const dateText = formatReleaseDate(movie.releaseDate);

  return (
    <Pressable
      style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}
      onPress={() => router.push(`/movie/${movie.id}`)}
    >
      <View style={styles.posterWrap}>
        {posterUri ? (
          <Image source={posterUri} style={styles.poster} contentFit="cover" />
        ) : (
          <View style={[styles.poster, styles.posterPlaceholder]} />
        )}
      </View>
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>
          {movie.title}
        </Text>
        {dateText ? (
          <Text style={styles.date} numberOfLines={1}>
            {dateText}
          </Text>
        ) : null}
      </View>
      <Pressable
        style={({ pressed }) => [styles.removeBtn, pressed && { opacity: 0.7 }]}
        onPress={(e) => {
          e.stopPropagation();
          onRemove();
        }}
        hitSlop={12}
      >
        <Text style={styles.removeBtnText}>Remove</Text>
      </Pressable>
    </Pressable>
  );
}

function EmptyWatchlist() {
  const router = useRouter();
  return (
    <View style={styles.empty}>
      <View style={styles.emptyIconWrap}>
        <Text style={styles.emptyIcon}>🎬</Text>
      </View>
      <Text style={styles.emptyTitle}>Your watchlist is empty</Text>
      <Text style={styles.emptySubtitle}>
        Add movies from the home screen or when viewing a movie to see them
        here.
      </Text>
      <Pressable
        style={({ pressed }) => [
          styles.emptyButton,
          pressed && { opacity: 0.85 },
        ]}
        onPress={() => router.push("/(tabs)")}
      >
        <Text style={styles.emptyButtonText}>Discover movies</Text>
      </Pressable>
    </View>
  );
}

export default function Watchlist() {
  const insets = useSafeAreaInsets();
  const items = useWatchlistStore((s) => s.items);
  const remove = useWatchlistStore((s) => s.remove);

  const renderItem = useCallback(
    ({ item }: { item: MovieSummary }) => (
      <WatchlistRow movie={item} onRemove={() => remove(item.id)} />
    ),
    [remove]
  );

  const keyExtractor = useCallback((item: MovieSummary) => String(item.id), []);

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
        <View style={styles.headerOverlay} />
        <Text style={styles.headerTitle}>Watchlist</Text>
        <Text style={styles.headerSubtitle}>
          {items.length === 0
            ? "Movies you want to watch"
            : `${items.length} movie${items.length === 1 ? "" : "s"} saved`}
        </Text>
      </View>
      {items.length === 0 ? (
        <EmptyWatchlist />
      ) : (
        <FlatList
          data={items}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          contentContainerStyle={[
            styles.listContent,
            { paddingBottom: insets.bottom + WATCHLIST_CARD_GAP },
          ]}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    backgroundColor: "#0b9edb",
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    overflow: "hidden",
    paddingHorizontal: LIST_PADDING_H,
    paddingBottom: 20,
  },
  headerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: "800",
    color: "#fff",
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 15,
    color: "rgba(255,255,255,0.9)",
    fontWeight: "500",
  },
  listContent: {
    paddingHorizontal: LIST_PADDING_H,
    paddingTop: WATCHLIST_CARD_GAP,
  },
  separator: {
    height: WATCHLIST_CARD_GAP,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 14,
    overflow: "hidden",
    paddingRight: 12,
    minHeight: WATCHLIST_POSTER_HEIGHT + 24,
  },
  rowPressed: {
    opacity: 0.96,
  },
  posterWrap: {
    width: WATCHLIST_POSTER_WIDTH,
    height: WATCHLIST_POSTER_HEIGHT,
    margin: 12,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#e5e5e5",
  },
  poster: {
    width: "100%",
    height: "100%",
  },
  posterPlaceholder: {
    backgroundColor: "#ccc",
  },
  info: {
    flex: 1,
    marginLeft: 8,
    justifyContent: "center",
    gap: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111",
  },
  date: {
    fontSize: 13,
    color: "#666",
  },
  removeBtn: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
    backgroundColor: "rgba(239, 68, 68, 0.12)",
  },
  removeBtnText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#dc2626",
  },
  empty: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
  },
  emptyIconWrap: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: "#e0e0e0",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  emptyIcon: {
    fontSize: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#333",
    marginBottom: 8,
    textAlign: "center",
  },
  emptySubtitle: {
    fontSize: 15,
    color: "#666",
    lineHeight: 22,
    textAlign: "center",
    marginBottom: 24,
  },
  emptyButton: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 14,
    backgroundColor: "#0b9edb",
  },
  emptyButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
  },
});
