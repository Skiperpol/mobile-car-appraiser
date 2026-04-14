import { Q } from "@nozbe/watermelondb";
import { database } from "../index";
import ReportModel, { IReport } from "../models/Report";
import { AttachmentService } from "./AttachmentsService";
import { BasicDataService } from "./BasicDataService";
import { DynamicValuesService } from "./DynamicValuesService";

export type SortOption = "NEWEST" | "OLDEST" | "TITLE_ASC";

class ReportService {
  private reportsCollection = database.get<ReportModel>("reports");

  observeReports(limit: number, sortBy: SortOption, searchTerm: string = "") {
    const queryArgs: any[] = [Q.take(limit)];

    if (searchTerm.trim().length > 0) {
      const sanitizedTitle = Q.sanitizeLikeString(searchTerm.trim());
      queryArgs.push(Q.where("report_number", Q.like(`%${sanitizedTitle}%`)));
    }

    switch (sortBy) {
      case "NEWEST":
        queryArgs.push(Q.sortBy("created_at", Q.desc));
        break;
      case "OLDEST":
        queryArgs.push(Q.sortBy("created_at", Q.asc));
        break;
      case "TITLE_ASC":
        queryArgs.push(Q.sortBy("report_number", Q.asc));
        break;
    }

    return this.reportsCollection.query(...queryArgs).observe();
  }

  async createReport(data: IReport) {
    return await database.write(async () => {
      return await this.reportsCollection.create((report) => {
        Object.assign(report, data);
      });
    });
  }

  async getReportById(id: string): Promise<ReportModel | null> {
    return await this.reportsCollection.find(id);
  }

  async deleteReport(record: ReportModel) {
    await database.write(async () => {
      const attachments = await record.attachments.fetch();
      for (const attachment of attachments) {
        await AttachmentService.deleteAttachment(attachment);
      }
      const dynamicValues = await record.dynamicValues.fetch();
      for (const dynamicValue of dynamicValues) {
        await DynamicValuesService.deleteDynamicValue(dynamicValue);
      }
      const basicData = await record.basicData.fetch();
      for (const data of basicData) {
        await BasicDataService.deleteBasicData(data);
      }
      await record.markAsDeleted();
    });
  }
}
