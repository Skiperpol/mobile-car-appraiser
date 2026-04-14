import { database } from '../index';
import ReportAttachments from '../models/ReportAttachments';

export const AttachmentService = {
  getAttachmentsByReport: (reportId: string) => {
    return database
      .get<ReportAttachments>('report_attachments')
      .query(Q.where('report_id', reportId))
      .observe()
  },

  addAttachment: async (reportId: string, url: string, comment: string) => {
    await database.write(async () => {
      await database.get<ReportAttachments>('report_attachments').create((record) => {
        record.reportId = reportId
        record.url = url
        record.comment = comment
      })
    })
  }
}