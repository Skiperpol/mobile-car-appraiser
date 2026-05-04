type StorageLike = {
  getString: (key: string) => string | undefined;
  set: (key: string, value: string) => void;
  delete: (key: string) => void;
  clearAll: () => void;
};

const memoryFallback = new Map<string, string>();

function createMemoryStorage(): StorageLike {
  return {
    getString: (key) => memoryFallback.get(key),
    set: (key, value) => {
      memoryFallback.set(key, value);
    },
    delete: (key) => {
      memoryFallback.delete(key);
    },
    clearAll: () => {
      memoryFallback.clear();
    },
  };
}

function createStorage(): StorageLike {
  try {
    const { createMMKV } = require("react-native-mmkv") as {
      createMMKV: (config?: { id?: string }) => StorageLike;
    };
    return createMMKV({ id: "car-appraiser-storage" });
  } catch {
    return createMemoryStorage();
  }
}

export const storage: StorageLike = createStorage();
