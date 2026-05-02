import { useColorScheme as useNativewindColorScheme } from "nativewind";

export const useColorScheme = () => {
  const { colorScheme } = useNativewindColorScheme();
  return colorScheme ?? "light";
};
