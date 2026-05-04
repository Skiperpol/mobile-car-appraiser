import basicDataRepository from "@/database/repositories/BasicDataRepository";
import reportDynamicValueRepository from "@/database/repositories/ReportDynamicValueModel";
import reportRepository from "@/database/repositories/ReportRepository";
import { INITIAL_ADD_REPORT_FORM_VALUES, INITIAL_ORDERS } from "@/features/add-report/constants/constants";
import { syncCreatedReportToBackend } from "@/features/sync/services/sync-created-report";
import { addReportSchema } from "@/features/add-report/types/schema";
import { type AddReportFormValues, type Order, type ReportStep } from "@/features/add-report/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Buffer } from "buffer";
import { router } from "expo-router";
import PolishVehicleRegistrationCertificateDecoder from "polish-vehicle-registration-certificate-decoder";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { Alert } from "react-native";

if (!globalThis.Buffer) {
  globalThis.Buffer = Buffer;
}

export function useAddReportForm() {
  const [step, setStep] = useState<ReportStep>(1);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [searchValue, setSearchValue] = useState("");
  const [isCreateOrderOpen, setCreateOrderOpen] = useState(false);
  const [isAztecScannerOpen, setAztecScannerOpen] = useState(false);
  const [isDecodingAztec, setDecodingAztec] = useState(false);
  const [newOrderName, setNewOrderName] = useState("");
  const [newOrderDescription, setNewOrderDescription] = useState("");

  const form = useForm<AddReportFormValues>({
    resolver: zodResolver(addReportSchema),
    defaultValues: INITIAL_ADD_REPORT_FORM_VALUES,
    mode: "onTouched",
  });

  const {
    handleSubmit,
    setValue,
    watch,
    trigger,
    clearErrors,
    formState: { errors },
  } = form;

  const selectedOrderId = watch("selectedOrderId") ?? "";

  const filteredOrders = useMemo(() => {
    const query = searchValue.trim().toLowerCase();
    if (!query) {
      return orders;
    }

    return orders.filter((order) => `${order.id} ${order.title}`.toLowerCase().includes(query));
  }, [orders, searchValue]);

  const handleHeaderBack = () => {
    if (step > 1) {
      setStep((prev) => Math.max(1, prev - 1) as ReportStep);
      return;
    }

    router.back();
  };

  const handleBackStep = () => {
    setStep((prev) => Math.max(1, prev - 1) as ReportStep);
  };

  const selectOrder = (id: string) => {
    setValue("selectedOrderId", id, { shouldValidate: true });
    clearErrors("selectedOrderId");
  };

  const createOrder = () => {
    const name = newOrderName.trim();
    if (!name) {
      return;
    }

    const nextNumber = orders.length + 1;
    const createdOrder = {
      id: `WYP-2024-${String(nextNumber).padStart(3, "0")}`,
      title: newOrderDescription.trim() || name,
    };

    setOrders((prev) => [createdOrder, ...prev]);
    selectOrder(createdOrder.id);
    setNewOrderName("");
    setNewOrderDescription("");
    setCreateOrderOpen(false);
  };

  const applyAztecDataToForm = (decodedData: Record<string, unknown>) => {
    const registrationNumber =
      (decodedData.numerRejestracyjnyPojazdu as { value?: string } | undefined)
        ?.value ?? "";
    const make =
      (decodedData.markaPojazdu as { value?: string } | undefined)?.value ?? "";
    const model =
      (decodedData.modelPojazdu as { value?: string } | undefined)?.value ?? "";
    const vin =
      (decodedData.numerIdentyfikacyjnyPojazdu as { value?: string } | undefined)
        ?.value ?? "";
    const productionYear =
      (decodedData.rokProdukcji as { value?: string } | undefined)?.value ?? "";

    const maxWeight =
      (decodedData.dopuszczalnaMasaCalkowitaPojazduKg as
        | { value?: string }
        | undefined)?.value ?? "";
    const bodyType =
      (decodedData.rodzajPojazdu as { value?: string } | undefined)?.value ?? "";
    const driveUnit =
      (decodedData.rodzajPaliwa as
        | { valueDescription?: string; value?: string }
        | undefined)?.valueDescription ||
      (decodedData.rodzajPaliwa as { value?: string } | undefined)?.value ||
      "";
    const engineCapacity =
      (decodedData.pojemnoscSilnikaCm3 as { value?: string } | undefined)?.value ??
      "";
    const enginePower =
      (decodedData.maksymalnaMocNettoSilnikaKW as { value?: string } | undefined)
        ?.value ?? "";

    let mappedFieldsCount = 0;
    const formSetOptions = { shouldDirty: true, shouldTouch: true };

    if (registrationNumber) {
      setValue("vehicle.registrationNumber", registrationNumber, formSetOptions);
      mappedFieldsCount += 1;
    }
    if (make) {
      setValue("vehicle.make", make, formSetOptions);
      mappedFieldsCount += 1;
    }
    if (model) {
      setValue("vehicle.model", model, formSetOptions);
      mappedFieldsCount += 1;
    }
    if (vin) {
      setValue("vehicle.vin", vin, formSetOptions);
      mappedFieldsCount += 1;
    }
    if (productionYear) {
      setValue("vehicle.productionYear", productionYear, formSetOptions);
      mappedFieldsCount += 1;
    }
    if (maxWeight) {
      setValue("technical.maxWeight", maxWeight, formSetOptions);
      mappedFieldsCount += 1;
    }
    if (bodyType) {
      setValue("technical.bodyType", bodyType, formSetOptions);
      mappedFieldsCount += 1;
    }
    if (driveUnit) {
      setValue("technical.driveUnit", driveUnit, formSetOptions);
      mappedFieldsCount += 1;
    }
    if (engineCapacity) {
      setValue("technical.engineCapacity", engineCapacity, formSetOptions);
      mappedFieldsCount += 1;
    }
    if (enginePower) {
      setValue("technical.enginePower", enginePower, formSetOptions);
      mappedFieldsCount += 1;
    }

    return mappedFieldsCount;
  };

  const handleAztecScan = async (rawValue: string) => {
    if (isDecodingAztec) {
      return;
    }

    setDecodingAztec(true);
    try {
      const normalizedRaw = rawValue.trim();
      const rawAfterComma = normalizedRaw.includes(",")
        ? normalizedRaw.slice(normalizedRaw.lastIndexOf(",") + 1)
        : normalizedRaw;
      const strippedStartStop = rawAfterComma
        .replace(/^START[:\s-]*/i, "")
        .replace(/[:\s-]*STOP$/i, "");
      const base64Only = rawAfterComma.replace(/[^A-Za-z0-9+/=]/g, "");

      const decodeUriSafe = (value: string) => {
        try {
          return decodeURIComponent(value);
        } catch {
          return value;
        }
      };

      const decodeCandidates = Array.from(
        new Set([
          rawValue,
          normalizedRaw,
          rawAfterComma,
          strippedStartStop,
          base64Only,
          normalizedRaw.replace(/\s+/g, ""),
          rawAfterComma.replace(/\s+/g, ""),
          strippedStartStop.replace(/\s+/g, ""),
          base64Only.replace(/\s+/g, ""),
          decodeUriSafe(normalizedRaw),
          decodeUriSafe(rawAfterComma),
          decodeUriSafe(strippedStartStop),
          decodeUriSafe(base64Only),
        ]),
      ).filter(Boolean);

      let decodedData: Record<string, unknown> | null = null;
      let successfulCandidateIndex = -1;

      for (const [index, candidate] of decodeCandidates.entries()) {
        try {
          const decoder = new PolishVehicleRegistrationCertificateDecoder(candidate);
          decodedData = decoder.data as unknown as Record<string, unknown>;
          successfulCandidateIndex = index;
          break;
        } catch {
          // Try next normalized candidate.
        }
      }

      if (!decodedData) {
        throw new Error("Aztec decode failed");
      }

      const mappedFieldsCount = applyAztecDataToForm(decodedData);
      if (mappedFieldsCount === 0) {
        Alert.alert(
          "Brak dopasowanych danych",
          "Kod zostal odczytany, ale nie znaleziono pol do uzupelnienia w formularzu.",
        );
        return;
      }
      setAztecScannerOpen(false);
      Alert.alert("Sukces", "Dane z kodu Aztec zostały uzupełnione.");
    } catch {
      Alert.alert(
        "Błąd skanowania",
        "Nie udało się odczytać danych z kodu Aztec. Spróbuj ponownie.",
      );
    } finally {
      setDecodingAztec(false);
    }
  };

  const goNext = async () => {
    if (step === 1) {
      const isValid = await trigger("selectedOrderId");
      if (!isValid) {
        return;
      }
      setStep(2);
      return;
    }

    if (step === 2) {
      const isValid = await trigger("vehicle");
      if (!isValid) {
        return;
      }
      setStep(3);
      return;
    }

    void handleSubmit(async (values) => {
      const createdReport = await reportRepository.createReport({
        reportState: "pending",
        userId: "local-user",
        orderId: values.selectedOrderId ?? null,
        reportNumber: values.vehicle.reportNumber,
        imageUrl: null,
        imageName: null,
      });

      await basicDataRepository.createBasicData({
        reportId: createdReport.id,
        brand: values.vehicle.make?.trim() || null,
        model: values.vehicle.model?.trim() || null,
        vin: values.vehicle.vin?.trim() || null,
        registrationNumber: values.vehicle.registrationNumber?.trim() || null,
        productionYear: values.vehicle.productionYear
          ? Number.isFinite(Number(values.vehicle.productionYear))
            ? Number(values.vehicle.productionYear)
            : null
          : null,
      });

      const dynamicEntries = Object.entries(values.technical).filter(([, value]) => value?.trim());
      await Promise.all(
        dynamicEntries.map(([fieldId, value]) =>
          reportDynamicValueRepository.createReportDynamicValue({
            reportId: createdReport.id,
            fieldId,
            value: value!.trim(),
          }),
        ),
      );

      void syncCreatedReportToBackend({
        localReportId: createdReport.id,
        reportNumber: values.vehicle.reportNumber,
        vehicle: {
          make: values.vehicle.make,
          model: values.vehicle.model,
          vin: values.vehicle.vin,
          registrationNumber: values.vehicle.registrationNumber,
          productionYear: values.vehicle.productionYear,
        },
      });

      router.replace({
        pathname: "./report-details",
        params: {
          reportId: createdReport.id,
          reportNumber: values.vehicle.reportNumber,
        },
      });
    })();
  };

  return {
    form,
    step,
    filteredOrders,
    selectedOrderId,
    searchValue,
    setSearchValue,
    errors,
    isCreateOrderOpen,
    setCreateOrderOpen,
    newOrderName,
    setNewOrderName,
    newOrderDescription,
    setNewOrderDescription,
    isAztecScannerOpen,
    setAztecScannerOpen,
    isDecodingAztec,
    handleAztecScan,
    handleHeaderBack,
    handleBackStep,
    selectOrder,
    createOrder,
    goNext,
  };
}
