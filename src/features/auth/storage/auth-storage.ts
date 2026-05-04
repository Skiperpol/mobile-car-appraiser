import { ACCESS_TOKEN_KEY } from "@/features/auth/storage/constants";

let memoryAccessToken: string | null = null;
const memoryStore = new Map<string, string>();

type SecureStoreLike = {
  setItemAsync: (key: string, value: string) => Promise<void>;
  getItemAsync: (key: string) => Promise<string | null>;
  deleteItemAsync: (key: string) => Promise<void>;
};

let secureStoreModule: SecureStoreLike | null | undefined;
let secureStoreLoadingPromise: Promise<SecureStoreLike | null> | null = null;

async function getSecureStore(): Promise<SecureStoreLike | null> {
  if (secureStoreModule !== undefined) {
    return secureStoreModule;
  }

  if (!secureStoreLoadingPromise) {
    secureStoreLoadingPromise = import("expo-secure-store")
      .then((module) => {
        secureStoreModule = module as SecureStoreLike;
        return secureStoreModule;
      })
      .catch(() => {
        secureStoreModule = null;
        return null;
      })
      .finally(() => {
        secureStoreLoadingPromise = null;
      });
  }

  return await secureStoreLoadingPromise;
}

export async function setAccessToken(token: string): Promise<void> {
  memoryAccessToken = token;
  const secureStore = await getSecureStore();
  if (secureStore) {
    try {
      await secureStore.setItemAsync(ACCESS_TOKEN_KEY, token);
      return;
    } catch {
      // native module not available in current runtime, fallback to memory
    }
  }
  memoryStore.set(ACCESS_TOKEN_KEY, token);
}

export async function getAccessToken(): Promise<string | null> {
  if (memoryAccessToken) {
    return memoryAccessToken;
  }
  const secureStore = await getSecureStore();
  const stored = secureStore
    ? await secureStore.getItemAsync(ACCESS_TOKEN_KEY).catch(() => null)
    : (memoryStore.get(ACCESS_TOKEN_KEY) ?? null);
  if (stored) {
    memoryAccessToken = stored;
  }
  return stored;
}

export async function clearAccessToken(): Promise<void> {
  memoryAccessToken = null;
  const secureStore = await getSecureStore();
  if (secureStore) {
    await secureStore.deleteItemAsync(ACCESS_TOKEN_KEY).catch(() => undefined);
    return;
  }
  memoryStore.delete(ACCESS_TOKEN_KEY);
}
