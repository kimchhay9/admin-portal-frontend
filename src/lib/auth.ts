export type AuthToken = string;

export function getAuthToken(): AuthToken | null {
  if (typeof window === "undefined") {
    return null;
  }
  return window.localStorage.getItem("auth_token");
}

export function setAuthToken(token: AuthToken): void {
  if (typeof window === "undefined") {
    return;
  }
  window.localStorage.setItem("auth_token", token);
}

export function clearAuthToken(): void {
  if (typeof window === "undefined") {
    return;
  }
  window.localStorage.removeItem("auth_token");
}
