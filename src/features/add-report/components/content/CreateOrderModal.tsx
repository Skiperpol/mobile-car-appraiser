import { FormField } from "@/components/forms/FormField";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { X } from "lucide-react-native";
import { Modal, Pressable, View } from "react-native";
import Animated, { SlideInDown } from "react-native-reanimated";

type CreateOrderModalProps = {
  visible: boolean;
  newOrderName: string;
  newOrderDescription: string;
  onClose: () => void;
  onNameChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onCreate: () => void;
};

export function CreateOrderModal({
  visible,
  newOrderName,
  newOrderDescription,
  onClose,
  onNameChange,
  onDescriptionChange,
  onCreate,
}: CreateOrderModalProps) {
  return (
    <Modal
      transparent
      visible={visible}
      animationType="none"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <View className="flex-1">
        <Pressable className="absolute inset-0 bg-black/45" onPress={onClose} />
        <View className="flex-1 justify-end">
          <Animated.View
            entering={SlideInDown.duration(220)}
            className="rounded-t-3xl bg-white px-5 pt-5 pb-6"
          >
            <View className="mb-5 flex-row items-center justify-between">
              <Text variant="main">Nowe zlecenie</Text>
              <Pressable onPress={onClose} className="p-1">
                <X size={20} color="#52525b" />
              </Pressable>
            </View>

            <FormField
              label="Nazwa zlecenia*"
              placeholder="Wypadek - ul. Glowna 123"
              value={newOrderName}
              onChangeText={onNameChange}
            />
            <FormField
              label="Opis"
              placeholder="Dodatkowy opis zlecenia"
              value={newOrderDescription}
              onChangeText={onDescriptionChange}
              multiline
            />

            <Button
              variant="main"
              onPress={onCreate}
              disabled={!newOrderName.trim()}
            >
              <Text>Utworz zlecenie</Text>
            </Button>
          </Animated.View>
        </View>
      </View>
    </Modal>
  );
}
