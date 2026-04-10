"use client";
import {
  gsap,
  mediaQueries,
  SplitText,
  ScrollSmoother,
} from "@utils/gsap/gsap";
import { useGSAP } from "@gsap/react";
import useWindowSizeListener from "../useWindowSizeListener";

/** Custom hook to handle GSAP animations in hero-section in the Home page */
export default function useHeroSectionGSAP() {
  const resizeKey = useWindowSizeListener();
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        // media queries conditions giving a responsive animation
        // based on screen size and reduce motion
        mediaQueries,
        (context) => {
          const smoother = ScrollSmoother.get();
          if (smoother) smoother.effects().forEach((t) => t.kill());
          smoother?.effects("[data-speed], [data-lag]");

          const { isReduceMotion } = context.conditions ?? {};
          /** handle animation of CTA buttons */
          const animateCTA = () => {
            const keyframes = isReduceMotion
              ? {
                  "0%": { opacity: 0 },
                  "100%": { opacity: 1 },
                }
              : {
                  "0%": { opacity: 0, scaleX: 0, scaleY: 0 },
                  "75%": { opacity: 1, scaleX: 1.2, scaleY: 1.2 },
                  "100%": { opacity: 1, scaleX: 1, scaleY: 1 },
                };
            gsap.to(".list-discover-button", {
              duration: 0.5,
              keyframes: keyframes,
              scrollTrigger: {
                trigger: ".list-discover-button",
                start: "top 95%",
              },
            });

            gsap.to(".list-about-me-button", {
              duration: 0.8,
              keyframes: keyframes,
              scrollTrigger: {
                trigger: ".list-about-me-button",
                start: "top 95%",
              },
            });
          };

          /** handle animation of SplitText */
          const animateSplitText = () => {
            document.fonts.ready.then(() => {
              // 1. Split the text
              const split_h1 = SplitText.create(".split-words", {
                type: "words",
                autoSplit: true,
              });

              // 2. Initialize Timeline
              const timeline = gsap.timeline({
                scrollTrigger: {
                  trigger: ".split-words",
                  start: "top 85%",
                },
              });

              // 3. Add Text Animation to Timeline
              if (isReduceMotion) {
                timeline.from(".split-words", {
                  y: 100,
                  autoAlpha: 0,
                  duration: 1,
                });
              } else {
                timeline
                  .from(split_h1.words, {
                    y: 100,
                    autoAlpha: 0,
                    stagger: {
                      amount: 1,
                      from: "random",
                      ease: "power4.in",
                    },
                  })
                  .from("#line", {
                    drawSVG: "100% 100%",
                    autoAlpha: 0,
                    duration: 1,
                    ease: "expo.out",
                    onComplete: () => split_h1.revert(),
                  });
              }
            });
          };

          /** handle animation of hero image */
          const scrollableHeroImage = () => {
            const frameCount = 47;
            const canvas = document.getElementById("hero-canvas");
            canvas?.setAttribute("width", "600px");
            canvas?.setAttribute("height", "1200px");
            const ctx = (canvas as HTMLCanvasElement).getContext("2d");
            const images: HTMLImageElement[] = [];
            const heroImage = {
              frame: 0,
            };
            // load all images and draw the first one
            for (let i = 1; i < frameCount; i++) {
              const img = new Image();
              img.src = `/home-page/home-page_${i}.png`;
              img.loading = "eager";
              images.push(img);
            }
            images[0].onload = () => ctx?.drawImage(images[0], -350, 0);

            /** handles canvas drawing when scrolling */
            const updateImage = () => {
              const img = images[Math.round(heroImage.frame)];
              if (img && ctx) {
                ctx.clearRect(0, 0, 600, 1200);
                ctx.drawImage(img, -350, 0);
              }
            };

            // animate the canvas based on scroll position
            gsap.to(heroImage, {
              frame: images.length - 1,
              ease: "none",
              scrollTrigger: {
                trigger: "#hero-canvas",
                start: "top center",
                end: "bottom 90%",
                scrub: true,
                onUpdate: updateImage,
                invalidateOnRefresh: true,
              },
            });
          };

          animateCTA();
          animateSplitText();
          scrollableHeroImage();
        },
      );
    },

    { dependencies: [resizeKey], revertOnUpdate: true },
  );
}
