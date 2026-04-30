import { router } from "expo-router";
import { RefreshCw, Settings } from "lucide-react-native";
import React from "react";
import { View } from "react-native";
import { Button } from "../ui/button";
import { Text } from "../ui/text";

export function HeaderTopBar({ onRefresh }: { onRefresh?: () => void }) {
  return (
    <View className="flex-row items-center justify-between">
      <Text variant="main">Raporty</Text>
      <View className="flex-row gap-2">
        <Button variant="outline" size="icon" onPress={onRefresh}>
          <RefreshCw size={18} color="#374151" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onPress={() => router.push("/settings")}
        >
          <Settings size={18} color="#374151" />
        </Button>
      </View>
    </View>
  );
}
