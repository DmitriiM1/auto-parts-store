export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string 
export const ADMIN_TOKEN = import.meta.env.VITE_ADMIN_TOKEN

export function getAdminHeaders(): Record<string, string> {
  if (!ADMIN_TOKEN) {
    return {}
  }

  return {
    'x-admin-token': ADMIN_TOKEN,
  }
}