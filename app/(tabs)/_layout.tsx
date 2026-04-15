import { Stack } from "expo-router";
import React from "react";

export const unstable_settings = {
  initialRouteName: "login",
};

export default function TabLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" />
      <Stack.Screen name="index" />
    </Stack>
  );
}
