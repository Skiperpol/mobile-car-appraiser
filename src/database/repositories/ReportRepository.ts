import ReportModel, { IReport } from "@/database/models/ReportModel";
import { Database, Q } from "@nozbe/watermelondb";
import type { Observable } from "rxjs";
import { database } from "..";

export type ReportSortBy = "createdAtDesc" | "createdAtAsc" | "reportNumberAsc";
export type ReportStatusFilter = "all" | "synced" | "pending" | "error";

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

  async queryReports(filters: {
    search?: string;
    sortBy?: ReportSortBy;
    status?: ReportStatusFilter;
  }): Promise<ReportModel[]> {
    const clauses = [];
    const search = filters.search?.trim();
    const sortBy = filters.sortBy ?? "createdAtDesc";
    const status = filters.status ?? "all";

    if (search) {
      clauses.push(
        Q.or(
          Q.where("report_number", Q.like(`%${Q.sanitizeLikeString(search)}%`)),
          Q.where("order_id", Q.like(`%${Q.sanitizeLikeString(search)}%`)),
        ),
      );
    }

    if (status === "synced") {
      clauses.push(Q.where("report_state", "synced"));
    }

    if (status === "pending") {
      clauses.push(Q.where("report_state", "pending"));
    }

    if (status === "error") {
      clauses.push(Q.where("report_state", "error"));
    }

    if (sortBy === "createdAtAsc") {
      clauses.push(Q.sortBy("created_at", Q.asc));
    }

    if (sortBy === "reportNumberAsc") {
      clauses.push(Q.sortBy("report_number", Q.asc));
    }

    if (sortBy === "createdAtDesc") {
      clauses.push(Q.sortBy("created_at", Q.desc));
    }

    return await this.reports.query(...clauses).fetch();
  }

  queryReportsObservable(filters: {
    search?: string;
    sortBy?: ReportSortBy;
    status?: ReportStatusFilter;
  }): Observable<ReportModel[]> {
    const clauses = [];
    const search = filters.search?.trim();
    const sortBy = filters.sortBy ?? "createdAtDesc";
    const status = filters.status ?? "all";

    if (search) {
      clauses.push(
        Q.or(
          Q.where("report_number", Q.like(`%${Q.sanitizeLikeString(search)}%`)),
          Q.where("order_id", Q.like(`%${Q.sanitizeLikeString(search)}%`)),
        ),
      );
    }

    if (status === "synced") {
      clauses.push(Q.where("report_state", "synced"));
    }

    if (status === "pending") {
      clauses.push(Q.where("report_state", "pending"));
    }

    if (status === "error") {
      clauses.push(Q.where("report_state", "error"));
    }

    if (sortBy === "createdAtAsc") {
      clauses.push(Q.sortBy("created_at", Q.asc));
    }

    if (sortBy === "reportNumberAsc") {
      clauses.push(Q.sortBy("report_number", Q.asc));
    }

    if (sortBy === "createdAtDesc") {
      clauses.push(Q.sortBy("created_at", Q.desc));
    }

    return this.reports.query(...clauses).observe();
  }

  async getUnsyncedReportsCount(): Promise<number> {
    return await this.reports.query(Q.where("report_state", Q.oneOf(["pending", "error"]))).fetchCount();
  }

  async getByReportNumber(reportNumber: string): Promise<ReportModel | null> {
    const normalized = reportNumber.trim();
    if (!normalized) {
      return null;
    }

    const records = await this.reports
      .query(Q.where("report_number", normalized), Q.take(1))
      .fetch();
    return records[0] ?? null;
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
        report.reportState = data.reportState;
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
          if (data.reportState) report.reportState = data.reportState;
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
