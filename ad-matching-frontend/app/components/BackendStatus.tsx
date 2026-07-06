"use client";

import { useEffect, useState } from "react";
import { healthCheck } from "@/services/api";

export default function BackendStatus() {
  const [status, setStatus] = useState<"checking" | "online" | "offline">(
    "checking"
  );

  useEffect(() => {
    const check = async () => {
      const isOnline = await healthCheck();
      setStatus(isOnline ? "online" : "offline");
    };

    check();

    // Re-check every 30 seconds
    const interval = setInterval(check, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="backend-status">
      <span className={`status-dot status-${status}`} />
      <span className="status-text">
        {status === "checking"
          ? "Checking..."
          : status === "online"
            ? "AI Online"
            : "AI Offline"}
      </span>
    </div>
  );
}
