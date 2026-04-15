import { ScrollView, View } from "react-native";
import Item from "./Item";

interface Report {
  id: string;
  tileColor: string;
  plate: string;
  carName: string;
  completed: boolean;
  date: string;
  photos: string;
}

export default function List({ reports }: { reports: Report[] }) {
  return (
    <ScrollView
      className="flex-1"
      contentContainerStyle={{ paddingBottom: 28 }}
      showsVerticalScrollIndicator={false}
    >
      <View className="border-t border-zinc-200  px-4 pt-4">
        <View className="gap-4">
          {reports.map((report) => (
            <Item key={report.id} report={report} />
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
