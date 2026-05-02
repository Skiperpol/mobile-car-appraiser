import axios from "axios";
import { getApiBaseUrl } from "@/lib/api-config";

export const apiClient = axios.create({
  baseURL: getApiBaseUrl(),
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});
