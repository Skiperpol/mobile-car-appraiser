import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { CameraView, useCameraPermissions } from "expo-camera";
import { X } from "lucide-react-native";
import { useMemo } from "react";
import { ActivityIndicator, Modal, Pressable, View } from "react-native";
import Animated, { SlideInDown } from "react-native-reanimated";

type AztecScannerModalProps = {
  visible: boolean;
  isProcessing: boolean;
  onClose: () => void;
  onScan: (value: string) => void;
};

export function AztecScannerModal({
  visible,
  isProcessing,
  onClose,
  onScan,
}: AztecScannerModalProps) {
  const [permission, requestPermission] = useCameraPermissions();

  const isPermissionGranted = permission?.granted ?? false;
  const canAskForPermission = permission?.canAskAgain ?? true;

  const content = useMemo(() => {
    if (!permission) {
      return (
        <View className="items-center justify-center py-8">
          <ActivityIndicator size="small" color="#111827" />
        </View>
      );
    }

    if (!isPermissionGranted) {
      return (
        <View className="gap-4 py-3">
          <Text className="text-sm text-zinc-700">
            Aby zeskanować kod Aztec, aplikacja potrzebuje dostępu do kamery.
          </Text>
          {canAskForPermission ? (
            <Button variant="main" onPress={() => void requestPermission()}>
              <Text>Zezwól na dostęp do kamery</Text>
            </Button>
          ) : null}
        </View>
      );
    }

    return (
      <View className="overflow-hidden rounded-main">
        <CameraView
          style={{ height: 320 }}
          barcodeScannerSettings={{ barcodeTypes: ["aztec"] }}
          onBarcodeScanned={(event) => {
            if (isProcessing) {
              return;
            }
            onScan(event.data);
          }}
        />
      </View>
    );
  }, [
    permission,
    isPermissionGranted,
    canAskForPermission,
    requestPermission,
    onScan,
    isProcessing,
  ]);

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
              <Text variant="main">Skanuj kod Aztec</Text>
              <Pressable onPress={onClose} className="p-1">
                <X size={20} color="#52525b" />
              </Pressable>
            </View>

            {content}

            {isProcessing ? (
              <View className="mt-4 flex-row items-center gap-2">
                <ActivityIndicator size="small" color="#111827" />
                <Text className="text-sm text-zinc-700">Dekodowanie danych...</Text>
              </View>
            ) : null}
          </Animated.View>
        </View>
      </View>
    </Modal>
  );
}
