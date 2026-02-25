import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as ExpoDevice from "expo-device";
import { Platform } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useSyncQueriesExternal } from "react-query-external-sync";

const queryClient = new QueryClient();
// We can add other providers here, such as: ThemeProvider, etc.

export const AppProviders = ({ children }: React.PropsWithChildren) => {
  // This hook is used to sync the queries with the devtools.
  // It works only in development mode.
  useSyncQueriesExternal({
    queryClient,
    socketURL: "http://localhost:42831",
    deviceName: Platform?.OS || "web", // Platform detection
    platform: Platform?.OS || "web",
    deviceId: Platform?.OS || "web",
    isDevice: ExpoDevice.isDevice,
  });

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>{children}</SafeAreaProvider>
    </QueryClientProvider>
  );
};
