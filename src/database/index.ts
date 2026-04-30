import { Database } from "@nozbe/watermelondb";
import SQLiteAdapter from "@nozbe/watermelondb/adapters/sqlite";
import { Platform } from "react-native";

import BasicData from "./models/BasicDataModel";
import ReportAttachments from "./models/ReportAttachmentsModel";
import ReportDynamicValue from "./models/ReportDynamicValueModel";
import ReportFieldConfig from "./models/ReportFieldConfigModel";
import Report from "./models/ReportModel";
import schema from "./schema";

const adapter = new SQLiteAdapter({
  schema,
  jsi: Platform.OS === "ios",
  onSetUpError: (error) => {
    console.error("Error initializing database:", error);
  },
});

export const database = new Database({
  adapter,
  modelClasses: [
    Report,
    BasicData,
    ReportFieldConfig,
    ReportDynamicValue,
    ReportAttachments,
  ],
});

export { seedDatabase } from "./seeder";
