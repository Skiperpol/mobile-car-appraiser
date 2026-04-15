import React from "react";
import { Stack } from "expo-router";

export const unstable_settings = {
  initialRouteName: "login",
};

export default function TabLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" />
    </Stack>
  );
}
