import { View } from "react-native";

export default function FooterComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <View className="border-t border-zinc-200 bg-white p-4">{children}</View>
  );
}
