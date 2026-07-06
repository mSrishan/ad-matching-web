"use client";

interface StatsBarProps {
  query: string;
  resultCount: number;
  duration: number;
}

export default function StatsBar({
  query,
  resultCount,
  duration,
}: StatsBarProps) {
  return (
    <div className="stats-bar">
      <div className="stats-item">
        <span className="stats-label">Query</span>
        <span className="stats-value">&ldquo;{query}&rdquo;</span>
      </div>
      <div className="stats-divider" />
      <div className="stats-item">
        <span className="stats-label">Results</span>
        <span className="stats-value">{resultCount}</span>
      </div>
      <div className="stats-divider" />
      <div className="stats-item">
        <span className="stats-label">Time</span>
        <span className="stats-value">{duration}ms</span>
      </div>
      <div className="stats-divider" />
      <div className="stats-item">
        <span className="stats-label">Model</span>
        <span className="stats-value">Singlish SBERT</span>
      </div>
    </div>
  );
}
