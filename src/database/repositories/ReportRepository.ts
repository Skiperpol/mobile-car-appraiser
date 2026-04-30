import ReportModel, { IReport } from "@/database/models/ReportModel";
import { Database } from "@nozbe/watermelondb";
import { database } from "..";

class ReportRepository {
  private db: Database;

  constructor(db: Database) {
    this.db = db;
  }

  private get reports() {
    return this.db.get<ReportModel>("reports");
  }

  async getAll(): Promise<ReportModel[]> {
    return await this.reports.query().fetch();
  }

  async getReportById(id: string): Promise<ReportModel | null> {
    try {
      return await this.reports.find(id);
    } catch (error) {
      return null;
    }
  }

  async createReport(data: IReport) {
    return await this.db.write(async () => {
      return await this.reports.create((report) => {
        report.userId = data.userId;
        report.orderId = data.orderId;
        report.reportNumber = data.reportNumber;
        report.imageUrl = data.imageUrl;
        report.imageName = data.imageName;
      });
    });
  }

  async updateReport(id: string, data: Partial<IReport>) {
    return await this.db.write(async () => {
      try {
        const report = await this.reports.find(id);
        await report.update((report) => {
          if (data.userId) report.userId = data.userId;
          if (data.reportNumber) report.reportNumber = data.reportNumber;
          if (data.orderId !== undefined) report.orderId = data.orderId;
          if (data.imageUrl) report.imageUrl = data.imageUrl;
          if (data.imageName) report.imageName = data.imageName;
        });
      } catch (e) {
        console.warn(`Record ${id} not found, skipping update`);
      }
    });
  }

  async deleteReport(id: string) {
    return await this.db.write(async () => {
      try {
        const record = await this.reports.find(id);
        await record.markAsDeleted();
      } catch (e) {}
    });
  }
}

const reportRepository = new ReportRepository(database);
export default reportRepository;
