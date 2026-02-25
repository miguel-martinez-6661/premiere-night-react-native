// import { IconSymbol } from "@/app-example/components/ui/icon-symbol";
import { Icon, Label, NativeTabs } from "expo-router/unstable-native-tabs";

export default function TabLayout() {
  return (
    <NativeTabs>
      <NativeTabs.Trigger name="index">
        <Label>Home</Label>
        <Icon sf="house.circle.fill" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="watchlist">
        <Icon sf="play.circle.fill" />
        <Label>Watchlist</Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
