import { Search } from "lucide-react-native";
import React from "react";
import { View } from "react-native";
import { Input } from "../ui/input";

export function HeaderSearch() {
  return (
    <View className="mb-3 relative justify-center">
      <View className="absolute left-3 z-10">
        <Search size={18} className="text-foreground" />
      </View>
      <Input
        placeholder="Szukaj raportów..."
        className="h-12 pl-10 placeholder:text-foreground"
      />
    </View>
  );
}
