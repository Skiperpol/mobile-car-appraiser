import { loginWithPassword } from "@/features/auth/api/auth-api";
import { setAccessToken } from "@/features/auth/storage/auth-storage";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { loginSchema } from "../types/schema";
import { LoginFormData } from "../types/types";

export function useLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const formValues = watch();
  useEffect(() => {
    if (serverError) setServerError(null);
  }, [formValues.email, formValues.password]);

  const onSubmit = async (data: LoginFormData) => {
    setServerError(null);
    setIsLoading(true);
    try {
      const { accessToken } = await loginWithPassword(
        data.email,
        data.password,
      );
      await setAccessToken(accessToken);
      router.replace("/(tabs)");
    } catch (e) {
      setServerError(e instanceof Error ? e.message : "Błąd logowania");
    } finally {
      setIsLoading(false);
    }
  };

  return useMemo(
    () => ({
      control,
      handleLogin: handleSubmit(onSubmit),
      isLoading,
      serverError,
      errors,
    }),
    [control, handleSubmit, isLoading, serverError, errors],
  );
}
