import { SettingsCard } from "@/features/settings/components/content/SettingsCard";
import { Text } from "@/components/ui/text";
import {
  useThemePreference,
  type ThemePreference,
} from "@/hooks/useThemePreference";
import { Pressable, View } from "react-native";

const THEME_OPTIONS: Array<{ value: ThemePreference; label: string }> = [
  { value: "light", label: "Jasny" },
  { value: "dark", label: "Ciemny" },
  { value: "system", label: "Domyslny" },
];

export function SettingsGeneralSection() {
  const { themePreference, setThemePreference } = useThemePreference();

  return (
    <SettingsCard>
      <Text className="text-lg font-semibold text-zinc-900">
        Motyw aplikacji
      </Text>
      <View className="mt-4 flex-row rounded-main bg-zinc-100 p-1 border border-zinc-200">
        {THEME_OPTIONS.map((option) => (
          <Pressable
            key={option.value}
            onPress={() => setThemePreference(option.value)}
            className={`flex-1 items-center rounded-main px-3 py-2 ${
              themePreference === option.value ? "bg-black" : "bg-transparent"
            }`}
          >
            <Text
              className={`text-sm font-medium ${
                themePreference === option.value
                  ? "text-white"
                  : "text-zinc-600"
              }`}
            >
              {option.label}
            </Text>
          </Pressable>
        ))}
      </View>
    </SettingsCard>
  );
}
