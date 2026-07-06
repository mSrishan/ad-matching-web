"use client";

import { useEffect, useRef } from "react";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  loading: boolean;
  placeholder?: string;
}

export default function SearchInput({
  value,
  onChange,
  onSubmit,
  loading,
  placeholder,
}: SearchInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  // Ctrl+K keyboard shortcut to focus search
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim() && !loading) onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="search-container">
      <div
        className={`search-input-wrapper ${loading ? "search-loading" : ""}`}
      >
        {/* Search icon */}
        <svg
          className="search-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21l-4.35-4.35" />
        </svg>

        <input
          ref={inputRef}
          id="search-input"
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder || "මොනවද ඕනේ? (What are you looking for?)"}
          className="search-input"
          disabled={loading}
          autoComplete="off"
        />

        {/* Clear button */}
        {value && !loading && (
          <button
            type="button"
            onClick={() => onChange("")}
            className="search-clear"
            aria-label="Clear search"
          >
            ✕
          </button>
        )}

        {/* Loading spinner */}
        {loading && <div className="search-spinner" />}

        {/* Keyboard shortcut hint */}
        <div className="search-shortcut">
          <kbd>Ctrl</kbd>
          <kbd>K</kbd>
        </div>
      </div>

      <button
        type="submit"
        className="search-button"
        disabled={loading || !value.trim()}
        id="search-submit"
      >
        {loading ? (
          <span className="button-loading">Searching...</span>
        ) : (
          <>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="button-icon"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
            සොයන්න
          </>
        )}
      </button>
    </form>
  );
}
