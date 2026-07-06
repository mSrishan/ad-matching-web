"use client";

import ScoreRing from "./ScoreRing";
import { AdResult } from "@/services/api";

interface ResultCardProps {
  result: AdResult;
  index: number;
}

export default function ResultCard({ result, index }: ResultCardProps) {
  const getScoreLabel = (score: number) => {
    if (score >= 80) return { text: "Excellent Match", className: "badge-success" };
    if (score >= 50) return { text: "Good Match", className: "badge-warning" };
    return { text: "Partial Match", className: "badge-danger" };
  };

  const label = getScoreLabel(result.similarity_score);

  const getBarGradient = (score: number) => {
    if (score >= 80) return "linear-gradient(90deg, #10b981, #34d399)";
    if (score >= 50) return "linear-gradient(90deg, #f59e0b, #fbbf24)";
    return "linear-gradient(90deg, #f43f5e, #fb7185)";
  };

  return (
    <div
      className="result-card"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="result-card-content">
        <div className="result-card-left">
          <span className={`result-badge ${label.className}`}>
            {label.text}
          </span>
          <p className="result-text">{result.text}</p>
          <span className="result-id">Ad #{result.id}</span>
        </div>
        <div className="result-card-right">
          <ScoreRing score={result.similarity_score} size={72} strokeWidth={5} />
        </div>
      </div>
      {/* Similarity progress bar */}
      <div className="result-card-bar">
        <div
          className="result-card-bar-fill"
          style={{
            width: `${result.similarity_score}%`,
            background: getBarGradient(result.similarity_score),
          }}
        />
      </div>
    </div>
  );
}
