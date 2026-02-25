import { MovieCardSkeleton } from "@/components/MovieCard/MovieCardSkeleton";
import { CARD_GAP, LIST_PADDING_H, SKELETON_CARD_COUNT } from "@/constants";
import { FlatList, StyleSheet, View } from "react-native";

export function SectionCarouselSkeleton() {
  return (
    <View style={styles.section}>
      <View style={styles.titleSkeleton} />
      <FlatList
        data={Array.from({ length: SKELETON_CARD_COUNT }, (_, i) => i)}
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
