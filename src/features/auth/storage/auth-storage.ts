import { ACCESS_TOKEN_KEY } from "@/features/auth/storage/constants";
import * as SecureStore from "expo-secure-store";

let memoryAccessToken: string | null = null;

export async function setAccessToken(token: string): Promise<void> {
  memoryAccessToken = token;
  await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, token);
}

export async function getAccessToken(): Promise<string | null> {
  if (memoryAccessToken) {
    return memoryAccessToken;
  }
  const stored = await SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
  if (stored) {
    memoryAccessToken = stored;
  }
  return stored;
}

export async function clearAccessToken(): Promise<void> {
  memoryAccessToken = null;
  await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY);
}
