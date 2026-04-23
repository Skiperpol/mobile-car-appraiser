import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { TextInput, View, type TextInputProps } from "react-native";

type FormFieldProps = { label: string; multiline?: boolean } & TextInputProps;

export function FormField({
  label,
  multiline,
  errorMessage,
  ...props
}: FormFieldProps & { errorMessage?: string }) {
  if (multiline) {
    return (
      <View className="mb-4">
        <Text className="mb-2 text-[16px] text-zinc-700">{label}</Text>
        <TextInput
          multiline
          textAlignVertical="top"
          className="h-24 w-full border border-zinc-200 bg-zinc-50 px-4 py-3 text-lg text-zinc-900"
          placeholderTextColor="#a1a1aa"
          {...props}
        />
        {errorMessage ? (
          <Text className="mt-1 text-sm text-rose-600">{errorMessage}</Text>
        ) : null}
      </View>
    );
  }

  return (
    <View className="mb-4">
      <Text className="mb-2 text-[16px] text-zinc-700">{label}</Text>
      <Input
        className="h-12 border-zinc-200 bg-zinc-50 px-4 text-lg"
        placeholderTextColor="#a1a1aa"
        {...props}
      />
      {errorMessage ? (
        <Text className="mt-1 text-sm text-rose-600">{errorMessage}</Text>
      ) : null}
    </View>
  );
}
