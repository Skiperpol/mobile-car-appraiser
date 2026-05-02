export function formatValidationMessage(payload: unknown): string | null {
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
          const c = (item as { constraints?: Record<string, string> })
            .constraints;
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
