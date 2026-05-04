import { apiClient } from "@/lib/axios-client";
import axios from "axios";
import { clearAccessToken } from "../storage/auth-storage";
import type { LoginResponse } from "../types/api-types";
import { formatValidationMessage } from "./auth-api-utils";
import { AuthApiError } from "./errors";

export async function loginWithPassword(email: string, password: string): Promise<LoginResponse> {
  try {
    const { data } = await apiClient.post<LoginResponse>("/api/auth/login", {
      email: email.trim(),
      password,
    });
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response == null) {
        const code = error.code;
        let message = "Serwer nie odpowiada. Spróbuj ponownie za chwilę.";
        if (code === "ECONNABORTED") {
          message = "Przekroczono czas oczekiwania na odpowiedź serwera.";
        } else if (code === "ERR_NETWORK" || error.message === "Network Error") {
          message = "Brak połączenia z serwerem.";
        } else if (code === "ECONNREFUSED") {
          message = "Serwer odrzucił połączenie.";
        }
        throw new AuthApiError(message, 0);
      }

      const payload = error.response.data;
      const isInvalidCredentials =
        error.response.status === 401 &&
        formatValidationMessage(payload)?.toLowerCase() === "invalid email or password";

      throw new AuthApiError(
        isInvalidCredentials
          ? "Nieprawidłowe dane logowania."
          : formatValidationMessage(payload) || error.message || "Unknown error",
        error.response.status,
      );
    }
    throw new AuthApiError("Wystąpił nieoczekiwany błąd. " + (error as Error).message, 0);
  }
}

export async function logout() {
  await clearAccessToken();
}
