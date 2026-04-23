import { router } from "expo-router";
import { RefreshCw, Settings } from "lucide-react-native";
import React from "react";
import { View } from "react-native";
import { Button } from "../ui/button";
import { Text } from "../ui/text";

export function HeaderTopBar() {
  return (
    <View className="flex-row items-center justify-between">
      <Text className="text-2xl font-extrabold text-zinc-900">Raporty</Text>
      <View className="flex-row gap-2">
        <Button variant="outline" size="icon">
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
