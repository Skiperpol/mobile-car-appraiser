import { Text } from "@/components/ui/text";
import { LogOut } from "lucide-react-native";
import { View } from "react-native";
import { Button } from "@/components/ui/button";

export function SettingsAccountSection() {
  return (
    <View className="mb-3 rounded-main border border-zinc-200 bg-zinc-50 p-3">
      <Text className="text-lg font-semibold text-zinc-900">Konto</Text>
      <Button
        variant="destructive"
        size="sm"
        className="mt-3 h-base flex-row items-center justify-center rounded-main bg-rose-600 active:bg-rose-700"
      >
        <LogOut size={14} color="#ffffff" />
        <Text className="ml-2 text-base font-semibold text-white">
          Wyloguj sie
        </Text>
      </Button>
    </View>
  );
}
