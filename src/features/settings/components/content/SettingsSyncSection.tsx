import { SettingsCard } from "@/features/settings/components/content/SettingsCard";
import { Text } from "@/components/ui/text";

export function SettingsSyncSection() {
  return (
    <SettingsCard title="Synchronizacja">
      <Text className="mt-3 text-sm leading-4 text-zinc-700">
        Dane sa zapisywane lokalnie i automatycznie synchronizowane z serwerem.
      </Text>
      <Text className="mt-2 text-sm leading-4 text-zinc-500">
        Status synchronizacji mozesz sprawdzic na liscie raportow i w
        szczegolach kazdego raportu.
      </Text>
    </SettingsCard>
  );
}
