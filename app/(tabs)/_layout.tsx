import { Stack } from "expo-router";
import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export const unstable_settings = {
  initialRouteName: "login",
};

export default function TabLayout() {
  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 bg-zinc-100">
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="login" />
          <Stack.Screen name="index" />
          <Stack.Screen name="settings" />
          <Stack.Screen name="add-report" />
        </Stack>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
