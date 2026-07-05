// services/api.ts
export async function searchAds(query: string) {
  const res = await fetch("http://localhost:8000/api/search", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, top_k: 5 }),
  });

  if (!res.ok) throw new Error("API Error");
  return res.json();
}
