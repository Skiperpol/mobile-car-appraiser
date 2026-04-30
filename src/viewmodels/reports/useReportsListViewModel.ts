import type { Option } from "@/components/ui/select";
import reportRepository, {
  type ReportSortBy,
  type ReportStatusFilter,
} from "@/database/repositories/ReportRepository";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { ReportListItemVM } from "./types";

type SelectOption = { value: string; label: string };

const SORT_OPTIONS: SelectOption[] = [
  { value: "date", label: "Wedlug daty" },
  { value: "name", label: "Według nazwy" },
];
const DEFAULT_SORT_OPTION: SelectOption = {
  value: "date",
  label: "Wedlug daty",
};

const STATUS_OPTIONS: SelectOption[] = [
  { value: "all", label: "Wszystkie" },
  { value: "synced", label: "Wgrane" },
  { value: "not-synced", label: "Oczekujące" },
  { value: "with-errors", label: "Z błędami" },
];
const DEFAULT_STATUS_OPTION: SelectOption = {
  value: "all",
  label: "Wszystkie",
};
const FILTERS_STORAGE_KEY = "reports.list.filters";

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("pl-PL", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

export function useReportsListViewModel() {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SelectOption>(DEFAULT_SORT_OPTION);
  const [status, setStatus] = useState<SelectOption>(DEFAULT_STATUS_OPTION);
  const [reports, setReports] = useState<ReportListItemVM[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [hydrated, setHydrated] = useState(false);

  const mapSortToRepository = (sortValue: string): ReportSortBy => {
    if (sortValue === "name") {
      return "reportNumberAsc";
    }
    return "createdAtDesc";
  };

  const mapStatusToRepository = (statusValue: string): ReportStatusFilter => {
    if (statusValue === "synced") {
      return "withPhoto";
    }
    if (statusValue === "not-synced") {
      return "withoutPhoto";
    }
    return "all";
  };

  useEffect(() => {
    const hydrateFilters = async () => {
      try {
        const stored = await AsyncStorage.getItem(FILTERS_STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored) as {
            search?: string;
            sort?: string;
            status?: string;
          };
          if (typeof parsed.search === "string") {
            setSearch(parsed.search);
          }
          const storedSort =
            SORT_OPTIONS.find((item) => item.value === parsed.sort) ??
            DEFAULT_SORT_OPTION;
          const storedStatus =
            STATUS_OPTIONS.find((item) => item.value === parsed.status) ??
            DEFAULT_STATUS_OPTION;
          setSort(storedSort);
          setStatus(storedStatus);
        }
      } catch {
        // ignore malformed persisted filters and keep defaults
      }
      setHydrated(true);
    };

    void hydrateFilters();
  }, []);

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    void AsyncStorage.setItem(
      FILTERS_STORAGE_KEY,
      JSON.stringify({
        search,
        sort: sort.value,
        status: status.value,
      }),
    );
  }, [hydrated, search, sort.value, status.value]);

  const refresh = useCallback(async () => {
    setLoading(true);
    const records = await reportRepository.queryReports({
      search,
      sortBy: mapSortToRepository(sort.value),
      status: mapStatusToRepository(status.value),
    });

    setReports(
      records.map((report) => ({
        id: report.id,
        tileColor: "bg-slate-900",
        plate: report.reportNumber || "Raport",
        carName: report.reportNumber || "Raport pojazdu",
        completed: Boolean(report.imageName),
        date: formatDate(report.createdAt),
        photos: report.imageName ? "1/1" : "0/0",
      })),
    );
    setLoading(false);
  }, [search, sort.value, status.value]);

  useEffect(() => {
    if (!hydrated) {
      return;
    }
    void refresh();
  }, [refresh, hydrated]);

  return useMemo(
    () => ({
      reports,
      isLoading,
      search,
      setSearch,
      sort,
      setSort: (next: Option | null) =>
        setSort(
          next?.value && next?.label
            ? { value: next.value, label: next.label }
            : DEFAULT_SORT_OPTION,
        ),
      status,
      setStatus: (next: Option | null) =>
        setStatus(
          next?.value && next?.label
            ? { value: next.value, label: next.label }
            : DEFAULT_STATUS_OPTION,
        ),
      sortOptions: SORT_OPTIONS as Option[],
      statusOptions: STATUS_OPTIONS as Option[],
      refresh,
    }),
    [reports, isLoading, search, sort, status, refresh],
  );
}
