import { useColorScheme } from "@/components/useColorScheme";
import { useColorScheme as useNativewindColorScheme } from "nativewind";
import { useCallback, useState } from "react";

export type ThemeMode = "light" | "dark";
export type ThemePreference = ThemeMode | "system";

export function useThemePreference() {
  const { setColorScheme } = useNativewindColorScheme();
  const scheme = useColorScheme();
  const mode: ThemeMode = scheme === "dark" ? "dark" : "light";
  const [themePreference, setThemePreferenceState] =
    useState<ThemePreference>("system");

  const setThemePreference = useCallback((nextPreference: ThemePreference) => {
    setThemePreferenceState(nextPreference);
    setColorScheme(nextPreference);
  }, [setColorScheme]);

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
