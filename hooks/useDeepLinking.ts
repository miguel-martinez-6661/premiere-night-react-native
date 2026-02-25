import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Linking } from "react-native";

export function useDeepLinking() {
  const router = useRouter();

  useEffect(() => {
    const handleUrl = (url: string | null) => {
      if (!url || !url.startsWith("premierenight://")) return;
      try {
        const parsed = new URL(url);
        const path = parsed.pathname || "/";
        const hostAsPath =
          parsed.host && parsed.host !== "localhost" ? `/${parsed.host}` : "";
        const targetPath = path === "/" && hostAsPath ? hostAsPath : path;
        if (targetPath === "/watchlist") {
          router.replace("/(tabs)/watchlist");
        }
      } catch {
        // ignore parse errors
      }
    };

    Linking.getInitialURL().then(handleUrl);
    const sub = Linking.addEventListener("url", ({ url }) => handleUrl(url));
    return () => sub.remove();
  }, [router]);
}
