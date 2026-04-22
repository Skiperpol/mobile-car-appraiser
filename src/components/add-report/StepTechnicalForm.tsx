import { Text } from "@/components/ui/text";
import { Controller, useFormContext } from "react-hook-form";
import { FormField } from "./FormField";
import { type AddReportFormValues } from "./types";

export function StepTechnicalForm() {
  const {
    control,
    formState: { errors },
  } = useFormContext<AddReportFormValues>();

  return (
    <>
      <Text className="mb-6 text-center text-base text-zinc-600">
        Szczegoly techniczne pojazdu
      </Text>
      <Controller
        control={control}
        name="technical.odometer"
        render={({ field: { value, onChange } }) => (
          <FormField
            label="Wskazanie drogomierza"
            placeholder="np. 53235 km"
            value={value}
            onChangeText={onChange}
            errorMessage={errors.technical?.odometer?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="technical.usageMonths"
        render={({ field: { value, onChange } }) => (
          <FormField
            label="Okres eksploatacji pojazdu"
            placeholder="np. 77 miesiecy"
            value={value}
            onChangeText={onChange}
            errorMessage={errors.technical?.usageMonths?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="technical.maxWeight"
        render={({ field: { value, onChange } }) => (
          <FormField
            label="Dopuszczalna masa calkowita"
            placeholder="np. 2375 kg"
            value={value}
            onChangeText={onChange}
            errorMessage={errors.technical?.maxWeight?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="technical.bodyType"
        render={({ field: { value, onChange } }) => (
          <FormField
            label="Rodzaj nadwozia"
            placeholder="Wprowadz rodzaj"
            value={value}
            onChangeText={onChange}
            errorMessage={errors.technical?.bodyType?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="technical.driveUnit"
        render={({ field: { value, onChange } }) => (
          <FormField
            label="Jednostka napedowa"
            placeholder="Wprowadz jednostke"
            value={value}
            onChangeText={onChange}
            errorMessage={errors.technical?.driveUnit?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="technical.engineCapacity"
        render={({ field: { value, onChange } }) => (
          <FormField
            label="Pojemnosc silnika"
            placeholder="np. 1998 cm3"
            value={value}
            onChangeText={onChange}
            errorMessage={errors.technical?.engineCapacity?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="technical.enginePower"
        render={({ field: { value, onChange } }) => (
          <FormField
            label="Moc silnika"
            placeholder="np. 150 KM"
            value={value}
            onChangeText={onChange}
            errorMessage={errors.technical?.enginePower?.message}
          />
        )}
      />
    </>
  );
}
