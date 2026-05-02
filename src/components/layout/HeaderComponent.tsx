import { cn } from "@/lib/utils";
import React from "react";
import { View } from "react-native";

export default function HeaderComponent({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <View
      className={cn(
        "border-b p-4 bg-white flex flex-col gap-4 border-zinc-200",
        className,
      )}
    >
      {children}
    </View>
  );
}
