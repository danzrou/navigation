import { parseJson, stringifyJSON } from '@siemplify/utils';

export function encodeNavData<T extends object>(navigationData: T) {
  const jsonString = stringifyJSON(navigationData);
  return btoa(jsonString);
}

export function decodeNavData<T = any>(encodedData: string): T {
  const jsonString = atob(encodedData);
  return parseJson<T>(jsonString);
}
