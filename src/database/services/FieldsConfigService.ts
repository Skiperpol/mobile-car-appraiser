import { database } from "../index";
import ReportFieldConfigModel, {
    IReportFieldConfig,
} from "../models/ReportFieldConfig";

export const FieldsConfigService = {
  getFieldsConfig: () => {
    return database.get<ReportFieldConfigModel>("report_fields_config").query();
  },
  addFieldConfig: async (config: IReportFieldConfig) => {
    await database.write(async () => {
      await database
        .get<ReportFieldConfigModel>("report_fields_config")
        .create((record) => {
          Object.assign(record, config);
        });
    });
  },

  updateFieldConfig: async (
    record: ReportFieldConfigModel,
    config: Partial<IReportFieldConfig>,
  ) => {
    await database.write(async () => {
      await record.update((record) => {
        Object.assign(record, config);
      });
    });
  },

  deleteFieldConfig: async (record: ReportFieldConfigModel) => {
    await database.write(async () => {
      await record.markAsDeleted();
    });
  },
};
