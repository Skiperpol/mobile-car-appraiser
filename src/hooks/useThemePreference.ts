import { useColorScheme } from "@/hooks/useColorScheme";
import { storage } from "@/lib/mmkv-storage";
import { useColorScheme as useNativewindColorScheme } from "nativewind";
import { useCallback, useEffect, useState } from "react";

export type ThemeMode = "light" | "dark";
export type ThemePreference = ThemeMode | "system";
const THEME_PREFERENCE_KEY = "app.theme.preference";
let hasHydratedThemePreference = false;

export function useThemePreference() {
  const { colorScheme, setColorScheme } = useNativewindColorScheme();
  const scheme = useColorScheme();
  const mode: ThemeMode = scheme === "dark" ? "dark" : "light";
  const [themePreference, setThemePreferenceState] =
    useState<ThemePreference>("system");

  const setThemePreference = useCallback(
    (nextPreference: ThemePreference) => {
      setColorScheme(nextPreference);
      setThemePreferenceState(nextPreference);
      storage.set(THEME_PREFERENCE_KEY, nextPreference);
    },
    [setColorScheme],
  );

  useEffect(() => {
    if (hasHydratedThemePreference) {
      return;
    }
    hasHydratedThemePreference = true;

    const loadPreference = async () => {
      try {
        const stored = storage.getString(THEME_PREFERENCE_KEY);
        if (stored === "light" || stored === "dark" || stored === "system") {
          setThemePreferenceState(stored);
          setColorScheme(stored);
          return;
        }
        setThemePreferenceState("system");
      } catch {
        // ignore storage read errors and use defaults
        setThemePreferenceState("system");
      }
    };

    void loadPreference();
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
