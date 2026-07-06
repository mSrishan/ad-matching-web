"use client";

import { useState } from "react";
import { searchAds, AdResult } from "@/services/api";
import HeroSection from "./components/HeroSection";
import SearchInput from "./components/SearchInput";
import ResultCard from "./components/ResultCard";
import StatsBar from "./components/StatsBar";

export default function Home() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<AdResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchMeta, setSearchMeta] = useState<{
    query: string;
    duration: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    setHasSearched(true);
    try {
      const { response, duration } = await searchAds(query);
      setResults(response.results);
      setSearchMeta({ query: response.query, duration });
    } catch {
      setError(
        "Backend එකට සම්බන්ධ වෙන්න බැහැ! (Cannot connect to backend)"
      );
      setResults([]);
      setSearchMeta(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="main-content">
      {/* Hero headline with typing animation */}
      <HeroSection />

      {/* Glassmorphism search bar */}
      <SearchInput
        value={query}
        onChange={setQuery}
        onSubmit={handleSearch}
        loading={loading}
      />

      {/* Error banner */}
      {error && (
        <div className="error-banner">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="error-icon"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 8v4M12 16h.01" />
          </svg>
          {error}
        </div>
      )}

      {/* Search stats bar */}
      {searchMeta && !error && (
        <StatsBar
          query={searchMeta.query}
          resultCount={results.length}
          duration={searchMeta.duration}
        />
      )}

      {/* Result cards */}
      <div className="results-container">
        {results.map((result, index) => (
          <ResultCard key={result.id} result={result} index={index} />
        ))}
      </div>

      {/* Empty state */}
      {hasSearched && !loading && results.length === 0 && !error && (
        <div className="empty-state">
          <div className="empty-state-icon">🔍</div>
          <h3 className="empty-state-title">No matches found</h3>
          <p className="empty-state-text">
            Try searching with different keywords in Sinhala, Singlish, or
            English
          </p>
        </div>
      )}

      {/* Footer */}
      <footer className="app-footer">
        <p>
          Built with <span className="footer-heart">♥</span> using Singlish
          SBERT &amp; FastAPI
        </p>
      </footer>
    </main>
  );
}
