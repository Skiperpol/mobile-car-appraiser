import { loginWithPassword } from "@/features/auth/api/auth-api";
import { setAccessToken } from "@/features/auth/storage/auth-storage";
import { router, type Href } from "expo-router";
import { useCallback, useState } from "react";

export function useLogin() {
  const [email, setEmailState] = useState("");
  const [password, setPasswordState] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
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

  const toggleRememberMe = useCallback(() => {
    setRememberMe((prev) => !prev);
  }, []);

  const login = useCallback(async () => {
    setError(null);
    setIsLoading(true);
    try {
      const { accessToken } = await loginWithPassword(email, password);
      await setAccessToken(accessToken, { persist: rememberMe });
      router.replace("/(tabs)/index" as Href);
    } catch (e) {
      const message =
        e instanceof Error ? e.message : "Nie udało się zalogować";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, [email, password, rememberMe]);

  return {
    email,
    setEmail,
    password,
    setPassword,
    rememberMe,
    toggleRememberMe,
    login,
    isLoading,
    error,
  };
}
