import { useColorScheme } from "@/components/useColorScheme";
import { Appearance } from "react-native";
import { useCallback, useState } from "react";

export type ThemeMode = "light" | "dark";
export type ThemePreference = ThemeMode | "system";

export function useThemePreference() {
  const scheme = useColorScheme();
  const mode: ThemeMode = scheme === "dark" ? "dark" : "light";
  const [themePreference, setThemePreferenceState] =
    useState<ThemePreference>("system");

  const setThemePreference = useCallback((nextPreference: ThemePreference) => {
    setThemePreferenceState(nextPreference);
    Appearance.setColorScheme(
      nextPreference === "system" ? null : nextPreference,
    );
  }, []);

  const toggleTheme = () => {
    setThemePreference(mode === "dark" ? "light" : "dark");
  };

  return {
    mode,
    isDark: mode === "dark",
    themePreference,
    setThemePreference,
    toggleTheme,
  };
}
