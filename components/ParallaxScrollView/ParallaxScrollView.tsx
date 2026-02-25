import { PARALLAX_HEADER_HEIGHT } from "@/constants";
import type { PropsWithChildren, ReactElement } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollOffset,
} from "react-native-reanimated";

export type ParallaxScrollViewProps = PropsWithChildren<{
  headerImage: ReactElement;
  headerBackgroundColor?: string;
}>;

export function ParallaxScrollView({
  children,
  headerImage,
  headerBackgroundColor = "#1a1a1a",
}: ParallaxScrollViewProps) {
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollOffset(scrollRef);

  const headerAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(
          scrollOffset.value,
          [-PARALLAX_HEADER_HEIGHT, 0, PARALLAX_HEADER_HEIGHT],
          [-PARALLAX_HEADER_HEIGHT / 2, 0, PARALLAX_HEADER_HEIGHT * 0.75]
        ),
      },
      {
        scale: interpolate(
          scrollOffset.value,
          [-PARALLAX_HEADER_HEIGHT, 0, PARALLAX_HEADER_HEIGHT],
          [2, 1, 1]
        ),
      },
    ],
  }));

  return (
    <Animated.ScrollView
      ref={scrollRef}
      style={styles.scrollView}
      scrollEventThrottle={16}
    >
      <Animated.View
        style={[
          styles.header,
          { backgroundColor: headerBackgroundColor },
          headerAnimatedStyle,
        ]}
      >
        {headerImage}
      </Animated.View>
      <View style={styles.content}>{children}</View>
    </Animated.ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  header: {
    height: PARALLAX_HEADER_HEIGHT,
    overflow: "hidden",
  },
  content: {
    flex: 1,
    padding: 32,
    gap: 16,
    backgroundColor: "#fff",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
  },
});
