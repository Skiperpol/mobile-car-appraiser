import reportRepository from "@/database/repositories/ReportRepository";
import { syncAllData } from "@/features/sync/services/sync-all-data";
import { useCallback, useEffect, useMemo, useState } from "react";
import { REPORT_LIST_SORT_OPTIONS, REPORT_LIST_STATUS_OPTIONS } from "../constants/constants";
import type { ReportListItemVM } from "../types/types";
import {
  mapReportToListItemVM,
  mapSortValueToRepository,
  mapStatusValueToRepository,
} from "../utils/report-list-mappers";
import { useReportFilters } from "./useReportFilters";

export function useReportsListViewModel() {
  const filters = useReportFilters();
  const { search, sort, status, hydrated } = filters;

  const [reports, setReports] = useState<ReportListItemVM[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const repoFilters = useMemo(
    () => ({
      search,
      sortBy: mapSortValueToRepository(sort!.value),
      status: mapStatusValueToRepository(status!.value),
    }),
    [search, sort!.value, status!.value],
  );

  const loadReports = useCallback(async () => {
    if (!hydrated) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const records = await reportRepository.queryReports(repoFilters);
      setReports(records.map(mapReportToListItemVM));
    } catch (e) {
      setError(e instanceof Error ? e : new Error("Błąd podczas ładowania raportów"));
    } finally {
      setLoading(false);
    }
  }, [repoFilters, hydrated]);

  const refresh = useCallback(async () => {
    setIsSyncing(true);
    try {
      await syncAllData();
    } catch (e) {
      setError(
        e instanceof Error ? e : new Error("Błąd podczas synchronizacji danych"),
      );
    } finally {
      setIsSyncing(false);
    }

    await loadReports();
  }, [loadReports]);

  useEffect(() => {
    void loadReports();
  }, [loadReports]);

  return useMemo(
    () => ({
      reports,
      isLoading: isLoading || !hydrated || isSyncing,
      filters,
      error,
      options: {
        sortOptions: REPORT_LIST_SORT_OPTIONS,
        statusOptions: REPORT_LIST_STATUS_OPTIONS,
      },
      refresh,
    }),
    [reports, isLoading, hydrated, isSyncing, filters, refresh, error],
  );
}
