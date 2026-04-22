import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { Plus, ScanLine } from "lucide-react-native";
import { View } from "react-native";
import { type ReportStep } from "./types";

type ReportBottomActionsProps = {
  step: ReportStep;
  onOpenCreateOrder: () => void;
  onBackStep: () => void;
  onNext: () => void;
};

export function ReportBottomActions({
  step,
  onOpenCreateOrder,
  onBackStep,
  onNext,
}: ReportBottomActionsProps) {
  return (
    <View className="border-t border-zinc-200 bg-white px-4 py-4">
      {step === 1 ? (
        <>
          <Button
            variant="outline"
            className="mb-3 h-12 border-zinc-300"
            onPress={onOpenCreateOrder}
          >
            <Plus size={18} color="#374151" />
            <Text className="text-xl text-black">Utworz nowe zlecenie</Text>
          </Button>
          <Button className="h-12" onPress={onNext}>
            <Text className="text-lg font-semibold text-white">Dalej</Text>
          </Button>
        </>
      ) : null}

      {step === 2 ? (
        <>
          <Button variant="outline" className="mb-3 h-12 border-zinc-300">
            <ScanLine size={18} color="#374151" />
            <Text className="text-lg font-semibold text-zinc-700">
              Skanuj kod Aztec
            </Text>
          </Button>
          <View className="flex-row gap-3">
            <Button
              variant="outline"
              className="h-12 flex-1 border-zinc-300"
              onPress={onBackStep}
            >
              <Text className="text-lg font-semibold text-zinc-700">
                Wstecz
              </Text>
            </Button>
            <Button className="h-12 flex-1" onPress={onNext}>
              <Text className="text-lg font-semibold text-white">Dalej</Text>
            </Button>
          </View>
        </>
      ) : null}

      {step === 3 ? (
        <View className="flex-row gap-3">
          <Button
            variant="outline"
            className="h-12 flex-1 border-zinc-300"
            onPress={onBackStep}
          >
            <Text className="text-lg font-semibold text-zinc-700">Wstecz</Text>
          </Button>
          <Button className="h-12 flex-1" onPress={onNext}>
            <Text className="text-lg font-semibold text-white">
              Utworz raport
            </Text>
          </Button>
        </View>
      ) : null}
    </View>
  );
}
