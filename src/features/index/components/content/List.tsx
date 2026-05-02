import { ScrollView, View } from "react-native";
import type { ReportListItemVM } from "../../hooks/types";
import Item from "./Item";

export default function List({ reports }: { reports: ReportListItemVM[] }) {
  return (
    <ScrollView
      className="flex-1"
      contentContainerStyle={{ paddingBottom: 28 }}
      showsVerticalScrollIndicator={false}
    >
      <View className="p-3">
        <View className="gap-3">
          {reports.map((report) => (
            <Item key={report.id} report={report} />
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
