import { getApiBaseUrl } from "@/lib/api-config";
import { LoginResponse } from "../types/api-types";
import { formatValidationMessage } from "./auth-api-utils";
import { AuthApiError } from "./errors";

export async function loginWithPassword(
  email: string,
  password: string,
): Promise<LoginResponse> {
  const res = await fetch(`${getApiBaseUrl()}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ email: email.trim(), password }),
  });

  const payload = await res.json();

  if (!res.ok) {
    throw new AuthApiError(
      formatValidationMessage(payload) || "Unknown error",
      res.status,
    );
  }

  return payload as LoginResponse;
}
