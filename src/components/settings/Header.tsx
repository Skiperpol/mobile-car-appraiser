import { router } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { View } from "react-native";
import HeaderComponent from "../HeaderComponent";
import { Button } from "../ui/button";
import { Text } from "../ui/text";

export default function Header() {
  return (
    <HeaderComponent>
      <View className="flex-row items-center gap-2 h-10">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full"
          onPress={() => router.back()}
        >
          <ArrowLeft size={18} color="#111827" />
        </Button>
        <Text variant="main">Ustawienia</Text>
      </View>
    </HeaderComponent>
  );
}
