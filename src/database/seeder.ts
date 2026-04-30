import basicDataRepository from "@/database/repositories/BasicDataRepository";
import reportAttachmentsRepository from "@/database/repositories/ReportAttachmentsModel";
import reportDynamicValueRepository from "@/database/repositories/ReportDynamicValueModel";
import reportRepository from "@/database/repositories/ReportRepository";

type SeedOptions = {
  clearExisting?: boolean;
};

const TECHNICAL_FIELDS = [
  "odometer",
  "usageMonths",
  "maxWeight",
  "bodyType",
  "driveUnit",
  "engineCapacity",
  "enginePower",
] as const;

const SEED_REPORTS = [
  {
    userId: "seed-user",
    orderId: "WYP-2026-001",
    reportNumber: "RAP-2026-001",
    vehicle: {
      brand: "Toyota",
      model: "Corolla",
      vin: "JTDBR32E220065432",
      registrationNumber: "WI 1234A",
      productionYear: 2019,
    },
    technical: {
      odometer: "53235 km",
      usageMonths: "77 miesiecy",
      maxWeight: "2375 kg",
      bodyType: "Sedan",
      driveUnit: "Silnik benzynowy",
      engineCapacity: "1798 cm3",
      enginePower: "140 KM",
    },
    attachmentName: "rap-2026-001-1.jpg",
  },
  {
    userId: "seed-user",
    orderId: "WYP-2026-002",
    reportNumber: "RAP-2026-002",
    vehicle: {
      brand: "Audi",
      model: "A4",
      vin: "WAUZZZ8K1DA123456",
      registrationNumber: "WX 7788K",
      productionYear: 2018,
    },
    technical: {
      odometer: "88320 km",
      usageMonths: "98 miesiecy",
      maxWeight: "2225 kg",
      bodyType: "Kombi",
      driveUnit: "Silnik diesel",
      engineCapacity: "1968 cm3",
      enginePower: "150 KM",
    },
    attachmentName: "rap-2026-002-1.jpg",
  },
  {
    userId: "seed-user",
    orderId: "WYP-2026-003",
    reportNumber: "RAP-2026-003",
    vehicle: {
      brand: "BMW",
      model: "X5",
      vin: "WBAKS410X0C765432",
      registrationNumber: "WA 9876T",
      productionYear: 2020,
    },
    technical: {
      odometer: "41200 km",
      usageMonths: "49 miesiecy",
      maxWeight: "2950 kg",
      bodyType: "SUV",
      driveUnit: "Silnik benzynowy",
      engineCapacity: "2998 cm3",
      enginePower: "340 KM",
    },
    attachmentName: "rap-2026-003-1.jpg",
  },
];

export async function seedDatabase(options: SeedOptions = {}) {
  const existing = await reportRepository.getAll();
  if (!options.clearExisting && existing.length > 0) {
    return { inserted: 0, skipped: true };
  }

  if (options.clearExisting) {
    await Promise.all(existing.map((report) => reportRepository.deleteReport(report.id)));
  }

  let inserted = 0;
  for (const seed of SEED_REPORTS) {
    const createdReport = await reportRepository.createReport({
      userId: seed.userId,
      orderId: seed.orderId,
      reportNumber: seed.reportNumber,
      imageUrl: `seed://${seed.attachmentName}`,
      imageName: seed.attachmentName,
    });

    await basicDataRepository.createBasicData({
      reportId: createdReport.id,
      brand: seed.vehicle.brand,
      model: seed.vehicle.model,
      vin: seed.vehicle.vin,
      registrationNumber: seed.vehicle.registrationNumber,
      productionYear: seed.vehicle.productionYear,
    });

    await Promise.all(
      TECHNICAL_FIELDS.map((field) =>
        reportDynamicValueRepository.createReportDynamicValue({
          reportId: createdReport.id,
          fieldId: field,
          value: seed.technical[field],
        }),
      ),
    );

    await reportAttachmentsRepository.createReportAttachments({
      reportId: createdReport.id,
      url: `seed://${seed.attachmentName}`,
      name: seed.attachmentName,
      comment: "Przykladowe zdjecie z seedera",
    });

    inserted += 1;
  }

  return { inserted, skipped: false };
}
