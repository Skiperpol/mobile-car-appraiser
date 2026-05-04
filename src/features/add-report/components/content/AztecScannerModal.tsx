import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { X } from "lucide-react-native";
import { type ComponentType, useEffect, useMemo, useRef, useState } from "react";
import {
  ActivityIndicator,
  Keyboard,
  Linking,
  Modal,
  Pressable,
  View,
} from "react-native";
import Animated, { SlideInDown } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

let ExpoCameraModule:
  | null
  | {
      CameraView?: ComponentType<{
        style?: unknown;
        barcodeScannerSettings?: { barcodeTypes?: string[] };
        onBarcodeScanned?: (event: { data: string; type?: string }) => void;
      }>;
      requestCameraPermissionsAsync?: () => Promise<{
        granted: boolean;
        canAskAgain?: boolean;
      }>;
      getCameraPermissionsAsync?: () => Promise<{
        granted: boolean;
        canAskAgain?: boolean;
      }>;
    } = null;

try {
  const module = require("expo-camera") as {
    CameraView?: ComponentType<{
      style?: unknown;
      barcodeScannerSettings?: { barcodeTypes?: string[] };
      onBarcodeScanned?: (event: { data: string; type?: string }) => void;
    }>;
    requestCameraPermissionsAsync?: () => Promise<{
      granted: boolean;
      canAskAgain?: boolean;
    }>;
    getCameraPermissionsAsync?: () => Promise<{
      granted: boolean;
      canAskAgain?: boolean;
    }>;
    default?: {
      CameraView?: ComponentType<{
        style?: unknown;
        barcodeScannerSettings?: { barcodeTypes?: string[] };
        onBarcodeScanned?: (event: { data: string; type?: string }) => void;
      }>;
      requestCameraPermissionsAsync?: () => Promise<{
        granted: boolean;
        canAskAgain?: boolean;
      }>;
      getCameraPermissionsAsync?: () => Promise<{
        granted: boolean;
        canAskAgain?: boolean;
      }>;
    };
  };

  ExpoCameraModule = {
    CameraView: module.CameraView ?? module.default?.CameraView,
    requestCameraPermissionsAsync:
      module.requestCameraPermissionsAsync ??
      module.default?.requestCameraPermissionsAsync,
    getCameraPermissionsAsync:
      module.getCameraPermissionsAsync ?? module.default?.getCameraPermissionsAsync,
  };
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
  const insets = useSafeAreaInsets();
  const [isPermissionLoading, setPermissionLoading] = useState(true);
  const [isPermissionGranted, setPermissionGranted] = useState(false);
  const [canAskForPermission, setCanAskForPermission] = useState(true);
  const [permissionError, setPermissionError] = useState<string | null>(null);
  const [scanDebugInfo, setScanDebugInfo] = useState<string | null>(null);
  const lastScanAtRef = useRef(0);
  const didDispatchScanRef = useRef(false);

  useEffect(() => {
    let isMounted = true;

    const loadPermission = async () => {
      if (
        !ExpoCameraModule?.getCameraPermissionsAsync ||
        !ExpoCameraModule?.requestCameraPermissionsAsync
      ) {
        if (isMounted) {
          setPermissionLoading(false);
          setPermissionGranted(false);
          setCanAskForPermission(false);
        }
        return;
      }

      try {
        let result = await ExpoCameraModule.getCameraPermissionsAsync();

        // Ask immediately on open when not granted yet.
        if (!result.granted && (result.canAskAgain ?? true)) {
          result = await ExpoCameraModule.requestCameraPermissionsAsync();
        }

        if (isMounted) {
          setPermissionGranted(result.granted);
          setCanAskForPermission(result.canAskAgain ?? true);
          setPermissionError(null);
        }
      } catch {
        // Some devices/runtimes may fail on read even when permission exists.
        // We'll show a retry/request option instead of locking the UI.
        if (isMounted) {
          setPermissionGranted(false);
          setCanAskForPermission(true);
          setPermissionError(
            "Nie udało się odczytać uprawnień kamery. Spróbuj ponownie.",
          );
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

  useEffect(() => {
    if (visible) {
      Keyboard.dismiss();
      setScanDebugInfo(null);
      didDispatchScanRef.current = false;
    }
  }, [visible]);

  useEffect(() => {
    if (!isProcessing) {
      didDispatchScanRef.current = false;
    }
  }, [isProcessing]);

  const requestPermission = async () => {
    if (!ExpoCameraModule?.requestCameraPermissionsAsync) {
      return;
    }
    setPermissionLoading(true);
    try {
      const result = await ExpoCameraModule.requestCameraPermissionsAsync();
      setPermissionGranted(result.granted);
      setCanAskForPermission(result.canAskAgain ?? true);
      setPermissionError(null);
    } finally {
      setPermissionLoading(false);
    }
  };

  const content = useMemo(() => {
    if (!ExpoCameraModule?.CameraView) {
      return (
        <View className="min-h-80 items-center justify-start gap-3 py-3">
          <Text className="text-sm text-zinc-700">
            Skaner kodu Aztec wymaga przebudowania aplikacji natywnej po
            instalacji `expo-camera`.
          </Text>
        </View>
      );
    }

    if (isPermissionLoading) {
      return (
        <View className="min-h-80 items-center justify-center">
          <ActivityIndicator size="small" color="#111827" />
        </View>
      );
    }

    return (
      <View className="h-80 overflow-hidden rounded-main">
        <ExpoCameraModule.CameraView
          style={{ height: "100%" }}
          barcodeScannerSettings={{ barcodeTypes: ["aztec"] }}
          onBarcodeScanned={(event: { data: string; type?: string }) => {
            const now = Date.now();
            if (now - lastScanAtRef.current < 800) {
              return;
            }
            lastScanAtRef.current = now;

            const compactPreview = event.data.replace(/\s+/g, " ").slice(0, 40);
            setScanDebugInfo(
              `Wykryto kod: typ=${event.type ?? "unknown"}, dlugosc=${event.data.length}, start="${compactPreview}"`,
            );

            if (isProcessing) {
              return;
            }
            if (didDispatchScanRef.current) {
              return;
            }
            didDispatchScanRef.current = true;
            onScan(event.data);
          }}
        />

        {!isPermissionGranted ? (
          <View className="absolute left-2 right-2 top-2 rounded-xl bg-white/90 p-3">
            <Text className="text-xs text-zinc-700">
              Status dostepu do kamery jest niepewny, ale skanowanie moze dzialac.
            </Text>
            {permissionError ? (
              <Text className="mt-1 text-xs text-rose-600">{permissionError}</Text>
            ) : null}
            <View className="mt-2 flex-row gap-2">
              {canAskForPermission ? (
                <Button variant="main" className="flex-1" onPress={() => void requestPermission()}>
                  <Text>Ponow prosbe</Text>
                </Button>
              ) : (
                <Button
                  variant="outline"
                  className="flex-1"
                  onPress={() => void Linking.openSettings()}
                >
                  <Text>Ustawienia</Text>
                </Button>
              )}
            </View>
          </View>
        ) : null}
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
              <Text variant="main">Skanuj kod Aztec</Text>
              <Pressable onPress={onClose} className="p-1">
                <X size={20} color="#52525b" />
              </Pressable>
            </View>

            {content}

            {scanDebugInfo ? (
              <Text className="mt-3 text-xs text-zinc-500">{scanDebugInfo}</Text>
            ) : null}

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
