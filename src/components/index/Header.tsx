import React from "react";
import { View } from "react-native";
import { HeaderFilters } from "./HeaderFilters";
import { HeaderSearch } from "./HeaderSearch";
import { HeaderTopBar } from "./HeaderTopBar";

export default function Header() {
  return (
    <View className="p-4 bg-white">
      <HeaderTopBar />
      <HeaderSearch />
      <HeaderFilters />
    </View>
  );
}
