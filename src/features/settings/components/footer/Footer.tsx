import { logout } from "@/features/auth/api/auth-api";
import { LogOut } from "lucide-react-native";
import FooterComponent from "../../../../components/layout/FooterComponent";
import { Button } from "../../../../components/ui/button";
import { Text } from "../../../../components/ui/text";

export function SettingsFooter() {
  return (
    <FooterComponent>
      <Button
        variant="destructive"
        onPress={() => {
          void logout();
        }}
      >
        <LogOut size={14} color="#ffffff" />
        <Text>Wyloguj się</Text>
      </Button>
    </FooterComponent>
  );
}
