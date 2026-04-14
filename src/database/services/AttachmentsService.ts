import { Q } from "@nozbe/watermelondb";
import { database } from "../index";
import ReportAttachmentsModel, {
  IReportAttachments,
} from "../models/ReportAttachments";

export const AttachmentService = {
  getAttachmentsByReport: (reportId: string) => {
    return database
      .get<ReportAttachmentsModel>("report_attachments")
      .query(Q.where("report_id", reportId))
      .observe();
  },

  addAttachment: async (attachment: IReportAttachments) => {
    await database.write(async () => {
      await database
        .get<ReportAttachmentsModel>("report_attachments")
        .create((record) => {
          Object.assign(record, attachment);
        });
    });
  },

  updateAttachment: async (
    record: ReportAttachmentsModel,
    attachment: Partial<IReportAttachments>,
  ) => {
    await database.write(async () => {
      await record.update((record) => {
        Object.assign(record, attachment);
      });
    });
  },

  deleteAttachment: async (attachment: ReportAttachmentsModel) => {
    await database.write(async () => {
      await attachment.markAsDeleted();
    });
  },
};
