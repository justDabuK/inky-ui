import { DefaultApi } from './backend/generated';

const BASE_PATH = 'http://192.168.178.66:8000';

export const API = new DefaultApi({
  basePath: BASE_PATH,
});

export function getAdjustedDownloadPath(imageName: string) {
  return `${BASE_PATH}/images/adjusted/get/${imageName}/download`;
}
