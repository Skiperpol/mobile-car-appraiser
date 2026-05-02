import type ReportModel from "@/database/models/ReportModel";
import { type ReportSortBy, type ReportStatusFilter } from "@/database/repositories/ReportRepository";
import { formatReportListDate } from "@/lib/utils";
import type { ReportListItemVM } from "../types/types";

export function mapSortValueToRepository(sortValue: string): ReportSortBy {
  if (sortValue === "name") {
    return "reportNumberAsc";
  }
  return "createdAtDesc";
}

export function mapStatusValueToRepository(statusValue: string): ReportStatusFilter {
  const statusMap: Record<string, ReportStatusFilter> = {
    synced: "synced",
    "not-synced": "pending",
    "with-errors": "error",
  };

  return statusMap[statusValue] ?? "all";
}

export function mapReportToListItemVM(report: ReportModel): ReportListItemVM {
  return {
    id: report.id,
    tileColor: "bg-slate-900",
    plate: report.reportNumber || "Raport",
    carName: report.reportNumber || "Raport pojazdu",
    completed: report.reportState === "synced",
    date: formatReportListDate(report.createdAt),
    photos: report.imageName ? "1/1" : "0/0",
  };
}
