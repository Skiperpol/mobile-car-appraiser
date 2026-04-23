import { Text } from "@/components/ui/text";
import { View, type ViewProps } from "react-native";

type SettingsCardProps = ViewProps & {
  title: string;
  description?: string;
};

export function SettingsCard({
  title,
  description,
  className,
  children,
  ...props
}: SettingsCardProps) {
  return (
    <View
      className={`mb-3 rounded-xl border border-zinc-200 bg-zinc-50 p-3 ${className ?? ""}`}
      {...props}
    >
      <Text className="text-lg font-semibold text-zinc-900">{title}</Text>
      {description ? (
        <Text className="mt-0.5 text-sm text-zinc-500">{description}</Text>
      ) : null}
      {children}
    </View>
  );
}
