import { SettingsCard } from "@/components/settings/SettingsCard";
import { Icon } from "@/components/ui/icon";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  type Option,
} from "@/components/ui/select";
import { Text } from "@/components/ui/text";
import {
  useThemePreference,
  type ThemePreference,
} from "@/hooks/useThemePreference";
import { LaptopMinimal, Moon, Sun } from "lucide-react-native";
import { View } from "react-native";

const THEME_OPTIONS: Array<{
  value: ThemePreference;
  label: string;
  icon: typeof Sun;
}> = [
  { value: "light", label: "Dzienny", icon: Sun },
  { value: "dark", label: "Nocny", icon: Moon },
  { value: "system", label: "Domyslny", icon: LaptopMinimal },
];

export function SettingsGeneralSection() {
  const { themePreference, setThemePreference } = useThemePreference();
  const selectedOption =
    THEME_OPTIONS.find((option) => option.value === themePreference) ??
    THEME_OPTIONS[2];
  const selectedValue: Option = {
    value: selectedOption.value,
    label: selectedOption.label,
  };

  return (
    <SettingsCard>
      <View className="flex-row items-center justify-between">
        <Text className="text-lg font-semibold text-zinc-900">
          Motyw aplikacji
        </Text>
        <Select
          value={selectedValue}
          onValueChange={(option) => {
            if (option) {
              setThemePreference(option.value as ThemePreference);
            }
          }}
        >
          <SelectTrigger className="w-52 bg-white">
            <View className="flex-row items-center gap-2">
              <Icon as={selectedOption.icon} className="size-4 text-zinc-600" />
              <SelectValue placeholder="Wybierz motyw" />
            </View>
          </SelectTrigger>
          <SelectContent>
            {THEME_OPTIONS.map((option) => (
              <SelectItem
                key={option.value}
                value={option.value}
                label={option.label}
                icon={option.icon}
              >
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </View>
    </SettingsCard>
  );
}
