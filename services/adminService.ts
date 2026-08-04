import { config } from "../src/config";
import { AdminStats, AdminUserSummary, AdminVerificationRecord } from "../types";

function getToken(): string | null {
  return localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
}

async function authedGet<T>(path: string): Promise<T> {
  const token = getToken();
  const response = await fetch(`${config.API_BASE_URL}${path}`, {
    headers: { Authorization: "Bearer " + token },
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || `Request to ${path} failed`);
  }

  return response.json();
}

export const adminService = {
  getStats(): Promise<AdminStats> {
    return authedGet<AdminStats>("/admin/stats");
  },
  getUsers(): Promise<AdminUserSummary[]> {
    return authedGet<AdminUserSummary[]>("/admin/users");
  },
  getRecords(limit = 100): Promise<AdminVerificationRecord[]> {
    return authedGet<AdminVerificationRecord[]>(`/admin/records?limit=${limit}`);
  },
};
