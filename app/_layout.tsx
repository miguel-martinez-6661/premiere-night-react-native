import { useDeepLinking } from "@/hooks/useDeepLinking";
import { AppProviders } from "@/providers";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  useDeepLinking();

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
