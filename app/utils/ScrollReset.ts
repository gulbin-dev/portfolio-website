"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { ScrollTrigger, ScrollSmoother } from "./gsap";

export default function ScrollReset() {
  const pathname = usePathname();

  useEffect(() => {
    const smoother = ScrollSmoother.get();

    if (smoother) {
      smoother.scrollTop(0);

      // Clear any cached scroll memory from ScrollTrigger
      ScrollTrigger.clearScrollMemory();

      // Refresh ScrollTrigger to recalculate for the new page layout
      // Use requestAnimationFrame to ensure the DOM has updated first
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    }
  }, [pathname]);

  return null;
}
