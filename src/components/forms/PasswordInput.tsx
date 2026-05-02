import { Eye, EyeOff } from "lucide-react-native";
import { useState } from "react";
import { Pressable, View } from "react-native";
import { Input } from "../ui/input";

export function PasswordInput({
  value,
  onChangeText,
  onBlur,
  error,
}: {
  value: string;
  onChangeText: (text: string) => void;
  onBlur: () => void;
  error?: boolean;
}) {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  return (
    <View className="relative">
      <Input
        value={value}
        onChangeText={onChangeText}
        placeholder={isPasswordVisible ? "K7mP92!vXQ" : "••••••••••"}
        secureTextEntry={!isPasswordVisible}
        className="pr-12 text-main"
        onBlur={onBlur}
        error={error}
      />
      <Pressable
        onPress={() => setIsPasswordVisible((prev) => !prev)}
        className="absolute right-4 top-1/2 -translate-y-1/2"
        hitSlop={8}
        accessibilityRole="button"
        accessibilityLabel={isPasswordVisible ? "Ukryj hasło" : "Pokaż hasło"}
      >
        {isPasswordVisible ? (
          <EyeOff size={18} color="#71717a" />
        ) : (
          <Eye size={18} color="#71717a" />
        )}
      </Pressable>
    </View>
  );
}
