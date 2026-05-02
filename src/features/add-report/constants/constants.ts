import {
  type AddReportFormValues,
  type Order,
  type TechnicalData,
  type VehicleData,
} from "./types/types";

export const INITIAL_ORDERS: Order[] = [
  { id: "WYP-2024-005", title: "Uszkodzenie w warsztacie - Audi A4" },
  { id: "WYP-2024-004", title: "Kolizja lancuchowa - VW Golf" },
  { id: "WYP-2024-002", title: "Szkoda parkingowa - Toyota Corolla" },
  { id: "WYP-2024-003", title: "Wypadek A1 km 234 - Mercedes Sprinter" },
  { id: "WYP-2024-001", title: "Kolizja na ul. Glownej 45 - BMW X5" },
];

export const INITIAL_VEHICLE_DATA: VehicleData = {
  reportNumber: "",
  make: "",
  model: "",
  vin: "",
  registrationNumber: "",
  productionYear: "",
};

export const INITIAL_TECHNICAL_DATA: TechnicalData = {
  odometer: "",
  usageMonths: "",
  maxWeight: "",
  bodyType: "",
  driveUnit: "",
  engineCapacity: "",
  enginePower: "",
};

export const INITIAL_ADD_REPORT_FORM_VALUES: AddReportFormValues = {
  selectedOrderId: "",
  vehicle: INITIAL_VEHICLE_DATA,
  technical: INITIAL_TECHNICAL_DATA,
};
