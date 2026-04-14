import BasicDataModel, {
  IBasicData,
} from "@/src/database/models/BasicDataModel";
import { Database } from "@nozbe/watermelondb";
import { database } from "..";

class BasicDataRepository {
  private db: Database;

  constructor(db: Database) {
    this.db = db;
  }

  private get basicData() {
    return this.db.get<BasicDataModel>("basic_data");
  }

  async getAll(): Promise<BasicDataModel[]> {
    return await this.basicData.query().fetch();
  }

  async getBasicDataById(id: string): Promise<BasicDataModel | null> {
    try {
      return await this.basicData.find(id);
    } catch (error) {
      return null;
    }
  }

  async createBasicData(data: IBasicData) {
    return await this.db.write(async () => {
      return await this.basicData.create((basicData) => {
        basicData.reportId = data.reportId;
        basicData.brand = data.brand;
        basicData.model = data.model;
        basicData.vin = data.vin;
        basicData.registrationNumber = data.registrationNumber;
        basicData.productionYear = data.productionYear;
      });
    });
  }

  async updateBasicData(id: string, data: Partial<IBasicData>) {
    return await this.db.write(async () => {
      try {
        const record = await this.basicData.find(id);
        await record.update((basicData) => {
          if (data.brand) basicData.brand = data.brand;
          if (data.model) basicData.model = data.model;
          if (data.vin) basicData.vin = data.vin;
          if (data.registrationNumber)
            basicData.registrationNumber = data.registrationNumber;
          if (data.productionYear)
            basicData.productionYear = data.productionYear;
          if (data.reportId) basicData.reportId = data.reportId;
        });
      } catch (e) {
        console.warn(`Record ${id} not found, skipping update`);
      }
    });
  }

  async deleteBasicData(id: string) {
    return await this.db.write(async () => {
      try {
        const record = await this.basicData.find(id);
        await record.markAsDeleted();
      } catch (e) {}
    });
  }
}

const basicDataRepository = new BasicDataRepository(database);
export default basicDataRepository;
