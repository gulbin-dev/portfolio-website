import {
  gsap,
  mediaQueries,
  useGSAP,
  ScrollTrigger,
  ScrollSmoother,
  SplitText,
} from "@utils/gsap/gsap";
/** Custom hook to handle animation of about description*/
export default function useDescription() {
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(mediaQueries, (context) => {
      // media queries conditions giving a responsive animation
      const { isSmallScreen, isMediumScreen, isLargeScreen } =
        context.conditions ?? {};
      ScrollTrigger.defaults({
        toggleActions: "play none none none",
      });
      const smoother = ScrollSmoother.get();
      if (!isSmallScreen) smoother?.effects().forEach((t) => t.kill());
      // list of elements with the class "story-telling" used for horizontal scrolling
      const storyTellingElements = gsap.utils.toArray(".story-telling");

      /**
       * A function to set initial styles for animation
       */
      const gsapSetStyles = () => {
        gsap.set("#paper-plane", { opacity: 0, scale: 0.5 });
        if (isSmallScreen) gsap.set(".hand-icon", { opacity: 0 });

        if (!isSmallScreen) {
          gsap.set(".a", {
            x: -50,
          });
          gsap.set(".frontend", {
            xPercent: -101,
          });
          gsap.set(".developer", {
            transformOrigin: "top left",
            rotate: 180,
            y: -30,
            autoAlpha: 0,
          });
          gsap.set(".building", {
            transformOrigin: "bottom center",
            y: 30,
            scaleY: 0,
          });
          gsap.set(".hyphen", {
            transformOrigin: "center",
            rotate: 90,
            scaleX: 10,
          });
          gsap.set(".react-icon", {
            x: -150,
          });
          gsap.set(".react", {
            x: -100,
          });
          gsap.set(".and", {
            yPercent: -102,
          });
        }
      };

      const scrollHorizontal =
        !isSmallScreen &&
        gsap.to(".tablet-pinned", {
          xPercent: -20 * (storyTellingElements.length - 1),
          ease: "none",
          scrollTrigger: {
            trigger: ".tablet-pinned",
            pin: true,
            start: "top top",
            end: () =>
              "bottom+=" +
              ((document.querySelector(".tablet-pinned") as HTMLDivElement)
                ?.offsetWidth +
                1600) +
              "top",
            pinSpacing: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

      if (!isSmallScreen) {
        ScrollTrigger.create({
          trigger: ".canvas-container",
          pin: true,
          start: 0,
          end: () =>
            "bottom+=" +
            ((document.querySelector(".tablet-pinned") as HTMLDivElement)
              ?.offsetWidth +
              1180) +
            "top",
        });
        console.log("log");
      }

      // animation of the "Hi!" word and the hand icon
      const animateIntro = () => {
        const timeline = isSmallScreen
          ? gsap.timeline({
              scrollTrigger: {
                trigger: ".word-hi",
                start: "top center",
                end: "right center",
              },
            })
          : gsap.timeline();
        timeline.to(".name1", {
          duration: 2,
          scrambleText: {
            text: "Joshua Glenn R. Gulbin",
            chars: "01 ",
            oldClass: "unicode",
            newClass: "post-scramble",
            speed: 0.5,
            revealDelay: 1,
            tweenLength: false,
          },
        });
      };

      /**
       * A function to animate the paper plane
       */
      const animateDrawings = () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: isSmallScreen ? ".hand-icon" : "",
            start: "top center",
          },
        });
        tl.to(".hand-icon", {
          opacity: 1,
        }).to(".hand-icon", {
          transformOrigin: "bottom center",
          keyframes: {
            "5%": { rotate: 0 },
            "25%": { rotate: -35 },
            "50%": { rotate: 35 },
            "75%": { rotate: -35 },
            "100%": { rotate: 0 },
          },
          repeatDelay: 0.5,
          repeat: -1,
          yoyo: true,
          ease: "none",
        });
        if (!isSmallScreen)
          gsap.to("#paper-plane", {
            scrollTrigger: {
              trigger: ".web",
              start: "left 80%",
              end: "right left",
              toggleActions: "play none none none",
              containerAnimation: scrollHorizontal || undefined,
            },
            keyframes: {
              "20%": { opacity: 1, scale: 1 },
            },
            duration: 5,
            ease: "power1.inOut",
            motionPath: {
              path: "#path",
              align: "#path",
              alignOrigin: [0.5, 0.5],
              autoRotate: 45,
            },
          });
      };

      const animateStory = () => {
        gsap.from(".responsive", {
          y: 100,
          scrollTrigger: {
            trigger: ".responsive",
            start: `left ${
              isMediumScreen ? "70%" : isLargeScreen ? "center" : ""
            }`,
            end: "right 40%",
            containerAnimation: scrollHorizontal || undefined,
          },
        });

        const animateFrontendDeveloperBuilding = () => {
          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: ".a",
              containerAnimation: scrollHorizontal || undefined,
              start: `right ${
                isMediumScreen ? "80%" : isLargeScreen ? "center" : "center"
              }`,
              end: "right left",
            },
          });
          timeline
            .to(".a", {
              x: 0,
              duration: 0.5,
            })
            .to(
              ".frontend",
              {
                xPercent: 0,
              },
              "-=0.3",
            )
            .to(".developer", {
              rotate: 0,
              y: 0,
              autoAlpha: 1,
            })
            .to(".developer-bg-linear", {
              "--developer-grad-angle": "375deg",
              duration: 1,
            })
            .to(
              ".building",
              {
                scaleY: 1,
                y: 0,
                ease: "bounce.out",
              },
              "<",
            )
            .to(
              ".building-bg-linear",
              {
                "--building-grad-angle": "45deg",
                duration: 1,
              },
              "-=0.5",
            );
        };

        const animateStateDriven = () => {
          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: ".state",
              containerAnimation: scrollHorizontal || undefined,
              start: `left ${
                isMediumScreen ? "60%" : isLargeScreen ? "center" : ""
              }`,
              end: "right 40%",
            },
          });

          timeline
            .from(".state", {
              x: -100,
            })
            .from(
              ".driven",
              {
                x: -230,
              },
              "-=0.3",
            )
            .to(".container-state-driven", {
              "--animate-background": "#ffc400",
            })
            .to(
              ".hyphen",
              {
                rotate: 0,
                scaleX: 3,
              },
              "<",
            );
        };
        const animateReact = () => {
          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: ".react-icon",
              start: `left ${
                isMediumScreen ? "80%" : isLargeScreen ? "center" : ""
              }`,
              end: "right 40%",
              containerAnimation: scrollHorizontal || undefined,
            },
          });
          timeline
            .to(".react-icon", {
              x: 0,
            })
            .to(
              ".react",
              {
                x: 0,
              },
              "<",
            )
            .to(".and", {
              yPercent: 0,
            });
        };

        document.fonts.ready.then(() => {
          SplitText.create(".split-text-story", {
            type: "words",
            autoSplit: true,
            onSplit(self) {
              return gsap.from(self.words, {
                y: -100,
                stagger: {
                  amount: 0.8,
                  from: "start",
                },
                scrollTrigger: {
                  trigger: ".split-text-story",
                  containerAnimation: scrollHorizontal || undefined,
                  start: `left ${
                    isMediumScreen ? "70%" : isLargeScreen ? "center" : ""
                  }`,
                  end: "right center",
                },
                onComplete: animateReact,
              });
            },
          });
        });
        animateFrontendDeveloperBuilding();
        animateStateDriven();
      };

      const animateTechStack = () => {
        const techStacks = gsap.utils.toArray<HTMLElement[]>(".tech-stack");

        gsap.from(techStacks, {
          y: 100,
          opacity: 0,
          stagger: {
            amount: 1,
            from: "start",
          },
          scrollTrigger: {
            trigger: ".container-tech-stack",
            start: "top bottom",
            end: "bottom 40%",
          },
        });
      };
      gsapSetStyles();
      animateIntro();
      animateDrawings();
      animateTechStack();
      if (!isSmallScreen) animateStory();
    });
  });
}
