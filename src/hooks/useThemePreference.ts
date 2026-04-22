import { useColorScheme } from "@/components/useColorScheme";
import { Appearance } from "react-native";

export type ThemeMode = "light" | "dark";

export function useThemePreference() {
  const scheme = useColorScheme();
  const mode: ThemeMode = scheme === "dark" ? "dark" : "light";

  const toggleTheme = () => {
    Appearance.setColorScheme(mode === "dark" ? "light" : "dark");
  };

  return {
    mode,
    isDark: mode === "dark",
    toggleTheme,
  };
}
