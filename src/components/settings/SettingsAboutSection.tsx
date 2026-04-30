import { SettingsCard } from "@/components/settings/SettingsCard";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { seedDatabase } from "@/database/seeder";
import { useAppInfo } from "@/hooks/useAppInfo";
import { useState } from "react";
import { Alert, View } from "react-native";

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
  const [isSeeding, setSeeding] = useState(false);

  const handleSeed = async () => {
    setSeeding(true);
    try {
      const result = await seedDatabase({ clearExisting: true });
      Alert.alert("Seedowanie zakonczone", `Dodano raporty: ${result.inserted}`);
    } catch {
      Alert.alert("Blad", "Nie udalo sie zseedowac bazy danych.");
    } finally {
      setSeeding(false);
    }
  };

  return (
    <SettingsCard title="O aplikacji">
      <MetaRow label="Wersja aplikacji:" value={version} />
      <MetaRow label="Ostatnia aktualizacja:" value={lastUpdate} />
      <View className="mt-4">
        <Button variant="outline" onPress={() => void handleSeed()} disabled={isSeeding}>
          <Text>{isSeeding ? "Seedowanie..." : "Zseeduj baze testowa"}</Text>
        </Button>
      </View>
    </SettingsCard>
  );
}
