import type { Option } from "@/components/ui/select";

export type ReportListItemVM = {
  id: string;
  tileColor: string;
  plate: string;
  carName: string;
  completed: boolean;
  date: string;
  photos: string;
};

export type ReportsFilterState = {
  search: string;
  sort: Option | null;
  status: Option | null;
};

export type ReportDetailsVM = {
  id: string;
  carName: string;
  statusLabel: string;
  assignedOrderId: string;
  reportNumber: string;
  make: string;
  model: string;
  vin: string;
  registrationNumber: string;
  photos: Array<{
    id: string;
    title: string;
    comment: string;
    uri: string;
    name: string;
  }>;
};
