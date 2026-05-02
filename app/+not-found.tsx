import { Text } from "@/components/ui/text";
import { Link, Stack } from "expo-router";
import { View } from "react-native";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Nie znaleziono" }} />
      <View className="flex-1 items-center justify-center bg-zinc-100 px-5">
        <Text className="text-xl font-bold text-zinc-900">Nie ma takiego ekranu.</Text>

        <Link href="/" className="mt-4 py-3">
          <Text className="text-base text-blue-600">Wroc do ekranu glownego</Text>
        </Link>
      </View>
    </>
  );
}
