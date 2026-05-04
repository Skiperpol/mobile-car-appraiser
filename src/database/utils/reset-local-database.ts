import { database } from "@/database";
import { storage } from "@/lib/mmkv-storage";

export async function resetLocalDatabase(): Promise<void> {
  await database.write(async () => {
    await database.unsafeResetDatabase();
  });
  storage.clearAll();
}
