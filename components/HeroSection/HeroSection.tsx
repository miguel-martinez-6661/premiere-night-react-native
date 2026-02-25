import { PropsWithChildren } from "react";
import { StyleSheet, Text, View } from "react-native";

interface HeroSectionProps extends PropsWithChildren {
  title: string;
  subtitle: string;
}

export const HeroSection = ({
  title,
  subtitle,
  children,
}: HeroSectionProps) => {
  return (
    <View style={[styles.container]}>
      <View style={styles.overlay} />
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0b9edb",
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    overflow: "hidden",
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 28,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.15)",
  },
  content: {
    position: "relative",
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#ffffff",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "500",
    color: "#f5f5f5",
    marginBottom: 20,
  },
});
