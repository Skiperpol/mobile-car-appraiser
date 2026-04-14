import { Model, Relation } from "@nozbe/watermelondb";
import {
  date,
  field,
  readonly,
  relation,
  text,
} from "@nozbe/watermelondb/decorators";

import ReportModel from "./Report";

export interface IBasicData {
  reportId: string;
  brand: string | null;
  model: string | null;
  vin: string | null;
  registrationNumber: string | null;
  productionYear: number | null;
}

export default class BasicDataModel extends Model {
  static table = "basic_data";

  static associations = {
    reports: { type: "belongs_to", key: "report_id" },
  } as const;

  @field("report_id") reportId!: string;
  @relation("reports", "report_id") report!: Relation<ReportModel>;

  @text("brand") brand!: string | null;
  @text("model") model!: string | null;
  @text("vin") vin!: string | null;
  @text("registration_number") registrationNumber!: string | null;
  @field("production_year") productionYear!: number | null;

  @readonly @date("created_at") createdAt!: Date;
  @readonly @date("updated_at") updatedAt!: Date;
}
