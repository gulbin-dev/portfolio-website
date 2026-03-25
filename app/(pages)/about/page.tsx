"use client";
import Image from "next/image";
import { heroProfile } from "@assets/index";
export default function About() {
  return (
    <main className="bg-primary-color-darker">
      <section id="about-top" className="flex flex-col ">
        <Image
          src={heroProfile}
          alt="Joshua Glenn R. Gulbin | Frontend React Web Developer"
          loading="eager"
        />
        <p>
          Hi, I&apos;m Joshua Glenn R. Gulbin, a frontend developer building
          responsive, state-driven web applications using React and
          JavaScript/TypeScript. I focus on writing clean and maintainable code
          while keeping project goals in focus from initial development through
          to production delivery.
        </p>
        <div className="flex">
          <button>Github Icon</button>
          <button>LinkedIn Icon</button>
        </div>
      </section>
      <section>
        <h2>Tech Stack</h2>
      </section>
    </main>
  );
}
