import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { ArrowLeft } from "lucide-react-native";
import { View } from "react-native";
import HeaderComponent from "@/components/HeaderComponent";
import { type ReportStep } from "../../types/types";

function StepProgress({ step }: { step: ReportStep }) {
  return (
    <View className="flex-row gap-2 px-2">
      {[1, 2, 3].map((item) => {
        const active = item <= step;
        return (
          <View
            key={item}
            className={`h-2 flex-1 rounded-main ${active ? "bg-zinc-900" : "bg-zinc-300"}`}
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
    <HeaderComponent>
      <View className="flex-row items-center gap-2 h-10">
        <Button variant="ghost" size="icon" onPress={onBack}>
          <ArrowLeft size={18} color="#111827" />
        </Button>
        <Text variant="main">Nowy raport</Text>
      </View>
      <StepProgress step={step} />
    </HeaderComponent>
  );
}
