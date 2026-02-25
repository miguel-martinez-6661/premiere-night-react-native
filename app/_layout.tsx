import { AppProviders } from "@/providers";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <AppProviders>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="movie/[id]"
          options={{
            headerShown: true,
            headerBackTitle: "Back",
            headerTransparent: true,
            headerTitle: "",
          }}
        />
      </Stack>
      <StatusBar style="auto" />
    </AppProviders>
  );
}
