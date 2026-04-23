import { LogOut } from "lucide-react-native";
import FooterComponent from "../FooterComponent";
import { Button } from "../ui/button";
import { Text } from "../ui/text";

export function SettingsFooter() {
  return (
    <FooterComponent>
      <Button variant="destructive">
        <LogOut size={14} color="#ffffff" />
        <Text>Wyloguj się</Text>
      </Button>
    </FooterComponent>
  );
}
