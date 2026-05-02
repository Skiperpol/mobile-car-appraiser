import Footer from "@/features/index/components/footer/Footer";
import List from "@/features/index/components/content/List";
import Header from "@/features/index/components/header/Header";
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
