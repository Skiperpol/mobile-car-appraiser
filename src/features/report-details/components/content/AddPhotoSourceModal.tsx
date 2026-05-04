import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { Camera, Image as ImageIcon, X } from "lucide-react-native";
import { useEffect } from "react";
import { Keyboard, Modal, Pressable, View } from "react-native";
import Animated, { SlideInDown } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type AddPhotoSourceModalProps = {
  visible: boolean;
  permissionMessage: string | null;
  onClose: () => void;
  onPickFromGallery: () => void;
  onTakePhoto: () => void;
  onOpenSettings: () => void;
};

export function AddPhotoSourceModal({
  visible,
  permissionMessage,
  onClose,
  onPickFromGallery,
  onTakePhoto,
  onOpenSettings,
}: AddPhotoSourceModalProps) {
  const insets = useSafeAreaInsets();
  useEffect(() => {
    if (visible) {
      Keyboard.dismiss();
    }
  }, [visible]);

  return (
    <Modal
      transparent
      visible={visible}
      animationType="none"
      statusBarTranslucent
      navigationBarTranslucent
      presentationStyle="overFullScreen"
      onRequestClose={onClose}
    >
      <View className="flex-1">
        <Pressable className="absolute inset-0 bg-black/45" onPress={onClose} />
        <View className="flex-1 justify-end">
          <Animated.View
            entering={SlideInDown.duration(220)}
            className="rounded-t-3xl bg-white px-5 pt-5"
            style={{ paddingBottom: Math.max(insets.bottom, 16) }}
          >
            <View className="mb-5 flex-row items-center justify-between">
              <Text variant="main">Dodaj zdjecie</Text>
              <Pressable onPress={onClose} className="p-1">
                <X size={20} color="#52525b" />
              </Pressable>
            </View>

            <Text className="mb-4 text-sm text-zinc-600">Wybierz zrodlo zdjecia</Text>

            {permissionMessage ? (
              <View className="mb-4 rounded-xl border border-rose-200 bg-rose-50 p-3">
                <Text className="text-sm text-rose-700">{permissionMessage}</Text>
                <Button variant="outline" className="mt-3" onPress={onOpenSettings}>
                  <Text>Otworz ustawienia aplikacji</Text>
                </Button>
              </View>
            ) : null}

            <View className="gap-3">
              <Button variant="main" onPress={onTakePhoto}>
                <Camera size={18} color="#ffffff" />
                <Text>Aparat</Text>
              </Button>
              <Button variant="outline" onPress={onPickFromGallery}>
                <ImageIcon size={18} color="#374151" />
                <Text>Galeria</Text>
              </Button>
            </View>
          </Animated.View>
        </View>
      </View>
    </Modal>
  );
}
