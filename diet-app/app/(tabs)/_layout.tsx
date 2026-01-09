import { Stack } from "expo-router";

export default function LogItemLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="add-food" />
    </Stack>
  );
}
