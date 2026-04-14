import { Q } from "@nozbe/watermelondb";
import { database } from "../index";
import ReportDynamicValueModel, {
    IReportDynamicValue,
} from "../models/ReportDynamicValue";

export const DynamicValuesService = {
  getDynamicValuesByReport: (reportId: string) => {
    return database
      .get<ReportDynamicValueModel>("report_dynamic_values")
      .query(Q.where("report_id", reportId))
      .observe();
  },

  addDynamicValue: async (value: IReportDynamicValue) => {
    await database.write(async () => {
      await database
        .get<ReportDynamicValueModel>("report_dynamic_values")
        .create((record) => {
          Object.assign(record, value);
        });
    });
  },

  updateDynamicValue: async (
    record: ReportDynamicValueModel,
    value: Partial<IReportDynamicValue>,
  ) => {
    await database.write(async () => {
      await record.update((record) => {
        Object.assign(record, value);
      });
    });
  },

  deleteDynamicValue: async (record: ReportDynamicValueModel) => {
    await database.write(async () => {
      await record.markAsDeleted();
    });
  },
};
