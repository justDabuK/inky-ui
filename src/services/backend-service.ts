import { DefaultApi } from "@/services/backend/generated/api/default-api";

const BASE_PATH = "http://inky.fritz.box:8000";

export const API = new DefaultApi({
  basePath: BASE_PATH
});
