import { Model, Query } from "@nozbe/watermelondb";
import { children, date, readonly, text } from "@nozbe/watermelondb/decorators";

import type ReportDynamicValueModel from "./ReportDynamicValueModel";

export interface IReportFieldConfig {
  label: string;
  fieldType: string;
  exampleValue: string | null;
}

export default class ReportFieldConfigModel extends Model {
  static table = "report_fields_config";

  static associations = {
    report_dynamic_values: { type: "has_many", foreignKey: "field_id" },
  } as const;

  @text("label") label!: string;
  @text("field_type") fieldType!: string;
  @text("example_value") exampleValue!: string | null;

  @children("report_dynamic_values")
  dynamicValues!: Query<ReportDynamicValueModel>;

  @readonly @date("created_at") createdAt!: Date;
  @readonly @date("updated_at") updatedAt!: Date;
}
