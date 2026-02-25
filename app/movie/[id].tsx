import type { MovieDetail } from "@/apis/tmdb/tmdb.types";
import { getTmdbPosterUrl } from "@/apis/tmdb/tmdb.utils";
import { IconSymbol } from "@/app-example/components/ui/icon-symbol";
import { ParallaxScrollView } from "@/components";
import { formatReleaseDate } from "@/components/MovieCard/helpers";
import { useMovieDetailQuery } from "@/queries/useMovieDetailQuery";
import { useWatchlistStore } from "@/store/watchlistStore";
import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

function detailToSummary(movie: MovieDetail) {
  return {
    id: movie.id,
    title: movie.title,
    posterPath: movie.posterPath,
    genreIds: movie.genres.map((g) => g.id),
    releaseDate: movie.releaseDate,
    voteAverage: null as number | null,
  };
}

export default function Movie() {
  const { id } = useLocalSearchParams();

  const { data: movie, isLoading, isError } = useMovieDetailQuery(Number(id));
  const isInWatchlist = useWatchlistStore((s) => s.isInWatchlist(Number(id)));
  const toggleWatchlist = useWatchlistStore((s) => s.toggle);

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (isError) {
    return <Text>Error loading movie</Text>;
  }

  if (!movie) {
    return <Text>Movie not found</Text>;
  }

  const posterUri = getTmdbPosterUrl(movie.posterPath);

  const handleAddOrRemoveFromWatchlist = () => {
    toggleWatchlist(detailToSummary(movie));
  };

  return (
    <View style={styles.container}>
      <ParallaxScrollView
        headerImage={
          posterUri ? (
            <Image
              source={posterUri}
              style={styles.headerImage}
              contentFit="cover"
            />
          ) : (
            <View style={[styles.headerImage, styles.headerPlaceholder]} />
          )
        }
        headerBackgroundColor="#1a1a1a"
      >
        <Text style={styles.title}>{movie.title}</Text>
        <Text style={styles.metadata}>{movie?.overview}</Text>

        <Text style={styles.metadata}>
          Release Date: {formatReleaseDate(movie.releaseDate) || "N/A"}
        </Text>
        <Text style={styles.metadata}>
          Genres: {movie.genres.map((g: any) => g.name).join(", ")}
        </Text>
        <Pressable
          style={({ pressed }) => [
            styles.watchlistButton,
            pressed && { opacity: 0.6 },
          ]}
          onPress={handleAddOrRemoveFromWatchlist}
        >
          <IconSymbol
            name={isInWatchlist ? "minus.circle" : "plus.circle"}
            color="#0b9edb"
          />
          <Text style={{ color: "#0b9edb", fontSize: 16, fontWeight: "bold" }}>
            {isInWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
          </Text>
        </Pressable>
      </ParallaxScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerImage: {
    width: "100%",
    height: "100%",
  },
  headerPlaceholder: {
    backgroundColor: "#2a2a2a",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111",
  },
  metadata: {
    fontSize: 16,
    color: "#333",
  },
  watchlistButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 12,
  },
});
