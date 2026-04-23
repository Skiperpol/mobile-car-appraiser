import { View } from "react-native";

export default function FooterComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <View className="border-t border-zinc-200 bg-white p-4 flex flex-col gap-4">
      {children}
    </View>
  );
}
