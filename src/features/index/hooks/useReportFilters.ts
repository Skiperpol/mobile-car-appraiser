import type { Option } from "@/components/ui/select";
import { storage } from "@/lib/mmkv-storage";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  DEFAULT_REPORT_LIST_SORT,
  DEFAULT_REPORT_LIST_STATUS,
  FILTERS_STORAGE_KEY,
  REPORT_LIST_SORT_OPTIONS,
  REPORT_LIST_STATUS_OPTIONS,
} from "../constants/constants";
import type { ReportOption } from "../types/types";

export function useReportFilters() {
  const [search, setSearchState] = useState("");
  const [sort, setSort] = useState<ReportOption>(DEFAULT_REPORT_LIST_SORT);
  const [status, setStatus] = useState<ReportOption>(DEFAULT_REPORT_LIST_STATUS);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = storage.getString(FILTERS_STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed.search) setSearchState(parsed.search);

        const foundSort = REPORT_LIST_SORT_OPTIONS.find((o) => o.value === parsed.sort);
        if (foundSort) setSort(foundSort);

        const foundStatus = REPORT_LIST_STATUS_OPTIONS.find((o) => o.value === parsed.status);
        if (foundStatus) setStatus(foundStatus);
      } catch (e) {
        console.warn("Failed to parse filters", e);
      }
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) {
      return;
    }
    storage.set(
      FILTERS_STORAGE_KEY,
      JSON.stringify({
        search,
        sort: sort.value,
        status: status.value,
      }),
    );
  }, [hydrated, search, sort.value, status.value]);

  const setSearch = useCallback((val: string) => setSearchState(val), []);

  const setSortFromOption = useCallback((next: Option | null) => {
    setSort(next ? { value: next.value, label: next.label } : DEFAULT_REPORT_LIST_SORT);
  }, []);

  const setStatusFromOption = useCallback((next: Option | null) => {
    setStatus(next ? { value: next.value, label: next.label } : DEFAULT_REPORT_LIST_STATUS);
  }, []);

  return useMemo(
    () => ({
      search,
      setSearch,
      sort,
      setSort: setSortFromOption,
      status,
      setStatus: setStatusFromOption,
      hydrated,
    }),
    [search, setSearch, sort, setSortFromOption, status, setStatusFromOption, hydrated],
  );
}
