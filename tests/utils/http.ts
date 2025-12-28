/**
 * HTTP Client Utility for API Testing
 */

const BASE_URL = process.env.TEST_BASE_URL || "http://localhost:3000";

interface RequestOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  body?: unknown;
  headers?: Record<string, string>;
  cookie?: string;
}

interface TestResponse<T = unknown> {
  status: number;
  data: T;
  headers: Headers;
  ok: boolean;
}

export async function request<T = unknown>(
  path: string,
  options: RequestOptions = {}
): Promise<TestResponse<T>> {
  const { method = "GET", body, headers = {}, cookie } = options;

  const fetchHeaders: Record<string, string> = {
    "Content-Type": "application/json",
    ...headers,
  };

  if (cookie) {
    fetchHeaders["Cookie"] = cookie;
  }

  const response = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: fetchHeaders,
    body: body ? JSON.stringify(body) : undefined,
  });

  let data: T;
  try {
    data = await response.json();
  } catch {
    data = {} as T;
  }

  return {
    status: response.status,
    data,
    headers: response.headers,
    ok: response.ok,
  };
}

// Shorthand methods
export const get = <T = unknown>(path: string, options?: Omit<RequestOptions, "method">) =>
  request<T>(path, { ...options, method: "GET" });

export const post = <T = unknown>(path: string, body?: unknown, options?: Omit<RequestOptions, "method" | "body">) =>
  request<T>(path, { ...options, method: "POST", body });

export const put = <T = unknown>(path: string, body?: unknown, options?: Omit<RequestOptions, "method" | "body">) =>
  request<T>(path, { ...options, method: "PUT", body });

export const del = <T = unknown>(path: string, options?: Omit<RequestOptions, "method">) =>
  request<T>(path, { ...options, method: "DELETE" });
