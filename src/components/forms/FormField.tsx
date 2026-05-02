import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { useThemePreference } from "@/hooks/useThemePreference";
import { TextInput, View, type TextInputProps } from "react-native";

type FormFieldProps = { label: string; multiline?: boolean } & TextInputProps;

const PLACEHOLDER_COLOR_BY_MODE = {
  light: "#71717a", // zinc-500
  dark: "#a1a1aa", // zinc-400
} as const;

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
          placeholderTextColor={
            placeholderTextColor ?? PLACEHOLDER_COLOR_BY_MODE[mode]
          }
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
        placeholderTextColor={
          placeholderTextColor ?? PLACEHOLDER_COLOR_BY_MODE[mode]
        }
        {...props}
      />
      {errorMessage ? (
        <Text className="mt-1 text-sm text-rose-600">{errorMessage}</Text>
      ) : null}
    </View>
  );
}
