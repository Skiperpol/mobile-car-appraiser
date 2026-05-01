import { useColorScheme } from "@/components/useColorScheme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useColorScheme as useNativewindColorScheme } from "nativewind";
import { useCallback, useEffect } from "react";

export type ThemeMode = "light" | "dark";
export type ThemePreference = ThemeMode | "system";
const THEME_PREFERENCE_KEY = "app.theme.preference";
let hasHydratedThemePreference = false;

export function useThemePreference() {
  const { colorScheme, setColorScheme } = useNativewindColorScheme();
  const scheme = useColorScheme();
  const mode: ThemeMode = scheme === "dark" ? "dark" : "light";
  const themePreference: ThemePreference =
    colorScheme === "light" || colorScheme === "dark" ? colorScheme : "system";

  const setThemePreference = useCallback((nextPreference: ThemePreference) => {
    setColorScheme(nextPreference);
    void AsyncStorage.setItem(THEME_PREFERENCE_KEY, nextPreference);
  }, [setColorScheme]);

  useEffect(() => {
    if (hasHydratedThemePreference) {
      return;
    }
    hasHydratedThemePreference = true;

    const loadPreference = async () => {
      try {
        const stored = await AsyncStorage.getItem(THEME_PREFERENCE_KEY);
        if (stored === "light" || stored === "dark" || stored === "system") {
          setColorScheme(stored);
        }
      } catch {
        // ignore storage read errors and use defaults
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
