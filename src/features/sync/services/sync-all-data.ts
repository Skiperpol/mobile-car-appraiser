import { database } from "@/database";
import basicDataRepository from "@/database/repositories/BasicDataRepository";
import reportAttachmentsRepository from "@/database/repositories/ReportAttachmentsModel";
import reportDynamicValueRepository from "@/database/repositories/ReportDynamicValueModel";
import reportFieldConfigRepository from "@/database/repositories/ReportFieldConfigModel";
import reportRepository from "@/database/repositories/ReportRepository";
import { apiClient } from "@/lib/axios-client";

type SyncRecordChanges<T> = {
  created: T[];
  updated: T[];
  deleted: number[];
};

type PulledReport = {
  id: number;
  reportNumber?: string | null;
  userId?: number | null;
  orderId?: number | null;
};

type PulledBasicData = {
  reportId?: number | null;
  brand?: string | null;
  model?: string | null;
  vin?: string | null;
  registrationNumber?: string | null;
  productionYear?: number | null;
};

type PulledDynamicValue = {
  reportId?: number | null;
  fieldId?: number | null;
  value?: string | null;
};

type PulledAttachment = {
  reportId?: number | null;
  url?: string | null;
  comment?: string | null;
  name?: string | null;
};

type PulledFieldConfig = {
  label?: string | null;
  fieldType?: string | null;
  exampleValue?: string | null;
};

type ReportsPullResponse = {
  changes: {
    reports: SyncRecordChanges<PulledReport>;
    basicData: SyncRecordChanges<PulledBasicData>;
    reportDynamicValues: SyncRecordChanges<PulledDynamicValue>;
    reportAttachments: SyncRecordChanges<PulledAttachment>;
    reportFieldsConfig: SyncRecordChanges<PulledFieldConfig>;
  };
  timestamp: number;
};

function mergeChanges<T>(changes: SyncRecordChanges<T>): T[] {
  return [...changes.created, ...changes.updated];
}

export async function syncAllData(): Promise<void> {
  const { data } = await apiClient.get<ReportsPullResponse>("/api/reports/sync/pull");

  await database.write(async () => {
    await database.unsafeResetDatabase();
  });

  const reportIdMap = new Map<number, string>();
  const reports = mergeChanges(data.changes.reports);

  for (const report of reports) {
    if (report.id == null) {
      continue;
    }

    const created = await reportRepository.createReport({
      reportState: "synced",
      userId: report.userId != null ? String(report.userId) : "remote-user",
      orderId: report.orderId != null ? String(report.orderId) : null,
      reportNumber: report.reportNumber?.trim() || `RAPORT-${report.id}`,
      imageUrl: null,
      imageName: null,
    });

    reportIdMap.set(report.id, created.id);
  }

  const basicData = mergeChanges(data.changes.basicData);
  for (const row of basicData) {
    if (row.reportId == null) {
      continue;
    }
    const localReportId = reportIdMap.get(row.reportId);
    if (!localReportId) {
      continue;
    }

    await basicDataRepository.createBasicData({
      reportId: localReportId,
      brand: row.brand ?? null,
      model: row.model ?? null,
      vin: row.vin ?? null,
      registrationNumber: row.registrationNumber ?? null,
      productionYear: row.productionYear ?? null,
    });
  }

  const reportDynamicValues = mergeChanges(data.changes.reportDynamicValues);
  for (const row of reportDynamicValues) {
    if (row.reportId == null || row.fieldId == null || row.value == null) {
      continue;
    }
    const localReportId = reportIdMap.get(row.reportId);
    if (!localReportId) {
      continue;
    }

    await reportDynamicValueRepository.createReportDynamicValue({
      reportId: localReportId,
      fieldId: String(row.fieldId),
      value: String(row.value),
    });
  }

  const reportAttachments = mergeChanges(data.changes.reportAttachments);
  for (const row of reportAttachments) {
    if (row.reportId == null || !row.url) {
      continue;
    }
    const localReportId = reportIdMap.get(row.reportId);
    if (!localReportId) {
      continue;
    }

    await reportAttachmentsRepository.createReportAttachments({
      reportId: localReportId,
      url: row.url,
      comment: row.comment ?? null,
      name: row.name ?? "attachment",
    });
  }

  const reportFieldsConfig = mergeChanges(data.changes.reportFieldsConfig);
  for (const row of reportFieldsConfig) {
    if (!row.label || !row.fieldType) {
      continue;
    }
    await reportFieldConfigRepository.createReportFieldConfig({
      label: row.label,
      fieldType: row.fieldType,
      exampleValue: row.exampleValue ?? null,
    });
  }
}
