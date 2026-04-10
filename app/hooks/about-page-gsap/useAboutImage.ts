"use client";
import { gsap, mediaQueries, useGSAP } from "@utils/gsap/gsap";
import useWindowSizeListener from "../useWindowSizeListener";

/** Custom hook to handle GSAP animations in the About page */
export default function useAboutImage() {
  const resizeKey = useWindowSizeListener();
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        // media queries conditions giving a responsive animation
        // based on screen size and reduce motion
        mediaQueries,
        (context) => {
          const { isSmallScreen } = context.conditions ?? {};

          /** handle animation of hero image */
          const scrollableAboutImage = () => {
            const frameCount = 47;
            const canvas = document?.getElementById("about-canvas");
            canvas?.setAttribute("width", "600px");
            canvas?.setAttribute("height", "800px");
            const ctx = (canvas as HTMLCanvasElement).getContext("2d");
            if (isSmallScreen) ctx?.scale(1, 1);
            else ctx?.scale(0.8, 0.8);
            const drawX = isSmallScreen ? -350 : -350;
            const images: HTMLImageElement[] = [];
            const aboutmage = {
              frame: -18,
            };
            // load all images and draw the first one
            for (let i = 1; i < frameCount; i++) {
              const img = new Image();
              img.src = `/home-page/home-page_${i}.png`;
              img.loading = "eager";
              images.push(img);
            }

            if (isSmallScreen)
              images[44].onload = () => ctx?.drawImage(images[44], drawX, 0);
            else images[0].onload = () => ctx?.drawImage(images[0], drawX, 0);

            /** handles canvas drawing when scrolling */
            const updateImage = () => {
              const index = Math.round(aboutmage.frame);

              const img = images[index];
              if (img && ctx) {
                ctx.clearRect(0, 0, 600, 1200);
                ctx.drawImage(img, drawX, 0);
              }
            };

            // animate the canvas based on scroll position
            gsap.to(aboutmage, {
              frame: images.length - 1,
              ease: "none",
              immediateRender: true,
              scrollTrigger: {
                trigger: "#about-canvas",
                start: "top center",
                end: isSmallScreen ? "bottom+=200 top" : "bottom+=500 90%",
                scrub: true,
                onUpdate: isSmallScreen ? undefined : updateImage,
                invalidateOnRefresh: true,
              },
            });
          };
          scrollableAboutImage();
        },
      );
    },

    { dependencies: [resizeKey], revertOnUpdate: true },
  );
}
