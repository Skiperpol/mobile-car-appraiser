import { z } from "zod";

const requiredText = (message: string) => z.string().trim().min(1, message);

export const addReportSchema = z.object({
  selectedOrderId: z.string().optional(),
  vehicle: z.object({
    reportNumber: requiredText("Numer raportu jest wymagany"),
    make: z.string().optional(),
    model: z.string().optional(),
    vin: z.string().optional(),
    registrationNumber: z.string().optional(),
    productionYear: z.string().optional(),
  }),
  technical: z.object({
    odometer: z.string().optional(),
    usageMonths: z.string().optional(),
    maxWeight: z.string().optional(),
    bodyType: z.string().optional(),
    driveUnit: z.string().optional(),
    engineCapacity: z.string().optional(),
    enginePower: z.string().optional(),
  }),
});

export type AddReportSchema = z.infer<typeof addReportSchema>;
