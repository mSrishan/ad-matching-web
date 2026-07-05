"use client";
import { useState } from "react";
import { searchAds } from "../services/api";

export default function Home() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await searchAds(query);
      setResults(data.results);
    } catch (err) {
      alert("Backend එකට සම්බන්ධ වෙන්න බැහැ!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen p-10 bg-gray-50">
      <h1 className="text-4xl font-bold text-center mb-10">
        AI Marketplace Search
      </h1>

      <form onSubmit={handleSearch} className="max-w-2xl mx-auto flex gap-2">
        <input
          className="flex-1 p-3 border rounded"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="මොනවද ඕනේ?"
        />
        <button className="bg-blue-600 text-white px-6 rounded" type="submit">
          සොයන්න
        </button>
      </form>

      <div className="max-w-2xl mx-auto mt-10">
        {results.map((ad: any) => (
          <div key={ad.id} className="bg-white p-4 mb-4 rounded shadow">
            <p className="font-medium">{ad.text}</p>
            <div className="w-full bg-gray-200 h-2 mt-2">
              <div
                className="bg-blue-600 h-2"
                style={{ width: `${ad.similarity_score}%` }}
              ></div>
            </div>
            <p className="text-sm mt-1">
              AI Similarity: {ad.similarity_score}%
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}
