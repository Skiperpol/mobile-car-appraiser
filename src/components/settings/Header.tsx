import { router } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { View } from "react-native";
import { Button } from "../ui/button";
import { Text } from "../ui/text";

export default function Header() {
  return (
    <View className="mb-3 border-b border-zinc-200 bg-white p-4">
      <View className="flex-row items-center gap-2 h-10">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full"
          onPress={() => router.back()}
        >
          <ArrowLeft size={18} color="#111827" />
        </Button>
        <Text className="text-2xl font-bold text-zinc-900">Ustawienia</Text>
      </View>
    </View>
  );
}
