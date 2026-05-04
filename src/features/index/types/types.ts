import type { Option } from "@/components/ui/select";

export type ReportListItemVM = {
  id: string;
  tileColor: string;
  plate: string;
  carName: string;
  reportState: "synced" | "pending" | "error";
  date: string;
  photos: string;
};

export type ReportsFilterState = {
  search: string;
  sort: Option | null;
  status: Option | null;
};

export type ReportOption = {
  value: string;
  label: string;
};
