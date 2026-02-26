import { getTmdbPosterUrl } from "@/apis/tmdb/tmdb.utils";
import { BORDER_RADIUS, CARD_WIDTH, POSTER_HEIGHT } from "@/constants";
import type { MovieSummary } from "@/types";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { formatReleaseDate, voteToPercent } from "./helpers";

export interface MovieCardProps {
  movie: MovieSummary;
}

export function MovieCard({ movie }: MovieCardProps) {
  const router = useRouter();
  const posterUri = getTmdbPosterUrl(movie.posterPath);
  const percent = voteToPercent(movie.voteAverage);
  const dateText = formatReleaseDate(movie.releaseDate);

  return (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
      onPress={() => router.push(`/movie/${movie.id}`)}
    >
      <View style={styles.posterContainer}>
        {posterUri ? (
          <Image source={posterUri} style={styles.poster} contentFit="cover" />
        ) : (
          <View style={styles.posterPlaceholder}>
            <MaterialIcons name="movie" size={32} color="#666" />
            <Text style={styles.posterPlaceholderText}>
              No poster available
            </Text>
          </View>
        )}
        {percent != null ? (
          <View style={styles.ratingBadge}>
            <Text style={styles.ratingText}>{percent}%</Text>
          </View>
        ) : null}
        <View style={styles.iconBadge}>
          <Text style={styles.iconSymbol}>▶</Text>
        </View>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title} numberOfLines={2}>
          {movie.title}
        </Text>
        {dateText ? (
          <Text style={styles.date} numberOfLines={1}>
            {dateText}
          </Text>
        ) : null}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    borderRadius: BORDER_RADIUS,
    overflow: "hidden",
    backgroundColor: "#fff",
  },
  cardPressed: {
    opacity: 0.9,
  },
  posterContainer: {
    width: CARD_WIDTH,
    height: POSTER_HEIGHT,
    borderRadius: BORDER_RADIUS,
    overflow: "hidden",
    backgroundColor: "#eee",
  },
  textContainer: {
    gap: 2,
    padding: 4,
  },
  poster: {
    width: "100%",
    height: "100%",
    borderRadius: BORDER_RADIUS,
  },
  posterPlaceholder: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    borderRadius: BORDER_RADIUS,
    backgroundColor: "#ccc",
  },
  posterPlaceholderText: {
    color: "#666",
    fontSize: 12,
  },
  ratingBadge: {
    position: "absolute",
    left: 8,
    bottom: 8,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(0,0,0,0.75)",
    borderWidth: 2,
    borderColor: "#4ade80",
    alignItems: "center",
    justifyContent: "center",
  },
  ratingText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "700",
  },
  iconBadge: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.9)",
    alignItems: "center",
    justifyContent: "center",
  },
  iconSymbol: {
    color: "#38bdf8",
    fontSize: 12,
  },
  title: {
    marginTop: 8,
    paddingHorizontal: 4,
    fontSize: 15,
    fontWeight: "700",
    color: "#111",
  },
  date: {
    marginTop: 2,
    paddingHorizontal: 4,
    fontSize: 12,
    color: "#666",
  },
});
