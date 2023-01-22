import { Configuration, DefaultApi } from './backend/generated';

const BASE_PATH = 'http://192.168.178.30:8000';

export const API = new DefaultApi(
  new Configuration({
    basePath: BASE_PATH,
  })
);

export function getAdjustedDownloadPath(imageName: string) {
  return `${BASE_PATH}/images/adjusted/get/${imageName}/download`;
}
