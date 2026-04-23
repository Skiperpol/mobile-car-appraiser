import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { Plus, ScanLine } from "lucide-react-native";
import { View } from "react-native";
import FooterComponent from "../FooterComponent";
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
    <FooterComponent>
      {step === 1 ? (
        <>
          <Button variant="outline" onPress={onOpenCreateOrder}>
            <Plus size={18} color="#374151" />
            <Text>Utworz nowe zlecenie</Text>
          </Button>
          <Button variant="main" onPress={onNext}>
            <Text>Dalej</Text>
          </Button>
        </>
      ) : null}

      {step === 2 ? (
        <>
          <Button variant="outline">
            <ScanLine size={18} color="#374151" />
            <Text>Skanuj kod Aztec</Text>
          </Button>
          <View className="flex-row gap-3 w-full">
            <Button className="flex-1" variant="outline" onPress={onBackStep}>
              <Text>Wstecz</Text>
            </Button>
            <Button className="flex-1" variant="main" onPress={onNext}>
              <Text>Dalej</Text>
            </Button>
          </View>
        </>
      ) : null}

      {step === 3 ? (
        <View className="flex-row gap-3 w-full">
          <Button className="flex-1" variant="outline" onPress={onBackStep}>
            <Text>Wstecz</Text>
          </Button>
          <Button className="flex-1" variant="main" onPress={onNext}>
            <Text>Utworz raport</Text>
          </Button>
        </View>
      ) : null}
    </FooterComponent>
  );
}
