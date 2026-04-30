import Footer from "@/components/index/Footer";
import Header from "@/components/index/Header";
import List from "@/components/index/List";
import { useReportsListViewModel } from "@/viewmodels/reports/useReportsListViewModel";
import { View } from "react-native";

export default function HomeScreen() {
  const vm = useReportsListViewModel();

  return (
    <View className="flex-1">
      <Header
        searchValue={vm.search}
        onSearchChange={vm.setSearch}
        sort={vm.sort}
        status={vm.status}
        sortOptions={vm.sortOptions}
        statusOptions={vm.statusOptions}
        onSortChange={vm.setSort}
        onStatusChange={vm.setStatus}
        onRefresh={() => void vm.refresh()}
      />
      <List reports={vm.reports} />
      <Footer />
    </View>
  );
}
