import { getApiBaseUrl } from "./api-config";

export type LoginResponse = {
  accessToken: string;
  tokenType: string;
};

export class AuthApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message);
    this.name = "AuthApiError";
  }
}

function formatValidationMessage(payload: unknown): string | null {
  if (!payload || typeof payload !== "object") {
    return null;
  }
  const message = (payload as { message?: unknown }).message;
  if (typeof message === "string") {
    return message;
  }
  if (Array.isArray(message)) {
    return message
      .map((item) => {
        if (typeof item === "string") {
          return item;
        }
        if (item && typeof item === "object" && "constraints" in item) {
          const c = (item as { constraints?: Record<string, string> }).constraints;
          if (c && typeof c === "object") {
            return Object.values(c).join(", ");
          }
        }
        return null;
      })
      .filter(Boolean)
      .join("; ");
  }
  return null;
}

export async function loginWithPassword(
  email: string,
  password: string,
): Promise<LoginResponse> {
  const base = getApiBaseUrl();
  const res = await fetch(`${base}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ email: email.trim(), password }),
  });

  const payload = await res.json().catch(() => null);

  if (!res.ok) {
    const fromValidation = formatValidationMessage(payload);
    const fromBody =
      fromValidation ??
      (payload &&
      typeof payload === "object" &&
      "error" in payload &&
      typeof (payload as { error?: string }).error === "string"
        ? (payload as { error: string }).error
        : null);
    const text =
      fromBody ??
      (typeof payload === "object" &&
      payload &&
      "message" in payload &&
      typeof (payload as { message: string }).message === "string"
        ? (payload as { message: string }).message
        : `Logowanie nie powiodło się (${res.status})`);
    throw new AuthApiError(text, res.status);
  }

  if (
    !payload ||
    typeof payload !== "object" ||
    typeof (payload as LoginResponse).accessToken !== "string"
  ) {
    throw new AuthApiError("Nieprawidłowa odpowiedź serwera", res.status);
  }

  return payload as LoginResponse;
}
