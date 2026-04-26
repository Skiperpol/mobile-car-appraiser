import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { router } from "expo-router";
import { useState } from "react";
import { Pressable, View } from "react-native";
import { PasswordInput } from "./PasswordInput";

type LoginFormProps = {
  rememberMe: boolean;
  onToggleRememberMe: () => void;
};

export function LoginForm({ rememberMe, onToggleRememberMe }: LoginFormProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <View className="-mt-8 rounded-t-3xl bg-white p-4">
      <Text className="text-center text-3xl font-extrabold text-main pt-2">
        Panel autoryzacyjny
      </Text>

      <View className="gap-y-4 pb-7 pt-5">
        <View className="gap-1">
          <Text className="text-sm font-semibold text-input">Email</Text>
          <Input
            placeholder="jan.kowalski@example.com"
            keyboardType="email-address"
            autoCapitalize="none"
            className=""
          />
        </View>

        <View className="gap-1">
          <Text className="text-sm font-semibold text-input">Hasło</Text>
          <PasswordInput
            isPasswordVisible={isPasswordVisible}
            setIsPasswordVisible={setIsPasswordVisible}
          />
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
