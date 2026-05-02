import FooterComponent from "@/components/layout/FooterComponent";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { router } from "expo-router";
import { Plus } from "lucide-react-native";

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
