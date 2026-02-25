import { MovieCardSkeleton } from "@/components/MovieCard/MovieCardSkeleton";
import { FlatList, StyleSheet, View } from "react-native";

const CARD_GAP = 12;
const LIST_PADDING_H = 16;
const SKELETON_COUNT = 5;

export function SectionCarouselSkeleton() {
  return (
    <View style={styles.section}>
      <View style={styles.titleSkeleton} />
      <FlatList
        data={Array.from({ length: SKELETON_COUNT }, (_, i) => i)}
        keyExtractor={(id) => String(id)}
        renderItem={() => <MovieCardSkeleton />}
        horizontal
        scrollEnabled={false}
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
  titleSkeleton: {
    height: 24,
    width: 160,
    borderRadius: 6,
    backgroundColor: "#e0e0e0",
    marginBottom: 12,
    marginHorizontal: LIST_PADDING_H,
  },
  listContent: {
    paddingHorizontal: LIST_PADDING_H,
    paddingRight: LIST_PADDING_H + CARD_GAP,
  },
  separator: {
    width: CARD_GAP,
  },
});
