import type { MovieSummary } from "@/types";
import { MovieCard } from "@/components/MovieCard/MovieCard";
import { CARD_GAP, LIST_PADDING_H } from "@/constants";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { SectionCarouselSkeleton } from "./SectionCarouselSkeleton";

export interface SectionCarouselProps {
  title: string;
  movies: MovieSummary[];
  isLoading?: boolean;
  isError?: boolean;
}

export function SectionCarousel({ title, movies, isLoading, isError }: SectionCarouselProps) {
  if (isLoading) {
    return <SectionCarouselSkeleton />;
  }

  if (isError) {
    return <Text>Could not load movies.</Text>;
  }

  return (
    <View style={styles.section}>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        data={movies}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <MovieCard movie={item} />}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111",
    marginBottom: 12,
    paddingHorizontal: LIST_PADDING_H,
  },
  listContent: {
    paddingHorizontal: LIST_PADDING_H,
    paddingRight: LIST_PADDING_H + CARD_GAP,
  },
  separator: {
    width: CARD_GAP,
  },
});
