import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { router } from "expo-router";
import { ArrowLeft, RefreshCcw, Trash2 } from "lucide-react-native";
import { View } from "react-native";
import HeaderComponent from "../../../../components/HeaderComponent";

export function ReportDetailsHeader({ title }: { title: string }) {
  return (
    <HeaderComponent>
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full"
            onPress={() => router.back()}
          >
            <ArrowLeft size={18} color="#111827" />
          </Button>
          <Text variant="main" className="max-w-[210px]" numberOfLines={1}>
            {title}
          </Text>
        </View>

        <View className="flex-row gap-2">
          <Button variant="outline" size="icon">
            <RefreshCcw size={16} color="#111827" />
          </Button>
          <Button variant="outline" size="icon">
            <Trash2 size={16} color="#ef4444" />
          </Button>
        </View>
      </View>
    </HeaderComponent>
  );
}
