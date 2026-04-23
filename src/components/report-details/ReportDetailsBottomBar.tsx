import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { Camera, Download, Mail } from "lucide-react-native";
import { View } from "react-native";

export function ReportDetailsBottomBar() {
  return (
    <View className="border-t border-zinc-200 bg-white px-4 pb-4 pt-3">
      <View className="flex-row items-center gap-3">
        <Button variant="outline" className="h-12 w-20 rounded-xl border-zinc-300">
          <Download size={18} color="#374151" />
        </Button>

        <Button className="h-12 flex-1 rounded-xl">
          <Camera size={18} color="#ffffff" />
          <Text className="text-xl font-semibold text-white">Dodaj zdjecie</Text>
        </Button>

        <Button variant="outline" className="h-12 w-20 rounded-xl border-zinc-300">
          <Mail size={18} color="#374151" />
        </Button>
      </View>
    </View>
  );
}
