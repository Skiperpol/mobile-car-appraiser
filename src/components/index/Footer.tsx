import { Plus } from "lucide-react-native";
import { Text, View } from "react-native";
import { Button } from "../ui/button";

export default function Footer() {
  return (
    <View className="border-t border-zinc-200 bg-white px-4 pb-4 pt-3">
      <Button className="h-14 flex-row items-center justify-center">
        <Plus size={20} color="#ffffff" />
        <Text className="mr-1 text-lg font-semibold text-white">
          Nowy raport
        </Text>
      </Button>
    </View>
  );
}
