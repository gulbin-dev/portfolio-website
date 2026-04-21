"use client";

import { useLoading } from "@utils/LoadingContext";
import ScrollReset from "@utils/ScrollReset";
import dynamic from "next/dynamic";
import {
  FaHandPaper,
  FaPaperPlane,
  FaGithubSquare,
  FaLinkedin,
  FaReact,
} from "@utils/react-icons";
import {
  gsap,
  mediaQueries,
  useGSAP,
  ScrollSmoother,
  ScrollTrigger,
  SplitText,
} from "@utils/gsap";

const AboutCanvas = dynamic(
  () => import("@/app/(pages)/about/_components/AboutCanvas"),
);

/** About page content */
export default function About() {
  ScrollReset();
  const { isRevealed } = useLoading();

  useGSAP(
    () => {
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
            xPercent:
              (isMediumScreen ? -20 : isLargeScreen ? -10 : 0) *
              (storyTellingElements.length - 1),
            ease: "none",
            scrollTrigger: {
              trigger: ".tablet-pinned",
              id: "pinned",
              markers: true,
              pin: true,
              start: "top top",
              end: () =>
                "bottom+=" +
                (document.querySelector(".tablet-pinned") as HTMLDivElement)
                  ?.offsetWidth +
                "top",
              // pinSpacing: true,
              scrub: 1,
              invalidateOnRefresh: true,
            },
          });

        if (!isSmallScreen) {
          ScrollTrigger.create({
            trigger: ".canvas-container",
            id: "canvas",
            markers: true,
            pin: true,
            start: 0,
            end: () =>
              (document.querySelector(".tablet-pinned") as HTMLDivElement)
                ?.offsetHeight +
              "+=" +
              (document.querySelector(".tablet-pinned") as HTMLDivElement)
                ?.offsetWidth +
              "top",
          });
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
                trigger: ".split-text-story",
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
    },
    { dependencies: [isRevealed], revertOnUpdate: true },
  );

  return (
    <main className="bg-primary-color-darker px-3 mb-4">
      <section id="about-top" className="flex flex-col relative">
        <div className="canvas-container h-75 tablet:absolute w-full top-0 left-0  z-400 tablet:w-55 tablet:h-screen overflow-hidden">
          <div className="hidden tablet:block absolute bg-primary-color-darker w-23 h-full"></div>
          <AboutCanvas />
        </div>
        <div className="tablet-pinned relative">
          {/* this <div> is used only for animation */}
          <div className="relative tablet:top-15 tablet:flex">
            {" "}
            <div className="hidden tablet:block min-w-40 min-h-15"></div>{" "}
            <div className="flex flex-col tablet:grid tablet:auto-rows-auto items-center tablet:max-h-20 tablet:auto-cols-min tablet:w-screen tablet:min-w-50 tablet:gap-y-5">
              {" "}
              <h1 className="text-heading-lg mt-10 tablet:text-heading-xl col-start-1">
                About Me
              </h1>
              <p
                className="inline-block place-self-center tablet:text-3xl tablet:truncate col-start-1"
                aria-hidden="true"
              >
                <span className="flex gap-1 justify-center">
                  {" "}
                  <span className="word-hi self-end">Hi!</span>{" "}
                  <span className="min-w-3">
                    <FaHandPaper className="hand-icon z-300" />
                  </span>{" "}
                </span>{" "}
                <span className="block tablet:hidden">
                  I&apos;m{" "}
                  <span className="text-action-color font-bold">
                    Joshua Glenn R. Gulbin
                  </span>
                </span>
                <span className="hidden tablet:block">
                  {" "}
                  <span className="">I&apos;m</span>{" "}
                  <span className="name1 text-col-neutral-1 inline-block font-bold min-w-50 overflow-clip"></span>{" "}
                </span>
              </p>
              <p
                className="inline-block text-center h-full tablet:hidden col-start-1"
                aria-hidden="true"
              >
                {" "}
                a{" "}
                <span className="relative pb-0.5 after-line frontend-after">
                  frontend
                </span>{" "}
                <span className="relative pb-0.5 after-line developer-after">
                  developer
                </span>{" "}
                <span className="relative pb-0.5 after-line building-after">
                  building{" "}
                </span>{" "}
                responsive, state-driven web applications using React and{" "}
                <span className="relative pb-0.5 after-line javascript-after">
                  JavaScript
                </span>
                /{" "}
                <span className="relative pb-0.5 after-line typescript-after">
                  TypeScript
                </span>
                .
              </p>
            </div>
            <div
              className="hidden text-center relative tablet:flex gap-2 text-3xl items-end min-h-30 h-full"
              aria-hidden="true"
            >
              {" "}
              <span className="clip ">
                <span className="story-telling inline-block a lift-words">
                  a
                </span>{" "}
              </span>
              <span className="grid grid-cols-[repeat(9,50px)] gap-0.5 relative clip">
                <span className="story-telling frontend py-1.5 px-2.5 rounded-2xl frontend-bg-linear col-start-1 col-span-3 row-start-1">
                  <span>frontend</span>
                </span>
                <span className="story-telling developer py-1.5 px-2.5 rounded-2xl developer-bg-linear col-start-3 col-span-5 row-start-1 -z-1">
                  <span>developer</span>
                </span>
                <span className="story-telling building py-1.5 px-2.5 rounded-2xl building-bg-linear col-start-7 col-span-3 row-start-1">
                  <span>building</span>{" "}
                </span>
              </span>
              <span className="story-telling lift-words clip">
                {" "}
                <span className="responsive block">responsive,</span>{" "}
              </span>
              <span className="container-state-driven grid grid-cols-[repeat(4,50px)] clip content-start mb-0.75  rounded-lg">
                <span className="story-telling state col-start-1 col-span-2 bg-action-color text-dark-foreground rounded-l-sm py-0.5 pl-1.5 flex gap-1.5 items-center z-2">
                  state{" "}
                  <span className="story-telling hyphen w-0.5 h-[3px] block bg-dark-foreground"></span>
                </span>

                <span className="story-telling driven col-start-3 col-span-2 bg-action-color text-dark-foreground py-0.5 pl-0.5 pr-1.5 rounded-r-sm block z-1">
                  driven
                </span>
              </span>{" "}
              {/*  SVG paper plane */}
              <div className="hidden tablet:block absolute left-92 top-25 min-w-20 min-h-30">
                <svg className="w-full h-full scale-65 -rotate-45 tablet:scale-100 tablet:rotate-0">
                  <path
                    id="path"
                    fill="none"
                    d="M-0.667,60.666C27.996,124.328,150.091,48.672,145.998,78.332,144.624,88.286,57.515,107.41,70.573,60.904,81.741,21.116,317.426,80.263,315.53,24.012,314.232,-14.453,266.274,-3.652,269.182,22.109,273.302,58.631,340.032,53.801,383.995,54.664"
                  ></path>
                </svg>
                <FaPaperPlane id="paper-plane" />
              </div>
              <span className="story-telling split-text-story lift-words clip">
                web applications using
              </span>{" "}
              <span className="grid grid-cols-[repeat(4,50px) items-center mb-0.75 gap-0.5 clip">
                <span className="story-telling react col-start-1 col-span-2">
                  React
                </span>{" "}
                <FaReact className="col-start-3 react-icon text-[#61DBFB] bg-primary-color-darker text-5xl font-bold rounded-md z-1" />
                <span className="story-telling and pl-1 col-start-4">
                  and
                </span>{" "}
              </span>
              <span className="story-telling relative pb-0.5 javascript-after JavaScript">
                JavaScript
              </span>{" "}
              <span className="story-telling slash">/</span>
              <span className="story-telling relative pb-0.5 typescript-after TypeScript">
                TypeScript.
              </span>
            </div>
          </div>{" "}
          {/* this <p> is used only for screen readers */}
          <p className="sr-only">
            Hi! I&apos;m Joshua Glenn R. Gulbin, a frontend developer building
            responsive, state-driven web applications using React and
            JavaScript/TypeScript.
          </p>
        </div>
        <div className="relative flex flex-col items-center gap-x-2 mt-6 tablet:mt-40">
          <h2 className="text-heading-lg! tablet:text-heading-xl!">
            Reach out!
          </h2>
          <ul className="text-4xl flex gap-3 mt-2">
            <li>
              <button>
                <FaGithubSquare />
              </button>
            </li>
            <li>
              <button>
                <FaLinkedin />
              </button>
            </li>
          </ul>
        </div>
        <div className="mt-5">
          <h2 className="text-heading-lg text-center">Tech Stack</h2>
          <ul className="flex container-tech-stack flex-wrap gap-y-4 gap-x-2 mt-3 justify-center">
            <li>
              <span className="tech-stack">HTML</span>
            </li>
            <li>
              <span className="tech-stack">CSS</span>
            </li>
            <li>
              <span className="tech-stack">Javascript</span>
            </li>
            <li>
              <span className="tech-stack">Tailwind CSS</span>
            </li>
            <li>
              <span className="tech-stack">NextJS</span>
            </li>
            <li>
              <span className="tech-stack">Typescript</span>
            </li>
            <li>
              <span className="tech-stack">GSAP</span>
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
}
