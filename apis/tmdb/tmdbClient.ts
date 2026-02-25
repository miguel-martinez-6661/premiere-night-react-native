import { TMDB_BASE_URL, TMDB_LANGUAGE } from "@/constants";

const baseUrl = TMDB_BASE_URL;
const language = TMDB_LANGUAGE;

/** Set via env (e.g. EXPO_PUBLIC_TMDB_API_KEY) or at runtime. */
let apiKey = process.env.EXPO_PUBLIC_TMDB_API_KEY ?? "";

export function setTmdbApiKey(key: string) {
  apiKey = key;
}

export function getTmdbApiKey(): string {
  return apiKey;
}

export class TmdbError extends Error {
  constructor(
    message: string,
    public readonly status?: number,
    public readonly body?: unknown
  ) {
    super(message);
    this.name = "TmdbError";
  }
}

async function buildUrl(path: string, params: Record<string, string> = {}): Promise<string> {
  const search = new URLSearchParams({
    language,
    ...params,
  });
  const separator = path.includes("?") ? "&" : "?";
  return `${baseUrl}${path}${separator}${search.toString()}`;
}

export async function tmdbRequest<T>(
  path: string,
  params: Record<string, string> = {}
): Promise<T> {
  if (!apiKey) {
    throw new TmdbError("TMDb API key is not set. Set EXPO_PUBLIC_TMDB_API_KEY or call setTmdbApiKey().");
  }

  const url = await buildUrl(path, params);
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  });

  let body: unknown;
  const contentType = res.headers.get("content-type");
  if (contentType?.includes("application/json")) {
    body = await res.json();
  } else {
    body = await res.text();
  }

  if (!res.ok) {
    const message =
      typeof body === "object" && body !== null && "status_message" in body
        ? String((body as { status_message?: string }).status_message)
        : res.statusText || `HTTP ${res.status}`;
    throw new TmdbError(message, res.status, body);
  }

  return body as T;
}
