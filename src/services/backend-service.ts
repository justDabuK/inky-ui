import { DefaultApi } from "@/services/backend/generated/api/default-api";

const BASE_PATH = "http://192.168.178.77:8000";

export const API = new DefaultApi({
  basePath: BASE_PATH
});
