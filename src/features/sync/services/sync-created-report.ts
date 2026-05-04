import reportRepository from "@/database/repositories/ReportRepository";
import { apiClient } from "@/lib/axios-client";

type NewReportSyncPayload = {
  localReportId: string;
  reportNumber: string;
  vehicle: {
    make?: string;
    model?: string;
    vin?: string;
    registrationNumber?: string;
    productionYear?: string;
  };
};

type CreatedReportResponse = {
  id: number;
};

export async function syncCreatedReportToBackend(
  payload: NewReportSyncPayload,
): Promise<void> {
  const { localReportId, reportNumber, vehicle } = payload;

  try {
    const { data: created } = await apiClient.post<CreatedReportResponse>(
      "/api/reports",
      {
        reportNumber,
      },
    );

    await apiClient.put(`/api/reports/${created.id}/aggregate`, {
      report: {
        reportNumber,
      },
      basicData: {
        brand: vehicle.make?.trim() || null,
        model: vehicle.model?.trim() || null,
        vin: vehicle.vin?.trim() || null,
        registrationNumber: vehicle.registrationNumber?.trim() || null,
        productionYear: vehicle.productionYear
          ? Number.isFinite(Number(vehicle.productionYear))
            ? Number(vehicle.productionYear)
            : null
          : null,
      },
      attachments: [],
      dynamicValues: [],
    });

    await reportRepository.updateReport(localReportId, {
      reportState: "synced",
    });
  } catch {
    await reportRepository.updateReport(localReportId, {
      reportState: "error",
    });
  }
}
