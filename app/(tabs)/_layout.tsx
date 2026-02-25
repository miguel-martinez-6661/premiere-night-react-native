import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Tabs } from "expo-router";
import {
  Label,
  NativeTabs,
  Icon as UnstableIcon,
} from "expo-router/unstable-native-tabs";
import { Platform } from "react-native";

export default function TabLayout() {
  if (Platform.OS === "ios") {
    return (
      <NativeTabs>
        <NativeTabs.Trigger name="index">
          <Label>Home</Label>
          <UnstableIcon sf="house.circle.fill" />
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="watchlist">
          <UnstableIcon sf="play.circle.fill" drawable="play.circle.fill" />
          <Label>Watchlist</Label>
        </NativeTabs.Trigger>
      </NativeTabs>
    );
  }

  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <MaterialIcons
              name="local-movies"
              size={24}
              color={focused ? "#38bdf8" : "gray"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="watchlist"
        options={{
          headerShown: false,
          title: "Watchlist",
          tabBarIcon: ({ focused }) => (
            <MaterialIcons
              name="view-agenda"
              size={24}
              color={focused ? "#38bdf8" : "gray"}
            />
          ),
        }}
      />
    </Tabs>
  );
}
