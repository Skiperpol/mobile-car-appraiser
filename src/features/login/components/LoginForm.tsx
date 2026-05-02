import { PasswordInput } from "@/components/forms/PasswordInput";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { useLogin } from "@/features/login/hooks/useLogin";
import { ActivityIndicator, Pressable, View } from "react-native";

export function LoginForm() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    rememberMe,
    toggleRememberMe,
    login,
    isLoading,
    error,
  } = useLogin();

  return (
    <View className="-mt-8 rounded-t-3xl bg-white p-4">
      <Text className="text-center text-3xl font-extrabold text-main pt-2">
        Panel autoryzacyjny
      </Text>

      <View className="gap-y-4 pb-7 pt-5">
        <View className="gap-1">
          <Text className="text-sm font-semibold text-input">Email</Text>
          <Input
            value={email}
            onChangeText={setEmail}
            placeholder="jan.kowalski@example.com"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            className=""
          />
        </View>

        <View className="gap-1">
          <Text className="text-sm font-semibold text-input">Hasło</Text>
          <PasswordInput value={password} onChangeText={setPassword} />
        </View>

        {error ? (
          <Text className="text-sm font-medium text-red-600">{error}</Text>
        ) : null}

        <Pressable
          onPress={toggleRememberMe}
          className="flex-row items-center gap-3"
        >
          <Checkbox checked={rememberMe} pointerEvents="none" />
          <Text className="text-sm font-medium text-zinc-600">
            Zapamiętaj mnie
          </Text>
        </Pressable>
      </View>
      <Button variant="main" disabled={isLoading} onPress={() => void login()}>
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text>Zaloguj się</Text>
        )}
      </Button>
    </View>
  );
}
