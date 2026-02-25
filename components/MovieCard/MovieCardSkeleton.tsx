import { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";

const CARD_WIDTH = 140;
const POSTER_ASPECT = 2 / 3;
const POSTER_HEIGHT = CARD_WIDTH / POSTER_ASPECT;
const BORDER_RADIUS = 12;

export function MovieCardSkeleton() {
  const opacity = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.7,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.4,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [opacity]);

  return (
    <View style={styles.card}>
      <Animated.View style={[styles.poster, { opacity }]} />
      <Animated.View style={[styles.titleLine, styles.titleLineFirst, { opacity }]} />
      <Animated.View style={[styles.titleLine, { opacity }]} />
      <Animated.View style={[styles.dateLine, { opacity }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    borderRadius: BORDER_RADIUS,
    overflow: "hidden",
  },
  poster: {
    width: CARD_WIDTH,
    height: POSTER_HEIGHT,
    borderRadius: BORDER_RADIUS,
    backgroundColor: "#e0e0e0",
  },
  titleLine: {
    marginTop: 8,
    height: 14,
    borderRadius: 6,
    backgroundColor: "#e0e0e0",
    width: "90%",
    alignSelf: "center",
  },
  titleLineFirst: {
    marginTop: 8,
  },
  dateLine: {
    marginTop: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#e0e0e0",
    width: "60%",
    alignSelf: "center",
  },
});
