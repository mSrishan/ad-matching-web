// services/api.ts — Typed API service for the FastAPI backend

export interface SearchRequest {
  query: string;
  top_k?: number;
}

export interface AdResult {
  id: string;
  text: string;
  similarity_score: number;
}

export interface SearchResponse {
  query: string;
  results: AdResult[];
}

export interface SearchResult {
  response: SearchResponse;
  duration: number;
}

const API_BASE = "http://localhost:8000";

/**
 * Perform a semantic ad search via the backend AI engine.
 * Returns both the search response and the round-trip duration in ms.
 */
export async function searchAds(
  query: string,
  top_k: number = 5
): Promise<SearchResult> {
  const start = performance.now();

  const res = await fetch(`${API_BASE}/api/search`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, top_k } as SearchRequest),
  });

  if (!res.ok) {
    throw new Error(`API Error: ${res.status} ${res.statusText}`);
  }

  const response: SearchResponse = await res.json();
  const duration = Math.round(performance.now() - start);

  return { response, duration };
}

/**
 * Ping the backend root endpoint to check if the AI engine is online.
 * Returns true if the server responds within 3 seconds.
 */
export async function healthCheck(): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE}/`, {
      method: "GET",
      signal: AbortSignal.timeout(3000),
    });
    return res.ok;
  } catch {
    return false;
  }
}
