import { SettingsFooter } from "@/components/settings/Footer";
import Header from "@/components/settings/Header";
import { SettingsAboutSection } from "@/components/settings/SettingsAboutSection";
import { SettingsGeneralSection } from "@/components/settings/SettingsGeneralSection";
import { SettingsSyncSection } from "@/components/settings/SettingsSyncSection";
import { ScrollView, View } from "react-native";

export default function SettingsScreen() {
  return (
    <View className="flex-1 bg-zinc-100">
      <Header />
      <ScrollView
        contentContainerClassName="p-3"
        showsVerticalScrollIndicator={false}
      >
        <SettingsGeneralSection />
        <SettingsSyncSection />
        <SettingsAboutSection />
      </ScrollView>
      <SettingsFooter />
    </View>
  );
}
