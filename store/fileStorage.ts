import { File, Paths } from "expo-file-system";
import type { StateStorage } from "zustand/middleware";

// expo-file-system File exposes .text() and .write() at runtime (ExpoFileSystem.types)
type FileWithText = File & { text(): Promise<string>; write(content: string): void };

/**
 * Persist state to the app document directory using expo-file-system.
 * Avoids AsyncStorage native module issues in Expo Go / some dev builds.
 */
export function createFileStorage(): StateStorage {
  return {
    getItem: async (name: string): Promise<string | null> => {
      try {
        const file = new File(Paths.document, `${name}.json`) as FileWithText;
        if (!file.exists) return null;
        const text = await file.text();
        return text ?? null;
      } catch {
        return null;
      }
    },
    setItem: async (name: string, value: string): Promise<void> => {
      const fileName = `${name}.json`;
      const file = new File(Paths.document, fileName) as FileWithText;
      if (!file.exists) {
        Paths.document.createFile(fileName, "application/json");
      }
      const f = new File(Paths.document, fileName) as FileWithText;
      f.write(value);
    },
    removeItem: async (name: string): Promise<void> => {
      try {
        const file = new File(Paths.document, `${name}.json`);
        if (file.exists) {
          file.delete();
        }
      } catch {
        // no-op
      }
    },
  };
}
