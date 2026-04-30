import ReportAttachmentsModel, {
  IReportAttachments,
} from "@/database/models/ReportAttachmentsModel";
import { Database, Q } from "@nozbe/watermelondb";
import { database } from "..";

class ReportAttachmentsRepository {
  private db: Database;

  constructor(db: Database) {
    this.db = db;
  }

  private get reportAttachments() {
    return this.db.get<ReportAttachmentsModel>("report_attachments");
  }

  async getAll(): Promise<ReportAttachmentsModel[]> {
    return await this.reportAttachments.query().fetch();
  }

  async getReportAttachmentsById(
    id: string,
  ): Promise<ReportAttachmentsModel | null> {
    try {
      return await this.reportAttachments.find(id);
    } catch (error) {
      return null;
    }
  }

  async getByReportId(reportId: string): Promise<ReportAttachmentsModel[]> {
    return await this.reportAttachments
      .query(Q.where("report_id", reportId), Q.sortBy("created_at", Q.asc))
      .fetch();
  }

  async createReportAttachments(data: IReportAttachments) {
    return await this.db.write(async () => {
      return await this.reportAttachments.create((reportAttachments) => {
        reportAttachments.reportId = data.reportId;
        reportAttachments.url = data.url;
        reportAttachments.comment = data.comment;
        reportAttachments.name = data.name;
      });
    });
  }

  async updateReportAttachments(id: string, data: Partial<IReportAttachments>) {
    return await this.db.write(async () => {
      try {
        const record = await this.reportAttachments.find(id);
        await record.update((reportAttachments) => {
          if (data.url) reportAttachments.url = data.url;
          if (data.comment) reportAttachments.comment = data.comment;
          if (data.reportId) reportAttachments.reportId = data.reportId;
          if (data.name) reportAttachments.name = data.name;
        });
      } catch (e) {
        console.warn(`Record ${id} not found, skipping update`);
      }
    });
  }

  async deleteReportAttachments(id: string) {
    return await this.db.write(async () => {
      try {
        const record = await this.reportAttachments.find(id);
        await record.markAsDeleted();
      } catch (e) {}
    });
  }
}

const reportAttachmentsRepository = new ReportAttachmentsRepository(database);
export default reportAttachmentsRepository;
