"use client";
import Image from "next/image";
import { heroProfile } from "@assets/index";
import Link from "next/link";
export default function HeroSection() {
  return (
    <section
      id="home-top"
      className="section snap w-full h-full overflow-y-hidden relative pt-10 pb-10 linear-bg z-0 tablet:pt-1 tablet:h-screen"
    >
      <div className="place-self-center max-w-180 tablet:flex">
        <div className="relative z-1 px-3 tablet:mt-10">
          <h1
            aria-hidden
            className="split-words text-pretty text-heading-lg tablet:text-heading-xl pt-7 tablet:pt-0"
          >
            Frontend Developer{" "}
            <span className="relative">
              Building
              <svg
                className="absolute -bottom-2  tablet:scale-y-50"
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
          <p className="fade-in-up mt-4 tablet:mt-3">
            Helping teams deliver high-performance React applications with a
            focus on accessibility and SEO.
          </p>
          <ul className="my-6 flex flex-col gap-5.5 w-fit tablet:my-4 tablet:gap-4">
            <li className="list-discover-button opacity-0 group">
              <Link
                href="/discover"
                className="relative block w-30 h-5 rounded-lg bg-action-color text-dark-foreground overflow-hidden font-bold"
              >
                {/* 1. FRONT FACE (Static) */}
                <div className="absolute inset-0 flex items-center justify-center transition-colors duration-500">
                  CHECK MY WORKS
                </div>

                {/* 2. BACK FACE (The "Slide" layer) */}
                {/* translate-y-full puts it below the button; group-hover:translate-y-0 slides it up */}
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
        <div className="relative h-full w-full z-1">
          <svg
            className="absolute w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 252.44 268.13"
          >
            <defs>
              <clipPath id="my-profile-clip">
                <path
                  id="m-clip-path"
                  d="M185.2,211v30.27h24.23v26.81h-106.09v-36.9h-30.73v9.33h-35.08v-32.56H15.98v-35.09h9.09v-6.19h3.98v-33.63H7.95v-15.9h12.55v-17.12H0v-17.73h20.5v-29.04H2.68v-24.16h53.88v-13.76h17.12V.08h101.81v25.96h22.32v21.4h36l.21,18.63h-15.42v22.95h-8.26v19.56h18.65v27.21h-18.65v21.71h30.27v32.1h11.83v21.4h-67.24Z"
                />
              </clipPath>
            </defs>
            <path
              id="m-profile-1"
              className="will-change-transform"
              d="M185.2,211v30.27h24.23v26.81h-106.09v-36.9h-30.73v9.33h-35.08v-32.56H15.98v-35.09h9.09v-6.19h3.98v-33.63H7.95v-15.9h12.55v-17.12H0v-17.73h20.5v-29.04H2.68v-24.16h53.88v-13.76h17.12V.08h101.81v25.96h22.32v21.4h36l.21,18.63h-15.42v22.95h-8.26v19.56h18.65v27.21h-18.65v21.71h30.27v32.1h11.83v21.4h-67.24Z"
              style={{ fill: "#0079f6" }}
            />
            <path
              id="m-profile-2"
              d="M252.27,189.65v21.4h-23.58v14.32h-33.63v25.46h14.2v17.3h-22v-29h-40.81v29h-43.28v-6.99h-25.21v-29.91h-5.52v9.33h-35.08v-19.16h-9.08v-12.54h8.71v-52.28H8.87v-23.49h-1.09v-15.9h12.55v-3.1h2.29v-20.49h20.72v-22.62h-23.01v-5.51h19.42v-19.87H15.29v-27.21h35.08v29.05h35.54V.13h12.38v20.25h62.37v-4.74h14.66v10.45h3.69v-2.5h34.85v23.9h19.78l.21,18.63h-15.42v15.25h-28.26v23.54h-6.12v10.4h29.35v31.18h-29.35v11.32h12.38v23.08h28.9v-23.34h15.11v32.1h11.83Z"
              style={{ fill: "#0079f6", visibility: "hidden" }}
            />
            <path
              id="m-profile-3"
              d="M209.92,157.42h21.83v53.5h-24.88v-14.9h-20.98v14.9h-1.11v27.75h-50.26v29.33h-31.6v-36.9h-30.73v9.33h-35.08v-32.56H15.56v-8.18h20.36v-15.13H15.56v-11.78h9.09v-6.19h3.98v-33.63H7.53v-15.9h12.55v-15.97h22.26v-26.14h-22.26v-21.78H2.26v-24.16h37.79v12.92h53.66V0h81.36v25.96h10.82v25.6h17.88v-4.2h29.62l.21,18.63h-13.78v-.9h-25.91v25.91h16.01v17.5h18.65v27.21h-18.65v21.71Z"
              style={{ fill: "#0079f6", visibility: "hidden" }}
            />
          </svg>
          <picture
            // style={{ clipPath: "url(#my-profile-clip)" }}
            className="hero-img relative tablet:h-screen w-full overflow-hidden"
          >
            <Image
              data-speed="0.5"
              className="profile-img relative tablet:absolute tablet:bottom-5 desktop:left-10 tablet:will-change-transform"
              aria-label=""
              src={heroProfile}
              alt="Joshua Glenn R. Gulbin | Frontend React Web Developer"
              width={300}
              height={300}
              loading="eager"
              fetchPriority="high"
            />
          </picture>
        </div>
      </div>
    </section>
  );
}
