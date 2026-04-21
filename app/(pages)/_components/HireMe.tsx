import Link from "next/link";
import { useLoading } from "@utils/LoadingContext";
import {
  FaMapLocationDot,
  MdEmail,
  RiTeamFill,
  FaLinkedin,
} from "@utils/react-icons";
import { gsap, mediaQueries, ScrollTrigger, useGSAP } from "@utils/gsap";

export default function HireMe() {
  const { isRevealed } = useLoading();

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(mediaQueries, (context) => {
        const { reduceMotion } = context.conditions ?? {};
        const fadeEntries: HTMLElement[] = gsap.utils.toArray(".fade-entry");
        const icons: HTMLElement[] = gsap.utils.toArray(".icons");

        gsap.defaults({
          duration: 0.8,
        });
        ScrollTrigger.defaults({
          start: "top 80%",
          toggleActions: "play none none reverse",
        });
        fadeEntries.forEach((el) =>
          gsap.from(el, {
            opacity: 0,
            y: 50,
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              toggleActions: "play none none reset",
            },
          }),
        );
        icons.forEach((icon) =>
          gsap.from(icon, {
            keyframes: {
              "0%": { rotate: -25, autoAlpha: 0 },
              "25%": { rotate: 25, autoAlpha: 1 },
              "50%": { rotate: -15 },
              "75%": { rotate: 15 },
              "100%": { rotate: 0 },
            },
            ease: "circ.out",
            transformOrigin: "bottom center",
            scrollTrigger: {
              trigger: icon,
            },
          }),
        );
      });
    },
    { dependencies: [isRevealed], revertOnUpdate: true },
  );

  return (
    <section className="section snap w-full h-full bg-primary-color-darker py-7 px-3">
      <h2 className="fade-entry text-heading-xl text-center">
        Available for Hire
      </h2>
      <div className="max-w-180 place-self-center">
        <ul className="flex flex-col gap-8 mt-6 tablet:flex-row items-center">
          <li className="card-container">
            <FaMapLocationDot className="icons" aria-hidden />
            <div className="content-container">
              <h3 className="fade-entry text-heading-lg">Location</h3>
              <h4 className="fade-entry">Remote/Worldwide</h4>
              <p className="fade-entry">
                Open to collaborating across all time zones.
              </p>
            </div>
          </li>
          <li className="card-container">
            <RiTeamFill className="icons" aria-hidden />
            <div className="content-container">
              <h3 className="fade-entry text-heading-lg">Job Preference</h3>
              <h4 className="fade-entry">Flexible</h4>
              <p className="fade-entry">
                Can work full-time, part-time, contract
              </p>
            </div>
          </li>
        </ul>
        <h2 className="fade-entry mt-10 text-heading-xl text-center">
          Want a good website for your ideas?
        </h2>
        <p className="fade-entry mt-2 text-center">
          You can reach me and let&apos;s work together
        </p>
        <ul className="flex flex-col gap-8 mt-6 tablet:flex-row tablet:justify-center">
          <li className="card-container">
            <FaLinkedin className="icons" />
            <div className="content-container">
              <h3 className="fade-entry text-heading-lg">LinkedIn</h3>
              <Link
                href="https://www.linkedin.com/in/joshua-glenn-gulbin/"
                className="fade-entry font-bold"
              >
                Visit my profile
              </Link>
              <p className="fade-entry">We can discuss your ideas there</p>
            </div>
          </li>
          <li className="card-container">
            <MdEmail className="icons" />
            <div className="content-container">
              <h3 className="fade-entry text-heading-lg">Email</h3>
              <a
                href="mailto:gulbindev@gmail.com"
                className="fade-entry font-bold"
              >
                gulbindev@gmail.com
              </a>
              <p className="fade-entry">I&apos;ll reply as soon as possible.</p>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
}
