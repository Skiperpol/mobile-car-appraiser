import { SettingsCard } from "@/components/settings/SettingsCard";
import { Text } from "@/components/ui/text";
import { useAppInfo } from "@/hooks/useAppInfo";
import { View } from "react-native";

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <View className="mt-2 flex-row items-center justify-between">
      <Text className="text-sm text-zinc-500">{label}</Text>
      <Text className="text-sm font-medium text-zinc-800">{value}</Text>
    </View>
  );
}

export function SettingsAboutSection() {
  const { version, lastUpdate } = useAppInfo();

  return (
    <SettingsCard title="O aplikacji">
      <MetaRow label="Wersja aplikacji" value={version} />
      <MetaRow label="Ostatnia aktualizacja" value={lastUpdate} />
    </SettingsCard>
  );
}
