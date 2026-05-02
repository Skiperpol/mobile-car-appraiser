import { Text } from "@/components/ui/text";
import { CircleAlert, ChevronRight } from "lucide-react-native";
import { Pressable, View } from "react-native";

export function ReportInfoCard({ onPress }: { onPress: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      className="mb-4 mt-4 flex-row items-center justify-between rounded-2xl border border-zinc-200 bg-white p-4"
    >
      <View className="flex-row items-center">
        <View className="mr-3 h-12 w-12 items-center justify-center rounded-xl bg-indigo-50">
          <CircleAlert size={18} color="#4f46e5" />
        </View>
        <View>
          <Text className="text-lg font-semibold text-zinc-900">Informacje o raporcie</Text>
          <Text className="text-base text-zinc-500">Szczegoly techniczne i dane</Text>
        </View>
      </View>
      <ChevronRight size={18} color="#6b7280" />
    </Pressable>
  );
}
