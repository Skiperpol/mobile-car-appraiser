import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { router } from "expo-router";
import { Eye, EyeOff } from "lucide-react-native";
import { useState } from "react";
import { Pressable, View } from "react-native";

type LoginFormProps = {
  rememberMe: boolean;
  onToggleRememberMe: () => void;
};

export function LoginForm({ rememberMe, onToggleRememberMe }: LoginFormProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <View className="-mt-8 rounded-t-3xl bg-white p-4">
      <Text className="text-center text-3xl font-extrabold text-zinc-900 pt-2">
        Panel autoryzacyjny
      </Text>

      <View className="gap-y-4 pb-7 pt-5">
        <View className="gap-1">
          <Text className="text-sm font-semibold text-input">Email</Text>
          <Input
            placeholder="jan.kowalski@example.com"
            keyboardType="email-address"
            autoCapitalize="none"
            className="px-4 text-main"
          />
        </View>

        <View className="gap-1">
          <Text className="text-sm font-semibold text-input">Hasło</Text>
          <View className="relative">
            <Input
              placeholder={isPasswordVisible ? "Hasło" : "•••••"}
              secureTextEntry={!isPasswordVisible}
              className="px-4 pr-12 text-main"
            />
            <Pressable
              onPress={() => setIsPasswordVisible((prev) => !prev)}
              className="absolute right-4 top-1/2 -translate-y-1/2"
              hitSlop={8}
              accessibilityRole="button"
              accessibilityLabel={
                isPasswordVisible ? "Ukryj hasło" : "Pokaż hasło"
              }
            >
              {isPasswordVisible ? (
                <EyeOff size={18} color="#71717a" />
              ) : (
                <Eye size={18} color="#71717a" />
              )}
            </Pressable>
          </View>
        </View>

        <Pressable
          onPress={onToggleRememberMe}
          className="flex-row items-center gap-3"
        >
          <Checkbox checked={rememberMe} pointerEvents="none" />
          <Text className="text-sm font-medium text-zinc-600">
            Zapamiętaj mnie
          </Text>
        </Pressable>
      </View>
      <Button variant="main" onPress={() => router.replace("/(tabs)")}>
        <Text>Zaloguj się</Text>
      </Button>
    </View>
  );
}
