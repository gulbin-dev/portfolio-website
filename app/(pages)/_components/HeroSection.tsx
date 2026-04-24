"use client";

import Link from "next/link";
import { useLoading } from "@utils/LoadingContext";
import dynamic from "next/dynamic";
import useWindowSizeListener from "@hooks/useWindowSizeListener";
import { useEffect } from "react";
import { gsap, mediaQueries, SplitText, useGSAP } from "@utils/gsap";
import { useRef } from "react";

const Canvas = dynamic(() =>
  import("./hero-section/HeroSectionComponents").then(
    (component) => component.Canvas,
  ),
);

export default function HeroSection() {
  const { isRevealed } = useLoading();
  const windowResize = useWindowSizeListener();
  const heroSectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {}, [windowResize]);

  // hero section elements animation
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(
        // media queries conditions giving a responsive animation
        // based on screen size and reduce motion
        mediaQueries,
        (context) => {
          const { isReduceMotion } = context.conditions ?? {};
          /** handle animation of CTA buttons */
          gsap.set(".hero-p", { opacity: 0, y: 100 });
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
                start: "bottom bottom",
                end: "bottom+=150 bottom",
              },
            });

            gsap.to(".list-about-me-button", {
              duration: 0.8,
              keyframes: keyframes,
              scrollTrigger: {
                trigger: ".list-about-me-button",
                start: "bottom bottom",
                end: "bottom+=150 bottom",
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
          gsap.to(".hero-p", {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power4.out",
          });
          animateCTA();
          animateSplitText();
        },
      );
    },
    { dependencies: [isRevealed], revertOnUpdate: true, scope: heroSectionRef },
  );

  return (
    <section
      ref={heroSectionRef}
      id="home-top"
      className="section w-full h-full overflow-hidden relative linear-bg z-0 tablet-portrait:h-screen"
    >
      <div className="place-self-center max-w-180 h-full tablet-portrait:flex tablet-landscape:h-fit!">
        <div className="relative z-1 px-3 pt-10 tablet-portrait:pt-15 h-full">
          <h1
            aria-hidden
            className="split-words text-pretty text-heading-lg tablet-portrait:text-heading-xl pt-7 tablet-portrait:pt-0 desktop:text-heading-md"
          >
            Frontend Developer{" "}
            <span className="relative">
              Building
              <svg
                className="absolute -bottom-2  tablet-portrait:scale-y-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 99.98 16.76"
              >
                <path
                  id="line"
                  className=""
                  d="M98.48,15.26L7.69,11.82l81.2-5.73L1.5,1.5"
                  style={{
                    fill: "none",
                    stroke: "#ac62ff",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: "3px",
                  }}
                />
              </svg>
            </span>{" "}
            Predictable React Interfaces
          </h1>
          <h1 className="sr-only">
            Frontend Developer Building Predictable React Interfaces
          </h1>
          <p className="hero-p mt-4 tablet-portrait:mt-3">
            Helping teams deliver high-performance React applications with a
            focus on accessibility and SEO.
          </p>
          <ul className="my-6 flex flex-col gap-5.5 w-fit h-full tablet-portrait:my-4 tablet-portrait:gap-4">
            <li className="list-discover-button opacity-0 group">
              <Link
                href="/discover"
                className="relative block w-30 h-5 rounded-lg bg-action-color text-dark-foreground overflow-hidden font-bold"
              >
                <div className="absolute inset-0 flex items-center justify-center transition-colors duration-500">
                  CHECK MY WORKS
                </div>
                <div className="absolute inset-0 flex items-center justify-center bg-col-neutral-2 text-light-foreground transition-transform duration-500 translate-y-full group-hover:translate-y-0">
                  YOU MIGHT LIKE IT
                </div>
              </Link>
            </li>

            <li className="list-about-me-button opacity-0 group">
              <Link
                href="/about"
                className="relative inline-block w-30 h-5 rounded-lg bg-action-color text-dark-foreground overflow-hidden font-bold"
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  KNOW MORE ABOUT ME
                </div>

                <div className="absolute inset-0 flex items-center justify-center bg-col-neutral-2 text-light-foreground transition-transform duration-500 translate-y-full group-hover:translate-y-0">
                  CONTACT ME IF YOU CAN
                </div>
              </Link>
            </li>
          </ul>
        </div>
        <div className="relative! h-60 w-full z-1 overflow-hidden tablet-portrait:h-screen tablet-portrait:inset-0!">
          <Canvas />
        </div>
      </div>
    </section>
  );
}
