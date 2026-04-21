"use client";
import { useState, useEffect } from "react";
import { useLoading } from "@utils/LoadingContext";
export default function GlobalLoader() {
  const [isWindowLoaded, setIsWindowLoaded] = useState(false);
  const { setRevealed, isRevealed } = useLoading();
  useEffect(() => {
    // 1. Block scroll while loading

    const handleLoad = () => setIsWindowLoaded(true);
    if (document.readyState === "complete") handleLoad();
    else window.addEventListener("load", handleLoad);

    return () => {
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  useEffect(() => {
    if (isWindowLoaded) setRevealed(true);
  }, [isWindowLoaded, setRevealed]);
  return (
    !isRevealed && (
      <div className="loader-bg min-h-screen fixed min-w-screen inset flex items-center justify-center bg-linear-to-br from-primary-color to-primary-color-darker overflow-hidden z-9999">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-action-color mx-auto mb-4"></div>
          <p className="text-lg text-foreground">Loading page...</p>
          <p className="mt-1">First time visit may take a while to load</p>
        </div>
      </div>
    )
  );
}
