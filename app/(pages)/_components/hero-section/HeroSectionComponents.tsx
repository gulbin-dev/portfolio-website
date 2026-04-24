import { useLoading } from "@utils/LoadingContext";
import { frameImages } from "@utils/imageSequence";
import { ImageSequenceConfig } from "@utils/types";
import { gsap, mediaQueries, ScrollSmoother, useGSAP } from "@utils/gsap";
import { useRef } from "react";

export const Canvas = () => {
  const { isRevealed } = useLoading();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // image sequence animation
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(mediaQueries, (context) => {
        // fetch and reapply ScrollSmoother effects
        const smoother = ScrollSmoother.get();
        if (smoother) smoother.effects().forEach((t) => t.kill());
        smoother?.effects("[data-speed], [data-lag]");

        // gsap.matchMedia contitions
        const { isMobilePortraitScreen, isDesktopScreen } =
          context.conditions ?? {};

        const canvas = document.getElementById("hero-canvas");
        canvas?.setAttribute("width", "420px");
        canvas?.setAttribute("height", "720px");

        const { placeholderImage, playhead, images } = frameImages;

        const imageSequence = (config: ImageSequenceConfig) => {
          const canvasElement = gsap.utils.toArray(
            config.canvas,
          )[0] as HTMLCanvasElement;
          const ctx = canvasElement.getContext("2d");
          if (!isMobilePortraitScreen) ctx!.scale(0.7, 0.7);
          else ctx!.scale(1, 1);
          const updateImage = () => {
            const currentImg = images[Math.round(playhead.frame)];

            // draw the placeholderImage with blur filter while the current frame still loads
            if (currentImg && !currentImg.complete) {
              ctx!.clearRect(0, 0, canvasElement.width, canvasElement.height);
              ctx!.filter = "blur(10px)";
              const x = (canvasElement.width - currentImg.width) / 2;
              ctx!.drawImage(placeholderImage, x, isDesktopScreen ? 80 : 0);

              // add text on canvas
              ctx!.filter = "blur(0px)"; // Reset filter so text isn't blurry
              ctx!.fillStyle = "white"; // Change color to match your UI
              ctx!.font = "20px Arial"; // Adjust size and font family
              ctx!.textAlign = "center";
              ctx!.textBaseline = "middle";
              ctx!.fillText(
                "Loading Image...",
                canvasElement.width / 2,
                canvasElement.height / 2,
              );

              // Only draw if the image is actually loaded/exists
            } else if (currentImg && currentImg.complete) {
              ctx!.clearRect(0, 0, canvasElement.width, canvasElement.height);
              ctx!.filter = "blur(0px)";
              const x = (canvasElement.width - currentImg.width) / 2;
              ctx!.drawImage(currentImg, x, isDesktopScreen ? 80 : 0);
            }
          };

          // Draw placeholder immediately if cached, otherwise on load
          if (placeholderImage.complete) {
            updateImage();
          } else {
            placeholderImage.onload = updateImage;
          }

          images.forEach((img, i) => {
            img.onload = () => {
              if (Math.floor(playhead.frame) === i) updateImage();
            };
          });

          updateImage();

          // the animation responsible for the frame animation
          return gsap.to(playhead, {
            frame: images.length - 1,
            ease: "none",
            onUpdate: updateImage,
            scrollTrigger: config.scrollTrigger,
          });
        };

        imageSequence({
          canvas: "#hero-canvas",
          scrollTrigger: {
            trigger: "#hero-canvas",
            start: isMobilePortraitScreen ? "top 60%" : "top top",
            id: "hero-canvas-scroll",
            end: isMobilePortraitScreen ? "bottom 90%" : "20% top",
            scrub: true,
            invalidateOnRefresh: true,
          },
        });
      });
    },
    { dependencies: [isRevealed], revertOnUpdate: true },
  );

  return (
    <canvas
      id="hero-canvas"
      className="absolute tablet-portrait:max-w-none top-25 mobile-landscape:left-1/2 mobile-landscape:-translate-x-1/2! tablet-portrait:left-0 tablet-portrait:top-15 tablet-portrait:translate-x-0! desktop:left-1/2"
      data-speed="0.5"
    ></canvas>
  );
};
