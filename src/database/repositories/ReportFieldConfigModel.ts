import ReportFieldConfigModel, {
  IReportFieldConfig,
} from "@/database/models/ReportFieldConfigModel";
import { Database } from "@nozbe/watermelondb";
import { database } from "..";

class ReportFieldConfigRepository {
  private db: Database;

  constructor(db: Database) {
    this.db = db;
  }

  private get reportFieldConfig() {
    return this.db.get<ReportFieldConfigModel>("report_fields_config");
  }

  async getAll(): Promise<ReportFieldConfigModel[]> {
    return await this.reportFieldConfig.query().fetch();
  }

  async getReportFieldConfigById(
    id: string,
  ): Promise<ReportFieldConfigModel | null> {
    try {
      return await this.reportFieldConfig.find(id);
    } catch (error) {
      return null;
    }
  }

  async createReportFieldConfig(data: IReportFieldConfig) {
    return await this.db.write(async () => {
      return await this.reportFieldConfig.create((reportFieldConfig) => {
        reportFieldConfig.label = data.label;
        reportFieldConfig.fieldType = data.fieldType;
        reportFieldConfig.exampleValue = data.exampleValue;
      });
    });
  }

  async updateReportFieldConfig(id: string, data: Partial<IReportFieldConfig>) {
    return await this.db.write(async () => {
      try {
        const record = await this.reportFieldConfig.find(id);
        await record.update((model) => {
          if (data.label !== undefined) model.label = data.label;
          if (data.fieldType !== undefined) model.fieldType = data.fieldType;
          if (data.exampleValue !== undefined)
            model.exampleValue = data.exampleValue;
        });
      } catch (e) {
        console.warn(`Record ${id} not found, skipping update`);
      }
    });
  }

  async deleteReportFieldConfig(id: string) {
    return await this.db.write(async () => {
      try {
        const record = await this.reportFieldConfig.find(id);
        await record.markAsDeleted();
      } catch (e) {}
    });
  }
}

const reportFieldConfigRepository = new ReportFieldConfigRepository(database);
export default reportFieldConfigRepository;
