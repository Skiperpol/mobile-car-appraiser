import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { useThemePreference } from "@/hooks/useThemePreference";
import { THEME } from "@/lib/theme";
import { TextInput, View, type TextInputProps } from "react-native";

type FormFieldProps = { label: string; multiline?: boolean } & TextInputProps;

export function FormField({
  label,
  multiline,
  errorMessage,
  placeholderTextColor,
  ...props
}: FormFieldProps & { errorMessage?: string }) {
  const { mode } = useThemePreference();

  if (multiline) {
    return (
      <View className="mb-4">
        <Text className="mb-2 text-[16px] text-zinc-700">{label}</Text>
        <TextInput
          multiline
          textAlignVertical="top"
          className="h-24 w-full border border-zinc-200 px-4 py-3 text-lg text-zinc-900 rounded-main"
          placeholderTextColor={placeholderTextColor ?? THEME[mode].placeholder}
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
      <Text className="mb-2 text-[16px] text-black">{label}</Text>
      <Input
        className="border-zinc-200 px-4 text-lg "
        placeholderTextColor={placeholderTextColor ?? THEME[mode].placeholder}
        {...props}
      />
      {errorMessage ? (
        <Text className="mt-1 text-sm text-rose-600">{errorMessage}</Text>
      ) : null}
    </View>
  );
}
