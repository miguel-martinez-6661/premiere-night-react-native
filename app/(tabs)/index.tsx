import { HeroSection, SearchBar, SectionCarousel } from "@/components";
import { DEFAULT_PAGE } from "@/constants";
import { useMovieSearchQuery } from "@/queries/useMovieSearchQuery";
import { useNowPlayingQuery } from "@/queries/useNowPlayingQuery";
import { usePopularQuery } from "@/queries/usePopularQuery";
import { useState } from "react";
import { Platform, ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Home() {
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState<string>("");

  const {
    data: nowPlaying,
    isLoading: isNowPlayingLoading,
    isError: isNowPlayingError,
  } = useNowPlayingQuery(DEFAULT_PAGE);

  const {
    data: popularMovies,
    isLoading: isPopularLoading,
    isError: isPopularError,
  } = usePopularQuery(DEFAULT_PAGE);

  const {
    data: searchResults,
    isLoading: isSearchLoading,
    isError: isSearchError,
  } = useMovieSearchQuery(searchQuery, DEFAULT_PAGE);

  return (
    <View style={styles.container}>
      <ScrollView
        style={{ marginTop: Platform.OS === "ios" ? -insets.top : 0 }}
      >
        <HeroSection
          title="Welcome to Premiere Night."
          subtitle="Millions of movies, series and people to discover. Explore now."
        >
          <View style={styles.searchArea}>
            <View style={styles.searchPill}>
              <SearchBar
                placeholder="Buscar..."
                onSearch={setSearchQuery}
                containerStyle={styles.searchBarContainer}
                inputStyle={styles.searchBarInput}
              />
            </View>
          </View>
        </HeroSection>
        <View style={styles.carouselContainer}>
          {searchQuery.length > 0 ? (
            <SectionCarousel
              title="Search results"
              movies={searchResults?.results ?? []}
              isLoading={isSearchLoading}
              isError={isSearchError}
            />
          ) : (
            <>
              <SectionCarousel
                title="Now playing"
                movies={nowPlaying?.results ?? []}
                isLoading={isNowPlayingLoading}
                isError={isNowPlayingError}
              />
              <SectionCarousel
                title="Popular"
                movies={popularMovies?.results ?? []}
                isLoading={isPopularLoading}
                isError={isPopularError}
              />
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  carouselContainer: {
    gap: 12,
    paddingTop: 16,
  },
  searchArea: {
    marginTop: 8,
  },
  searchPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 999,
    paddingHorizontal: 4,
    paddingVertical: 4,
  },
  searchBarContainer: {
    flex: 1,
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  searchBarInput: {
    backgroundColor: "transparent",
    borderRadius: 999,
  },
  searchButton: {
    marginLeft: 4,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: "#00d1b2",
    alignItems: "center",
    justifyContent: "center",
  },
  searchButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
  },
});
