import { SettingsCard } from "@/components/settings/SettingsCard";
import { Text } from "@/components/ui/text";

export function SettingsSyncSection() {
  return (
    <SettingsCard
      title="Synchronizacja"
      description="Zarzadzaj synchronizacja danych"
    >
      <Text className="mt-3 text-sm leading-4 text-zinc-600">
        Dane sa zapisywane lokalnie i automatycznie synchronizowane z serwerem.
      </Text>
      <Text className="mt-2 text-sm leading-4 text-zinc-600">
        Status synchronizacji mozesz sprawdzic na liscie raportow i w
        szczegolach kazdego raportu.
      </Text>
    </SettingsCard>
  );
}
