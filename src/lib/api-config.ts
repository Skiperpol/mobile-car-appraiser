export function getApiBaseUrl(): string {
  const baseUrl =
    process.env.EXPO_PUBLIC_API_BASE_URL || "http://127.0.0.1:3000/v1";

  return baseUrl.replace(/\/$/, "");
}
