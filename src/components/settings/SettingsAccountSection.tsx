import { Text } from "@/components/ui/text";
import { LogOut } from "lucide-react-native";
import { Pressable, View } from "react-native";

export function SettingsAccountSection() {
  return (
    <View className="mb-3 rounded-xl border border-zinc-200 bg-zinc-50 p-3">
      <Text className="text-lg font-semibold text-zinc-900">Konto</Text>

      <Pressable className="mt-3 h-10 flex-row items-center justify-center rounded-md bg-rose-600 active:bg-rose-700">
        <LogOut size={14} color="#ffffff" />
        <Text className="ml-2 text-xs font-semibold text-white">
          Wyloguj sie
        </Text>
      </Pressable>
    </View>
  );
}
