import Footer from "@/components/index/Footer";
import Header from "@/components/index/Header";
import List from "@/components/index/List";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const reports = [
  {
    id: "WYP-2024-003",
    carName: "Mercedes-Benz C-Class",
    date: "23.03.2024, 16:45",
    photos: "4/4",
    completed: true,
    plate: "Mercedes C-Class",
    tileColor: "bg-slate-900",
  },
  {
    id: "WYP-2024-002",
    carName: "Audi A4",
    date: "22.03.2024, 09:00",
    photos: "0/1",
    completed: false,
    plate: "Audi A4",
    tileColor: "bg-slate-700",
  },
  {
    id: "WYP-2024-004",
    carName: "Volvo XC60",
    date: "21.03.2024, 14:15",
    photos: "0/3",
    completed: false,
    plate: "Volvo XC60",
    tileColor: "bg-slate-500",
  },
  {
    id: "WYP-2024-005",
    carName: "BMW X5",
    date: "20.03.2024, 10:30",
    photos: "2/2",
    completed: true,
    plate: "BMW X5",
    tileColor: "bg-slate-600",
  },
];

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-zinc-100">
      <View className="flex-1">
        <Header />
        <List reports={reports} />
        <Footer />
      </View>
    </SafeAreaView>
  );
}
