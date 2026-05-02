import basicDataRepository from "@/database/repositories/BasicDataRepository";
import reportDynamicValueRepository from "@/database/repositories/ReportDynamicValueModel";
import reportRepository from "@/database/repositories/ReportRepository";
import { INITIAL_ADD_REPORT_FORM_VALUES, INITIAL_ORDERS } from "@/features/add-report/constants/constants";
import { addReportSchema } from "@/features/add-report/types/schema";
import { type AddReportFormValues, type Order, type ReportStep } from "@/features/add-report/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";

export function useAddReportForm() {
  const [step, setStep] = useState<ReportStep>(1);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [searchValue, setSearchValue] = useState("");
  const [isCreateOrderOpen, setCreateOrderOpen] = useState(false);
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
    handleHeaderBack,
    handleBackStep,
    selectOrder,
    createOrder,
    goNext,
  };
}
