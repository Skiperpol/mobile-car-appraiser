import { Text } from "@/components/ui/text";
import { StatusBar } from "expo-status-bar";
import { Platform, View } from "react-native";

export default function ModalScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-zinc-100 px-6">
      <Text className="text-2xl font-bold text-zinc-900">Modal</Text>
      <Text className="mt-3 text-center text-base text-zinc-600">
        To jest pomocniczy ekran modalny.
      </Text>

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}
