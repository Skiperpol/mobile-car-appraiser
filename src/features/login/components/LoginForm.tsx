import { PasswordInput } from "@/components/forms/PasswordInput";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { useLogin } from "@/features/login/hooks/useLogin";
import { Controller } from "react-hook-form";
import { ActivityIndicator, View } from "react-native";

export function LoginForm() {
  const { control, handleLogin, isLoading, serverError, errors } = useLogin();

  return (
    <View className="-mt-8 rounded-t-3xl bg-white p-4">
      <Text className="text-center text-3xl font-extrabold text-main pt-2">
        Panel autoryzacyjny
      </Text>

      <View className="gap-y-4 pb-7 pt-5">
        <View className="gap-1">
          <Text className="text-sm font-semibold text-input">Email</Text>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                placeholder="jan.kowalski@example.com"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                error={!!errors.email}
              />
            )}
          />
          {errors.email && (
            <Text className="text-xs text-red-500">{errors.email.message}</Text>
          )}
        </View>

        <View className="gap-1">
          <Text className="text-sm font-semibold text-input">Hasło</Text>
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <PasswordInput
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                error={!!errors.password}
              />
            )}
          />
          {errors.password && (
            <Text className="text-xs text-red-500">
              {errors.password.message}
            </Text>
          )}
        </View>

        {serverError ? (
          <Text className="text-sm font-medium text-red-600 text-center">
            {serverError}
          </Text>
        ) : null}
      </View>
      <Button variant="main" disabled={isLoading} onPress={handleLogin}>
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text>Zaloguj się</Text>
        )}
      </Button>
    </View>
  );
}
