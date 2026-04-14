import ReportDynamicValueModel, {
    IReportDynamicValue,
} from "@/src/database/models/ReportDynamicValueModel";
import { Database } from "@nozbe/watermelondb";

class ReportDynamicValueRepository {
  private db: Database;

  constructor(db: Database) {
    this.db = db;
  }

  private get reportDynamicValues() {
    return this.db.get<ReportDynamicValueModel>("report_dynamic_values");
  }

  async getAll(): Promise<ReportDynamicValueModel[]> {
    return await this.reportDynamicValues.query().fetch();
  }

  async getReportDynamicValueById(
    id: string,
  ): Promise<ReportDynamicValueModel | null> {
    try {
      return await this.reportDynamicValues.find(id);
    } catch (error) {
      return null;
    }
  }

  async createReportDynamicValue(data: IReportDynamicValue) {
    return await this.db.write(async () => {
      return await this.reportDynamicValues.create((reportDynamicValue) => {
        reportDynamicValue.reportId = data.reportId;
        reportDynamicValue.fieldId = data.fieldId;
        reportDynamicValue.value = data.value;
      });
    });
  }

  async updateReportDynamicValue(
    id: string,
    data: Partial<IReportDynamicValue>,
  ) {
    return await this.db.write(async () => {
      try {
        const record = await this.reportDynamicValues.find(id);
        await record.update((reportDynamicValue) => {
          if (data.value) reportDynamicValue.value = data.value;
          if (data.fieldId) reportDynamicValue.fieldId = data.fieldId;
          if (data.reportId) reportDynamicValue.reportId = data.reportId;
        });
      } catch (e) {
        console.warn(`Record ${id} not found, skipping update`);
      }
    });
  }

  async deleteReportDynamicValue(id: string) {
    return await this.db.write(async () => {
      try {
        const record = await this.reportDynamicValues.find(id);
        await record.markAsDeleted();
      } catch (e) {}
    });
  }
}

export default ReportDynamicValueRepository;
