import { router } from "expo-router";
import { CircleAlert, CircleCheck, Clock3, ImageIcon } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";

interface Report {
  id: string;
  tileColor: string;
  plate: string;
  carName: string;
  reportState: "synced" | "pending" | "error";
  date: string;
  photos: string;
}

function ReportStateIndicator({
  reportState,
}: {
  reportState: "synced" | "pending" | "error";
}) {
  if (reportState === "synced") {
    return <CircleCheck size={22} color="#22c55e" />;
  }

  if (reportState === "error") {
    return <CircleAlert size={22} color="#ef4444" />;
  }

  return <Clock3 size={22} color="#eab308" />;
}

export default function Item({ report }: { report: Report }) {
  return (
    <Pressable
      key={report.id}
      className="rounded-main border border-zinc-300 bg-white p-3"
      onPress={() =>
        router.push({
          pathname: "./report-details",
          params: { reportId: report.id },
        })
      }
    >
      <View className="flex-row">
        <View
          className={`mr-3 h-20 w-20 items-center justify-center rounded-md ${report.tileColor}`}
        >
          <Text className="text-center text-sm text-white">{report.plate}</Text>
        </View>

        <View className="flex-1">
          <View className="mb-1 flex-row items-start justify-between">
            <Text className="text-sm font-bold text-zinc-900">
              {report.carName}
            </Text>
            <ReportStateIndicator reportState={report.reportState} />
          </View>

          <Text className="mb-1 text-sm text-zinc-600">{report.id}</Text>
          <View className="flex-row items-center justify-between">
            <Text className="text-sm text-zinc-500">{report.date}</Text>
            <View className="flex-row items-center gap-1">
              <ImageIcon size={16} color="#6b7280" />
              <Text className="text-sm text-zinc-500">{report.photos}</Text>
            </View>
          </View>
        </View>
      </View>
    </Pressable>
  );
}
