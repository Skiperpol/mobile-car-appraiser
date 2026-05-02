import { ACCESS_TOKEN_KEY } from "@/features/auth/storage/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

let memoryAccessToken: string | null = null;

export async function setAccessToken(
  token: string,
  options: { persist: boolean },
): Promise<void> {
  memoryAccessToken = token;
  if (options.persist) {
    await AsyncStorage.setItem(ACCESS_TOKEN_KEY, token);
  } else {
    await AsyncStorage.removeItem(ACCESS_TOKEN_KEY);
  }
}

export async function getAccessToken(): Promise<string | null> {
  if (memoryAccessToken) {
    return memoryAccessToken;
  }
  const stored = await AsyncStorage.getItem(ACCESS_TOKEN_KEY);
  if (stored) {
    memoryAccessToken = stored;
  }
  return stored;
}

export async function clearAccessToken(): Promise<void> {
  memoryAccessToken = null;
  await AsyncStorage.removeItem(ACCESS_TOKEN_KEY);
}
