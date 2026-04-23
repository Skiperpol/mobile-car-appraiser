import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { ScanLine, X } from "lucide-react-native";
import { Modal, Pressable, ScrollView, View } from "react-native";

function Field({ label, value }: { label: string; value: string }) {
  return (
    <View className="mb-3 rounded-xl bg-zinc-100 p-3">
      <Text className="text-sm text-zinc-500">{label}</Text>
      <Text className="mt-1 text-2xl text-zinc-900">{value}</Text>
    </View>
  );
}

export function ReportInfoModal({
  visible,
  onClose,
  data,
}: {
  visible: boolean;
  onClose: () => void;
  data: {
    assignedOrderId: string;
    reportNumber: string;
    make: string;
    model: string;
    vin: string;
    registrationNumber: string;
  };
}) {
  return (
    <Modal transparent visible={visible} animationType="fade" onRequestClose={onClose}>
      <View className="flex-1 justify-end bg-black/45">
        <View className="max-h-[80%] rounded-t-3xl bg-white">
          <View className="mb-4 mt-2 items-center">
            <View className="h-1.5 w-20 rounded-full bg-zinc-200" />
          </View>
          <View className="mb-4 flex-row items-center justify-between border-b border-zinc-200 px-4 pb-4">
            <Text className="text-4xl font-extrabold text-zinc-900">Informacje o raporcie</Text>
            <Pressable onPress={onClose}>
              <X size={22} color="#111827" />
            </Pressable>
          </View>

          <ScrollView className="px-4" showsVerticalScrollIndicator={false}>
            <Button className="mb-4 h-11 rounded-xl">
              <ScanLine size={18} color="#ffffff" />
              <Text className="text-lg font-semibold text-white">Skanuj kod Aztec</Text>
            </Button>

            <Text className="mb-2 text-base font-bold text-zinc-600">ZLECENIE</Text>
            <Field label="Przypisane zlecenie" value={data.assignedOrderId} />

            <View className="my-3 h-px bg-zinc-200" />
            <Text className="mb-2 text-base font-bold text-zinc-600">PODSTAWOWE DANE</Text>
            <Field label="Numer raportu" value={data.reportNumber} />
            <Field label="Marka" value={data.make} />
            <Field label="Model" value={data.model} />
            <Field label="VIN" value={data.vin} />
            <Field label="Numer rejestracyjny" value={data.registrationNumber} />
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}
