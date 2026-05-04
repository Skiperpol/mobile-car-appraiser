function getDevApiBaseUrl(): string {
  const host = "192.168.101.115";

  return `http://${host}:3000/v1`;
}

export function getApiBaseUrl(): string {
  const baseUrl = process.env.EXPO_PUBLIC_API_BASE_URL || getDevApiBaseUrl();

  return baseUrl.replace(/\/$/, "");
}
