import { Model, Query } from "@nozbe/watermelondb";
import { children, date, readonly, text } from "@nozbe/watermelondb/decorators";

import type BasicDataModel from "./BasicDataModel";
import ReportAttachmentsModel from "./ReportAttachmentsModel";
import type ReportDynamicValueModel from "./ReportDynamicValueModel";

export interface IReport {
  reportState: "pending" | "synced" | "error";
  userId: string;
  orderId: string | null;
  reportNumber: string;
  imageUrl: string | null;
  imageName: string | null;
}

export default class ReportModel extends Model {
  static table = "reports";

  static associations = {
    basic_data: { type: "has_many", foreignKey: "report_id" },
    report_dynamic_values: { type: "has_many", foreignKey: "report_id" },
    report_attachments: { type: "has_many", foreignKey: "report_id" },
  } as const;

  @text("user_id") userId!: string;
  @text("order_id") orderId!: string | null;
  @text("report_number") reportNumber!: string;
  @text("image_url") imageUrl!: string | null;
  @text("image_name") imageName!: string | null;
  @text("report_state") reportState!: "pending" | "synced" | "error";

  @children("basic_data") basicData!: Query<BasicDataModel>;
  @children("report_dynamic_values")
  dynamicValues!: Query<ReportDynamicValueModel>;
  @children("report_attachments") attachments!: Query<ReportAttachmentsModel>;

  @readonly @date("created_at") createdAt!: Date;
  @readonly @date("updated_at") updatedAt!: Date;
}
