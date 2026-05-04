import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { X } from "lucide-react-native";
import { type ComponentType, useEffect, useMemo, useState } from "react";
import { ActivityIndicator, Modal, Pressable, View } from "react-native";
import Animated, { SlideInDown } from "react-native-reanimated";

let ExpoCameraModule:
  | null
  | {
      CameraView: ComponentType<{
        style?: unknown;
        barcodeScannerSettings?: { barcodeTypes?: string[] };
        onBarcodeScanned?: (event: { data: string }) => void;
      }>;
      requestCameraPermissionsAsync?: () => Promise<{ granted: boolean }>;
      getCameraPermissionsAsync?: () => Promise<{
        granted: boolean;
        canAskAgain?: boolean;
      }>;
    } = null;

try {
  ExpoCameraModule = require("expo-camera");
} catch {
  ExpoCameraModule = null;
}

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
  const [isPermissionLoading, setPermissionLoading] = useState(true);
  const [isPermissionGranted, setPermissionGranted] = useState(false);
  const [canAskForPermission, setCanAskForPermission] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadPermission = async () => {
      if (!ExpoCameraModule?.getCameraPermissionsAsync) {
        if (isMounted) {
          setPermissionLoading(false);
          setPermissionGranted(false);
          setCanAskForPermission(false);
        }
        return;
      }

      try {
        const result = await ExpoCameraModule.getCameraPermissionsAsync();
        if (isMounted) {
          setPermissionGranted(result.granted);
          setCanAskForPermission(result.canAskAgain ?? true);
        }
      } finally {
        if (isMounted) {
          setPermissionLoading(false);
        }
      }
    };

    if (visible) {
      setPermissionLoading(true);
      void loadPermission();
    }

    return () => {
      isMounted = false;
    };
  }, [visible]);

  const requestPermission = async () => {
    if (!ExpoCameraModule?.requestCameraPermissionsAsync) {
      return;
    }
    setPermissionLoading(true);
    try {
      const result = await ExpoCameraModule.requestCameraPermissionsAsync();
      setPermissionGranted(result.granted);
      setCanAskForPermission(true);
    } finally {
      setPermissionLoading(false);
    }
  };

  const content = useMemo(() => {
    if (!ExpoCameraModule?.CameraView) {
      return (
        <View className="gap-3 py-3">
          <Text className="text-sm text-zinc-700">
            Skaner kodu Aztec wymaga przebudowania aplikacji natywnej po
            instalacji `expo-camera`.
          </Text>
        </View>
      );
    }

    if (isPermissionLoading) {
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
        <ExpoCameraModule.CameraView
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
    isPermissionLoading,
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
