import { router } from "expo-router";
import { Plus } from "lucide-react-native";
import FooterComponent from "../FooterComponent";
import { Button } from "../ui/button";
import { Text } from "../ui/text";

export default function Footer() {
  return (
    <FooterComponent>
      <Button variant="main" onPress={() => router.push("./add-report")}>
        <Plus size={20} color="#ffffff" />
        <Text variant="main" className="mr-1 ">
          Nowy raport
        </Text>
      </Button>
    </FooterComponent>
  );
}
