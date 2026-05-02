import { FormField } from "@/components/forms/FormField";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { X } from "lucide-react-native";
import { Modal, Pressable, StyleSheet, View } from "react-native";
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
      <View style={styles.root}>
        <Pressable style={styles.backdrop} onPress={onClose} />
        <View style={styles.sheetContainer}>
          <Animated.View
            entering={SlideInDown.duration(220)}
            style={styles.sheet}
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

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.45)",
  },
  sheetContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  sheet: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    backgroundColor: "#ffffff",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 24,
  },
});
