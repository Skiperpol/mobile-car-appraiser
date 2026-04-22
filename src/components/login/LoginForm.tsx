import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { router } from "expo-router";
import { Pressable, View } from "react-native";

type LoginFormProps = {
  rememberMe: boolean;
  onToggleRememberMe: () => void;
};

export function LoginForm({ rememberMe, onToggleRememberMe }: LoginFormProps) {
  return (
    <View className="-mt-8 rounded-t-3xl bg-white px-6 py-8 shadow-xl">
      <Text className="mb-8 text-center text-3xl font-extrabold text-zinc-900">
        Witaj ponownie
      </Text>

      <View className="gap-y-5">
        <View className="gap-2">
          <Text className="ml-1 text-sm font-semibold text-zinc-700">
            Email
          </Text>
          <Input
            placeholder="jan.kowalski@example.com"
            keyboardType="email-address"
            autoCapitalize="none"
            className="h-14 px-4 bg-zinc-50 text-zinc-900"
          />
        </View>

        <View className="gap-2">
          <Text className="ml-1 text-sm font-semibold text-zinc-700">
            Hasło
          </Text>
          <Input
            placeholder="••••••••"
            secureTextEntry
            className="h-14 border-zinc-200 bg-zinc-50 px-4 text-zinc-900"
          />
        </View>

        <Pressable
          onPress={onToggleRememberMe}
          className="flex-row items-center gap-3 py-2"
        >
          <Checkbox checked={rememberMe} pointerEvents="none" />
          <Text className="text-sm font-medium text-zinc-600">
            Zapamiętaj mnie
          </Text>
        </Pressable>

        <Button
          className="mt-4 h-14 w-full bg-zinc-900 active:opacity-90"
          onPress={() => router.replace("/(tabs)")}
        >
          <Text className="text-lg font-bold text-white">Zaloguj się</Text>
        </Button>
        <View className="h-4" />
      </View>
    </View>
  );
}
