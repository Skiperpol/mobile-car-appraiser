import { type ReportDetails } from "./types";

const defaultPhotos = [
  { id: "1", title: "Uszkodzenie karoserii po kolizji", comment: "" },
  { id: "2", title: "Deformacja maski", comment: "" },
  { id: "3", title: "Uszkodzony reflektor", comment: "" },
  { id: "4", title: "Ogolny widok uszkodzen", comment: "" },
];

export function getReportDetails(reportId?: string, reportNumber?: string): ReportDetails {
  return {
    id: reportId ?? "WYP-2024-003",
    carName: "Mercedes-Benz C-Class",
    statusLabel: "Zsynchronizowane",
    assignedOrderId: "WYP-2024-003",
    reportNumber: reportNumber?.trim() || "RAP-004/2024",
    make: "Mercedes-Benz",
    model: "C-Class",
    vin: "WDD2050421F123456",
    registrationNumber: "WX 12345",
    photos: defaultPhotos,
  };
}
