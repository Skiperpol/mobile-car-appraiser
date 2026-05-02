import type { ReportOption } from "./types/types";

export const REPORT_LIST_SORT_OPTIONS: ReportOption[] = [
  { value: "date", label: "Wedlug daty" },
  { value: "name", label: "Według nazwy" },
];

export const DEFAULT_REPORT_LIST_SORT: ReportOption = {
  value: "date",
  label: "Wedlug daty",
};

export const REPORT_LIST_STATUS_OPTIONS: ReportOption[] = [
  { value: "all", label: "Wszystkie" },
  { value: "synced", label: "Wgrane" },
  { value: "not-synced", label: "Oczekujące" },
  { value: "with-errors", label: "Z błędami" },
];

export const DEFAULT_REPORT_LIST_STATUS: ReportOption = {
  value: "all",
  label: "Wszystkie",
};

export const FILTERS_STORAGE_KEY = "reports.list.filters";
