import { useColorScheme } from "@/components/useColorScheme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useColorScheme as useNativewindColorScheme } from "nativewind";
import { useCallback, useEffect, useState } from "react";

export type ThemeMode = "light" | "dark";
export type ThemePreference = ThemeMode | "system";
const THEME_PREFERENCE_KEY = "app.theme.preference";

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

  useEffect(() => {
    const loadPreference = async () => {
      try {
        const stored = await AsyncStorage.getItem(THEME_PREFERENCE_KEY);
        if (stored === "light" || stored === "dark" || stored === "system") {
          setThemePreferenceState(stored);
          setColorScheme(stored);
        }
      } catch {
        // ignore storage read errors and use defaults
      }
    };

    void loadPreference();
  }, [setColorScheme]);

  useEffect(() => {
    void AsyncStorage.setItem(THEME_PREFERENCE_KEY, themePreference);
  }, [themePreference]);

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
