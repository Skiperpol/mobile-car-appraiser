import { Q } from '@nozbe/watermelondb';
import { database } from '../index';
import Report from '../models/Report';

export type SortOption = 'NEWEST' | 'OLDEST' | 'TITLE_ASC';

class ReportService {
  private reportsCollection = database.get<Report>('reports');

  observeReports(limit: number, sortBy: SortOption, searchTerm: string = '') {
    const queryArgs: any[] = [Q.take(limit)];
  
    if (searchTerm.trim().length > 0) {
      const sanitizedTitle = Q.sanitizeLikeString(searchTerm.trim());
      queryArgs.push(
        Q.where('reportNumber', Q.like(`%${sanitizedTitle}%`))
      );
    }
  
    switch (sortBy) {
      case 'NEWEST':
        queryArgs.push(Q.sortBy('created_at', Q.desc));
        break;
      case 'OLDEST':
        queryArgs.push(Q.sortBy('created_at', Q.asc));
        break;
      case 'TITLE_ASC':
        queryArgs.push(Q.sortBy('title', Q.asc));
        break;
    }
  
    return this.reportsCollection.query(...queryArgs).observe();
  }

  async createReport(reportNumber: string, userId: string, orderId: string | null) {
    return await database.write(async () => {
      return await this.reportsCollection.create((report) => {
        report.reportNumber = reportNumber;
        report.userId = userId;
        report.orderId = orderId;
      });
    });
  }

  async getReportById(id: string) {
    try {
      return await this.reportsCollection.find(id);
    } catch (error) {
      console.error("Report not found:", error);
      return null;
    }
  }

  async deleteReport(report: Report) {
    await database.write(async () => {
      await report.markAsDeleted();
    });
  }

}

export default new ReportService();