import { Q } from "@nozbe/watermelondb";
import { database } from "../index";
import BasicDataModel, { IBasicData } from "../models/BasicData";

export const BasicDataService = {
  getBasicDataByReport: (reportId: string) => {
    return database
      .get<BasicDataModel>("basic_data")
      .query(Q.where("report_id", reportId))
      .observe();
  },

  addBasicData: async (data: IBasicData) => {
    await database.write(async () => {
      await database.get<BasicDataModel>("basic_data").create((record) => {
        Object.assign(record, data);
      });
    });
  },

  updateBasicData: async (
    record: BasicDataModel,
    data: Partial<IBasicData>,
  ) => {
    await database.write(async () => {
      await record.update((r) => {
        Object.assign(r, data);
      });
    });
  },

  deleteBasicData: async (record: BasicDataModel) => {
    await database.write(async () => {
      await record.markAsDeleted();
    });
  },
};
