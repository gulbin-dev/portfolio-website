"use client";
import { gsap, ScrollTrigger } from "@utils/gsap/gsap";
import { useGSAP } from "@gsap/react";

/** Custom hook to handle GSAP animations on header when scrolling */
export default function useHeaderTransition() {
  useGSAP(() => {
    let isScrollingDown = true;
    const createHeaderAnimation = () => {
      const showHeaderAnim = gsap.to("#header", {
        yPercent: -100,
        duration: 0.5,
        paused: true,
        id: "showHeaderAnim",
      });
      ScrollTrigger.create({
        animation: showHeaderAnim,
        start: 0,
        end: "max",
        onUpdate: (self) => {
          if (self.direction === -1 && isScrollingDown) {
            isScrollingDown = false;
            showHeaderAnim.reverse();
          } else if (self.direction === 1 && !isScrollingDown) {
            isScrollingDown = true;
            showHeaderAnim.play();
          }
        },
      });
    };

    createHeaderAnimation();
  });
}
