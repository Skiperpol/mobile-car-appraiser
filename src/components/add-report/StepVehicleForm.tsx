import { Text } from "@/components/ui/text";
import { Controller, useFormContext } from "react-hook-form";
import { FormField } from "./FormField";
import { type AddReportFormValues } from "./types";

export function StepVehicleForm() {
  const {
    control,
    formState: { errors },
  } = useFormContext<AddReportFormValues>();

  return (
    <>
      <Text className="mb-6 text-center text-base text-zinc-600">
        Wypelnij informacje o pojezdzie
      </Text>
      <Controller
        control={control}
        name="vehicle.reportNumber"
        render={({ field: { value, onChange } }) => (
          <FormField
            label="Numer raportu*"
            placeholder="RAP-2026-001"
            value={value}
            onChangeText={onChange}
            errorMessage={errors.vehicle?.reportNumber?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="vehicle.make"
        render={({ field: { value, onChange } }) => (
          <FormField
            label="Marka"
            placeholder="Toyota"
            value={value}
            onChangeText={onChange}
            errorMessage={errors.vehicle?.make?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="vehicle.model"
        render={({ field: { value, onChange } }) => (
          <FormField
            label="Model"
            placeholder="Corolla"
            value={value}
            onChangeText={onChange}
            errorMessage={errors.vehicle?.model?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="vehicle.vin"
        render={({ field: { value, onChange } }) => (
          <FormField
            label="VIN"
            placeholder="WAUZZZ8V0JA000001"
            value={value}
            onChangeText={onChange}
            errorMessage={errors.vehicle?.vin?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="vehicle.registrationNumber"
        render={({ field: { value, onChange } }) => (
          <FormField
            label="Numer rejestracyjny"
            placeholder="WI 1234A"
            value={value}
            onChangeText={onChange}
            errorMessage={errors.vehicle?.registrationNumber?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="vehicle.productionYear"
        render={({ field: { value, onChange } }) => (
          <FormField
            label="Rok produkcji"
            placeholder="2019"
            value={value}
            onChangeText={onChange}
            errorMessage={errors.vehicle?.productionYear?.message}
          />
        )}
      />
    </>
  );
}
