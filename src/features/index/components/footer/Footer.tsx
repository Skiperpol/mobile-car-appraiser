import { router } from "expo-router";
import { Plus } from "lucide-react-native";
import FooterComponent from "@/components/FooterComponent";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";

export default function Footer() {
  return (
    <FooterComponent>
      <Button variant="main" onPress={() => router.push("./add-report")}>
        <Plus size={20} color="#ffffff" />
        <Text>Nowy raport</Text>
      </Button>
    </FooterComponent>
  );
}
