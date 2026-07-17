const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

interface RequestOptions extends RequestInit {
  auth?: boolean;
}


export async function apiClient<T = unknown>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const { auth = false, ...fetchOptions } = options;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...fetchOptions.headers,
  };

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...fetchOptions,
    credentials: "include",
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({
      error: { code: "UNKNOWN", message: "Something went wrong" },
    }));
    throw new Error(
      error?.error?.message ?? `Request failed with status ${response.status}`
    );
  }

  return response.json();
}

export { API_URL };
