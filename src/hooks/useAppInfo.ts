import Constants from "expo-constants";

type AppInfo = {
  version: string;
  lastUpdate: string;
};

function formatPolishDate(date: Date) {
  return new Intl.DateTimeFormat("pl-PL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export function useAppInfo(): AppInfo {
  const version = Constants.expoConfig?.version ?? "Brak danych";

  // Prefer explicit app metadata from app config.
  // Example in app.json/app.config.ts: extra.lastUpdateAt = "2026-03-19"
  const lastUpdateAt = Constants.expoConfig?.extra?.lastUpdateAt as
    | string
    | undefined;

  const parsedDate = lastUpdateAt ? new Date(lastUpdateAt) : null;
  const isValidDate = parsedDate != null && !Number.isNaN(parsedDate.getTime());

  return {
    version,
    lastUpdate: isValidDate ? formatPolishDate(parsedDate) : "Brak danych",
  };
}
