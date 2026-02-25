import { useDebounce } from "@/hooks/useDebounce";
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
  }, 500);

  const handleChangeText = useCallback(
    (text: string) => {
      setLocalValue(text);
      debouncedOnSearch(text);
    },
    [debouncedOnSearch]
  );

  return (
    <View style={[styles.wrapper, containerStyle]}>
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
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  input: {
    height: 44,
    paddingHorizontal: 14,
    borderRadius: 10,
    backgroundColor: "#f0f0f0",
    fontSize: 16,
    color: "#111",
  },
});
