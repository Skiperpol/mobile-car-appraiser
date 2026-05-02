import { apiClient } from "@/lib/axios-client";
import axios from "axios";
import type { LoginResponse } from "../types/api-types";
import { formatValidationMessage } from "./auth-api-utils";
import { AuthApiError } from "./errors";

export async function loginWithPassword(
  email: string,
  password: string,
): Promise<LoginResponse> {
  try {
    const { data } = await apiClient.post<LoginResponse>("/api/auth/login", {
      email: email.trim(),
      password,
    });
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const payload = error.response?.data;
      throw new AuthApiError(
        formatValidationMessage(payload) || error.message || "Unknown error",
        error.response?.status ?? 0,
      );
    }
    throw new AuthApiError("Unknown error", 0);
  }
}
