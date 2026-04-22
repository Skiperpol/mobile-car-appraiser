import { SettingsCard } from "@/components/settings/SettingsCard";
import { Text } from "@/components/ui/text";
import { useThemePreference } from "@/hooks/useThemePreference";
import { Moon, Sun } from "lucide-react-native";
import { Pressable, View } from "react-native";

export function SettingsGeneralSection() {
  const { isDark, toggleTheme } = useThemePreference();
  const label = isDark ? "Nocny" : "Dzienny";

  return (
    <SettingsCard title="Ogolne" description="Podstawowe ustawienia aplikacji">
      <View className="mt-4 flex-row items-center justify-between">
        <View className="mr-3 flex-1">
          <Text className="text-xs font-semibold text-zinc-900">Motyw</Text>
          <Text className="mt-0.5 text-xs text-zinc-500">
            Przelaczaj miedzy motywem dziennym a nocnym
          </Text>
        </View>
        <Pressable
          onPress={toggleTheme}
          className="flex-row items-center rounded-md border border-zinc-200 bg-white px-2.5 py-1.5 active:bg-zinc-100"
        >
          {isDark ? (
            <Moon size={12} color="#52525b" />
          ) : (
            <Sun size={12} color="#52525b" />
          )}
          <Text className="ml-1.5 text-xs font-medium text-zinc-700">{label}</Text>
        </Pressable>
      </View>
    </SettingsCard>
  );
}
