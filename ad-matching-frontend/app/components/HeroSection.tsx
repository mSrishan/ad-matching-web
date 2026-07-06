"use client";

import { useEffect, useState } from "react";

export default function HeroSection() {
  const [typedText, setTypedText] = useState("");
  const fullText =
    "Search ads in Sinhala, Singlish, or English — our AI understands them all.";

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i <= fullText.length) {
        setTypedText(fullText.slice(0, i));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero-section">
      <div className="hero-badge">
        <span className="hero-badge-dot" />
        Powered by Singlish SBERT
      </div>
      <h1 className="hero-title">
        <span className="hero-title-line">AI Ad</span>
        <span className="hero-title-gradient">Matcher</span>
      </h1>
      <p className="hero-subtitle">
        {typedText}
        <span className="typing-cursor">|</span>
      </p>
    </section>
  );
}
