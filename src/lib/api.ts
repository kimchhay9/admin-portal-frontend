export const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";

export function getApiUrl(path: string): string {
  if (!path.startsWith("/")) {
    return `${apiBaseUrl}/${path}`;
  }
  return `${apiBaseUrl}${path}`;
}
