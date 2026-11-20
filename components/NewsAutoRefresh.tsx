"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function NewsAutoRefresh() {
  const router = useRouter();

  useEffect(() => {
    const interval = 5 * 60 * 1000;
    let lastRefresh = Date.now();
    function refreshIfDue() {
      const now = Date.now();
      if (document.hidden || now - lastRefresh < interval) return;
      lastRefresh = now;
      router.refresh();
    }
    const timer = window.setInterval(refreshIfDue, interval);
    document.addEventListener("visibilitychange", refreshIfDue);
    return () => {
      window.clearInterval(timer);
      document.removeEventListener("visibilitychange", refreshIfDue);
    };
  }, [router]);

  return null;
}
