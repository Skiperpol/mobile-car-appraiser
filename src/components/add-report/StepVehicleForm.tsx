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
            placeholder="Wprowadz numer"
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
            placeholder="Wprowadz marke"
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
            placeholder="Wprowadz model"
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
            placeholder="Wprowadz numer VIN"
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
            placeholder="Wprowadz numer rejestracyjny"
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
            placeholder="Wprowadz rok"
            value={value}
            onChangeText={onChange}
            errorMessage={errors.vehicle?.productionYear?.message}
          />
        )}
      />
    </>
  );
}
