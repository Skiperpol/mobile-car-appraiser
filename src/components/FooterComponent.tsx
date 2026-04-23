import { cn } from "@/lib/utils";
import { View } from "react-native";

export default function FooterComponent({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <View
      className={cn(
        "border-t border-zinc-200 bg-white p-4 flex flex-col gap-4",
        className,
      )}
    >
      {children}
    </View>
  );
}
