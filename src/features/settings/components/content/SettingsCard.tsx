import { Text } from "@/components/ui/text";
import { View, type ViewProps } from "react-native";

type SettingsCardProps = ViewProps & {
  title?: string;
  description?: string;
};

export function SettingsCard({ title, description, className, children, ...props }: SettingsCardProps) {
  return (
    <View className={`mb-3 rounded-main border border-zinc-200 bg-white p-4 ${className ?? ""}`} {...props}>
      {title ? <Text className="text-lg font-semibold text-zinc-900">{title}</Text> : null}
      {description ? <Text className="mt-0.5 text-sm text-zinc-500">{description}</Text> : null}
      {children}
    </View>
  );
}
