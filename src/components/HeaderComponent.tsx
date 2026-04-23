import React from "react";
import { View } from "react-native";

export default function HeaderComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  return <View className="p-4 bg-white flex flex-col gap-4">{children}</View>;
}
