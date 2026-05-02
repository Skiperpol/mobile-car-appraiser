import { logout } from "@/features/auth/api/auth-api";
import { router } from "expo-router";
import { LogOut } from "lucide-react-native";
import { useCallback, useState } from "react";
import { ActivityIndicator } from "react-native";
import FooterComponent from "../../../../components/layout/FooterComponent";
import { Button } from "../../../../components/ui/button";
import { Text } from "../../../../components/ui/text";

export function SettingsFooter() {
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = useCallback(async () => {
    setIsLoggingOut(true);
    await logout();
    router.replace("/(tabs)/login");
    setIsLoggingOut(false);
  }, []);

  return (
    <FooterComponent>
      <Button variant="destructive" onPress={handleLogout} disabled={isLoggingOut}>
        {isLoggingOut ? (
          <ActivityIndicator size="small" color="#ffffff" />
        ) : (
          <>
            <LogOut size={14} color="#ffffff" />
            <Text>Wyloguj się</Text>
          </>
        )}
      </Button>
    </FooterComponent>
  );
}
