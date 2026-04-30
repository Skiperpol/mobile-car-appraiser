import { Model, Relation } from "@nozbe/watermelondb";
import {
  date,
  field,
  readonly,
  relation,
  text,
} from "@nozbe/watermelondb/decorators";

import ReportModel from "./ReportModel";

export interface IReportAttachments {
  reportId: string;
  url: string;
  comment: string | null;
  name: string;
}

export default class ReportAttachmentsModel extends Model {
  static table = "report_attachments";

  static associations = {
    reports: { type: "belongs_to", key: "report_id" },
  } as const;

  @field("report_id") reportId!: string;
  @relation("reports", "report_id") report!: Relation<ReportModel>;

  @text("url") url!: string;
  @text("comment") comment!: string | null;
  @text("name") name!: string;

  @readonly @date("created_at") createdAt!: Date;
  @readonly @date("updated_at") updatedAt!: Date;
}
