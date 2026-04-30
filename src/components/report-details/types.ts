export type ReportPhoto = {
  id: string;
  title: string;
  comment: string;
  uri?: string;
  name?: string;
};

export type ReportDetails = {
  id: string;
  carName: string;
  statusLabel: string;
  assignedOrderId: string;
  reportNumber: string;
  make: string;
  model: string;
  vin: string;
  registrationNumber: string;
  photos: ReportPhoto[];
};
