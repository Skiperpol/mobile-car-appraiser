import { loginWithPassword } from "@/features/auth/api/auth-api";
import { setAccessToken } from "@/features/auth/storage/auth-storage";
import { router, type Href } from "expo-router";
import { useCallback, useState } from "react";

export function useLogin() {
  const [email, setEmailState] = useState("");
  const [password, setPasswordState] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const setEmail = useCallback((value: string) => {
    setError(null);
    setEmailState(value);
  }, []);

  const setPassword = useCallback((value: string) => {
    setError(null);
    setPasswordState(value);
  }, []);

  const login = useCallback(async () => {
    setError(null);
    setIsLoading(true);
    try {
      const { accessToken } = await loginWithPassword(email, password);
      await setAccessToken(accessToken);
      router.replace("/(tabs)/index" as Href);
    } catch (e) {
      const message =
        e instanceof Error ? e.message : "Nie udało się zalogować";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, [email, password]);

  return {
    email,
    setEmail,
    password,
    setPassword,
    login,
    isLoading,
    error,
  };
}
