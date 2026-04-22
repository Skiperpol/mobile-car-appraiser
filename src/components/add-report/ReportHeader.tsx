import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { ArrowLeft } from "lucide-react-native";
import { View } from "react-native";
import { type ReportStep } from "./types";

function StepProgress({ step }: { step: ReportStep }) {
  return (
    <View className="my-2 flex-row gap-2 px-2">
      {[1, 2, 3].map((item) => {
        const active = item <= step;
        return (
          <View
            key={item}
            className={`h-1 flex-1 rounded-full ${active ? "bg-zinc-900" : "bg-zinc-300"}`}
          />
        );
      })}
    </View>
  );
}

export function ReportHeader({
  step,
  onBack,
}: {
  step: ReportStep;
  onBack: () => void;
}) {
  return (
    <View className="border-b border-zinc-200 bg-white px-4 pb-3 pt-4">
      <View className="flex-row items-center gap-2 h-10">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full"
          onPress={onBack}
        >
          <ArrowLeft size={18} color="#111827" />
        </Button>
        <Text className="text-2xl font-bold text-zinc-900">Nowy raport</Text>
      </View>
      <StepProgress step={step} />
    </View>
  );
}
