export type ReportStep = 1 | 2 | 3;

export type Order = {
  id: string;
  title: string;
};

export type VehicleData = {
  reportNumber: string;
  make?: string;
  model?: string;
  vin?: string;
  registrationNumber?: string;
  productionYear?: string;
};

export type TechnicalData = {
  odometer?: string;
  usageMonths?: string;
  maxWeight?: string;
  bodyType?: string;
  driveUnit?: string;
  engineCapacity?: string;
  enginePower?: string;
};

export type AddReportFormValues = {
  selectedOrderId?: string;
  vehicle: VehicleData;
  technical: TechnicalData;
};
