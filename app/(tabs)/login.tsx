import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  View,
} from "react-native";

export default function Login() {
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 24 : 16}
      className="flex-1 bg-zinc-100"
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardDismissMode="on-drag"
        className="flex-1"
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex-1 w-full">
          <Image
            source={require("@/assets/images/login-image.jpg")}
            className="h-full w-full"
            resizeMode="cover"
          />
        </View>

        <View className="-mt-8 rounded-t-3xl bg-white px-6 py-8 shadow-xl">
          <Text className="mb-8 text-center text-3xl font-extrabold text-zinc-900">
            Witaj ponownie
          </Text>

          <View className="gap-y-5">
            <View className="gap-2">
              <Text className="text-sm font-semibold text-zinc-700">Email</Text>
              <Input
                placeholder="jan.kowalski@example.com"
                keyboardType="email-address"
                autoCapitalize="none"
                className="h-14 rounded-xl border-zinc-200 bg-zinc-50 px-4 text-zinc-900"
              />
            </View>

            <View className="gap-2">
              <Text className="text-sm font-semibold text-zinc-700">Hasło</Text>
              <Input
                placeholder="••••••••"
                secureTextEntry
                className="h-14 rounded-xl border-zinc-200 bg-zinc-50 px-4 text-zinc-900"
              />
            </View>

            <Pressable
              onPress={() => setRememberMe((prev) => !prev)}
              className="flex-row items-center gap-3 py-2"
            >
              <Checkbox checked={rememberMe} pointerEvents="none" />
              <Text className="text-sm text-zinc-600 font-medium">
                Zapamiętaj mnie
              </Text>
            </Pressable>

            <Button className="mt-4 h-14 w-full rounded-xl bg-zinc-900 active:opacity-90">
              <Text className="text-lg font-bold text-white">Zaloguj się</Text>
            </Button>
            <View className="h-4" />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
