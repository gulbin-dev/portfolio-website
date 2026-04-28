import { gsap, mediaQueries, useGSAP, ScrollSmoother } from "@utils/gsap";
import { frameImages } from "@utils/imageSequence";
import { ImageSequenceConfig } from "@utils/types";

export default function AboutCanvas() {
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        // media queries conditions giving a responsive animation
        // based on screen size and reduce motion
        mediaQueries,
        (context) => {
          // fetch and reapply ScrollSmoother effects
          const smoother = ScrollSmoother.get();
          if (smoother) smoother.effects().forEach((t) => t.kill());
          smoother?.effects("[data-speed], [data-lag]");

          // gsap.matchMedia contitions
          const {
            isMobilePortraitScreen,
            isTabletPortraitScreen,
            isDesktopScreen,
          } = context.conditions ?? {};

          const { placeholderImage, playhead, images } = frameImages;

          function imageSequence(config: ImageSequenceConfig) {
            const canvasElement = gsap.utils.toArray(
              config.canvas,
            )[0] as HTMLCanvasElement;
            const ctx = canvasElement.getContext("2d");
            if (isMobilePortraitScreen) canvasElement.style.scale = "1";
            else if (isTabletPortraitScreen) canvasElement.style.scale = "0.6";
            else if (isDesktopScreen) canvasElement.style.scale = "1";

            const updateImage = () => {
              const currentImg = images[Math.round(playhead.frame)];
              // draw the placeholderImage with blur filter while the current frame still loads
              if (currentImg && !currentImg.complete) {
                ctx!.clearRect(0, 0, canvasElement.width, canvasElement.height);
                ctx!.filter = "blur(10px)";
                ctx!.drawImage(placeholderImage, 0, 0);
                // add text on canvas
                ctx!.filter = "blur(0px)";
                ctx!.fillStyle = "white";
                ctx!.font = "20px Arial";
                ctx!.textAlign = "center";
                ctx!.textBaseline = "middle";
                ctx!.fillText(
                  "Loading Frame Image...",
                  canvasElement.width / 2,
                  canvasElement.height / 2,
                );
              }
              // Only draw if the image is actually loaded/exists
              else if (currentImg && currentImg.complete) {
                ctx!.clearRect(0, 0, canvasElement.width, canvasElement.height);
                ctx!.filter = "blur(0px)";
                ctx!.drawImage(currentImg, 0, 0);
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
              ease: "steps(46)",
              onUpdate: updateImage,
              immediateRender: true,
              scrollTrigger: config.scrollTrigger,
            });
          }
          imageSequence({
            canvas: "#about-canvas",
            scrollTrigger: {
              trigger: "#about-canvas",
              start: 0,
              end: isMobilePortraitScreen ? "top top" : "bottom+=500 90%",
              scrub: true,
              invalidateOnRefresh: true,
            },
          });
        },
      );
    },
    { dependencies: [] },
  );

  return (
    <canvas
      id="about-canvas"
      className="absolute left-0! top-20 tablet-portrait:top-0 desktop:top-10 origin-left"
      width={420}
      height={720}
    ></canvas>
  );
}
