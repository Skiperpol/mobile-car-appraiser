import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("Niepoprawny format email"),
  password: z.string().min(6, "Hasło musi mieć min. 6 znaków"),
});
