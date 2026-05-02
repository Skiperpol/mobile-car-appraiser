import { SettingsAboutSection } from "@/features/settings/components/content/SettingsAboutSection";
import { SettingsGeneralSection } from "@/features/settings/components/content/SettingsGeneralSection";
import { SettingsSyncSection } from "@/features/settings/components/content/SettingsSyncSection";
import { SettingsFooter } from "@/features/settings/components/footer/Footer";
import Header from "@/features/settings/components/header/Header";
import { ScrollView, View } from "react-native";

export default function SettingsScreen() {
  return (
    <View className="flex-1 bg-zinc-100">
      <Header />
      <ScrollView
        contentContainerClassName="p-3"
        showsVerticalScrollIndicator={false}
      >
        <SettingsSyncSection />
        <SettingsGeneralSection />
        <SettingsAboutSection />
      </ScrollView>
      <SettingsFooter />
    </View>
  );
}
