import List from "@/features/index/components/content/List";
import Footer from "@/features/index/components/footer/Footer";
import Header from "@/features/index/components/header/Header";
import { useReportsListViewModel } from "@/features/index/hooks/useReportsListViewModel";
import { View } from "react-native";

export default function HomeScreen() {
  const { filters, options, refresh, reports, isSyncing } = useReportsListViewModel();

  return (
    <View className="flex-1">
      <Header
        searchValue={filters.search}
        onSearchChange={filters.setSearch}
        sort={filters.sort}
        status={filters.status}
        sortOptions={options.sortOptions}
        statusOptions={options.statusOptions}
        onSortChange={filters.setSort}
        onStatusChange={filters.setStatus}
        onRefresh={() => void refresh()}
        isSyncing={isSyncing}
      />
      <List reports={reports} />
      <Footer />
    </View>
  );
}
