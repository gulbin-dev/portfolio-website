"use client";
import { gsap, mediaQueries, SplitText } from "@utils/gsap/gsap";
import { useGSAP } from "@gsap/react";
import useWindowSizeListener from "../useWindowSizeListener";

/** Custom hook to handle GSAP animations in cards skill animation in the Home page */
export default function useCardSkillGSAP() {
  const resizeKey = useWindowSizeListener();
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        // media queries conditions giving a responsive animation
        // based on screen size and reduce motion
        mediaQueries,
        (context) => {
          const { reduceMotion } = context.conditions ?? {};
          const listCardSkills = gsap.utils.toArray(".list-card-skill");

          gsap.to(listCardSkills, {
            yPercent: -100 * (listCardSkills.length - 1),
            opacity: 0.5,
            ease: "none",
            scrollTrigger: {
              trigger: ".container-cards",
              pin: true,
              pinSpacing: true,
              pinSpacer: "#pin-section",
              scrub: 1,
              anticipatePin: 1,
              snap: 1 / (listCardSkills.length - 1),
              end: () =>
                "+=" +
                (document.querySelector(".list-card-skill") as HTMLDivElement)
                  .offsetHeight,
            },
          });

          //  wait for fonts to be loaded before animating SplitText
          document.fonts.ready.then(() => {
            const cardSkillP = SplitText.create(".card-skill-p", {
              type: "words",
              autoSplit: true,
              mask: "words",
            });

            const timeline = gsap.timeline({
              scrollTrigger: {
                trigger: ".card-skill-header",
                start: "top 70%",
              },
            });
            timeline
              .from(".card-skill-header", {
                y: -100,
                opacity: 0,
                duration: 1,
              })
              .from(
                cardSkillP.words,
                {
                  y: -50,
                  opacity: 0,
                  autoAlpha: 0,
                  stagger: {
                    amount: 1,
                    from: "random",
                    ease: reduceMotion ? "none" : "power4.in",
                  },
                },
                "-=0.5",
              );
          });
        },
      );
    },

    { dependencies: [resizeKey], revertOnUpdate: true },
  );
}
