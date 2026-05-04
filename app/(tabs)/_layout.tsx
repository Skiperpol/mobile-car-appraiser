import { useAuthGuard } from "@/features/auth/hooks/useAuthGuard";
import { Stack } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export const unstable_settings = {
  initialRouteName: "login",
};

export default function TabLayout() {
  const { isAuthResolved } = useAuthGuard();

  if (!isAuthResolved) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 bg-zinc-100">
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="login" />
          <Stack.Screen name="index" />
          <Stack.Screen name="settings" />
          <Stack.Screen name="add-report" />
          <Stack.Screen name="report-details" />
        </Stack>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
