import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { Camera, Download, Mail } from "lucide-react-native";
import { View } from "react-native";
import FooterComponent from "../../../../components/FooterComponent";

export function ReportDetailsBottomBar({
  onAddPhoto,
}: {
  onAddPhoto: () => void;
}) {
  return (
    <FooterComponent>
      <View className="flex-row items-center gap-3">
        <Button variant="outline" className="aspect-square">
          <Download size={18} color="#374151" />
        </Button>

        <Button variant="main" className="flex-1" onPress={onAddPhoto}>
          <Camera size={18} color="#ffffff" />
          <Text>Dodaj zdjecie</Text>
        </Button>

        <Button variant="outline" className="aspect-square">
          <Mail size={18} color="#374151" />
        </Button>
      </View>
    </FooterComponent>
  );
}
