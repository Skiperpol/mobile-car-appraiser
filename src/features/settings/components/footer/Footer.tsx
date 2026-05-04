import { useLogout } from "@/features/settings/hooks/useLogout";
import { LogOut } from "lucide-react-native";
import { ActivityIndicator } from "react-native";
import FooterComponent from "../../../../components/layout/FooterComponent";
import { Button } from "../../../../components/ui/button";
import { Text } from "../../../../components/ui/text";

export function SettingsFooter() {
  const { isLoggingOut, handleLogout } = useLogout();

  return (
    <FooterComponent>
      <Button
        variant="destructive"
        onPress={() => void handleLogout()}
        disabled={isLoggingOut}
      >
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
