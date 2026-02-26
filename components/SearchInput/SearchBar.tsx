import { SEARCH_DEBOUNCE_MS } from "@/constants";
import { useDebounce } from "@/hooks/useDebounce";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import { useCallback, useState } from "react";
import {
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";

export interface SearchBarProps
  extends Omit<TextInputProps, "value" | "onChangeText"> {
  onSearch: (query: string) => void;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
}

export function SearchBar({
  onSearch,
  placeholder = "Search movies…",
  containerStyle,
  inputStyle,
  ...rest
}: SearchBarProps) {
  const [localValue, setLocalValue] = useState("");

  const debouncedOnSearch = useDebounce((text: string) => {
    onSearch(text.trim());
  }, SEARCH_DEBOUNCE_MS);

  const handleChangeText = useCallback(
    (text: string) => {
      setLocalValue(text);
      debouncedOnSearch(text);
    },
    [debouncedOnSearch]
  );

  return (
    <View style={[styles.wrapper, containerStyle]}>
      <MaterialIcons name="search" size={32} color="black" />
      <TextInput
        {...rest}
        value={localValue}
        onChangeText={handleChangeText}
        placeholder={placeholder}
        style={[styles.input, inputStyle, rest.style]}
        placeholderTextColor="#999"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    borderRadius: 10,
    backgroundColor: "transparent",
  },
  input: {
    height: 44,
    borderRadius: 10,
    backgroundColor: "#ffffff",
    fontSize: 16,
    color: "#111",
    overflow: "hidden",
  },
});
