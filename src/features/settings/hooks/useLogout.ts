import reportRepository from "@/database/repositories/ReportRepository";
import { resetLocalDatabase } from "@/database/utils/reset-local-database";
import { logout } from "@/features/auth/api/auth-api";
import { router } from "expo-router";
import { useCallback, useState } from "react";
import { Alert } from "react-native";

export function useLogout() {
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const performLogout = useCallback(async () => {
    setIsLoggingOut(true);
    try {
      await logout();
      await resetLocalDatabase();
      router.replace("/(tabs)/login");
    } finally {
      setIsLoggingOut(false);
    }
  }, []);

  const handleLogout = useCallback(async () => {
    const unsyncedCount = await reportRepository.getUnsyncedReportsCount();

    if (unsyncedCount > 0) {
      Alert.alert(
        "Masz niezsynchronizowane dane",
        "Po wylogowaniu lokalne dane zostaną wyczyszczone. Czy na pewno chcesz kontynuować?",
        [
          { text: "Anuluj", style: "cancel" },
          {
            text: "Wyloguj i wyczyść",
            style: "destructive",
            onPress: () => {
              void performLogout();
            },
          },
        ],
      );
      return;
    }

    await performLogout();
  }, [performLogout]);

  return {
    isLoggingOut,
    handleLogout,
  };
}
