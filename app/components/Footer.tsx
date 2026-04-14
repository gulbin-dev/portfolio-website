import NavLinks from "./NavLinks";
import Link from "next/link";
import Image from "next/image";
import { FaGithubSquare, FaLinkedin, MdEmail } from "@utils/react-icons";
export default function Footer() {
  return (
    <footer className="snap h-full bg-primary-color-darker w-full pb-1">
      <div className="max-w-180 place-self-center w-full px-3">
        <Link href="/" className="text-heading-md px-0! text-white">
          <Image src="/logo.svg" alt="logo" width={100} height={58} />
        </Link>
        <p className="mt-2">
          Frontend React Web developer focusing on building responsive,
          user-centered, seo friendly website and clean code space.
        </p>
        <nav className="mt-3">
          <ul className="flex gap-1 text-4xl">
            <li>
              <Link href="">
                <FaGithubSquare />
              </Link>
            </li>
            <li>
              <Link href="">
                <FaLinkedin />
              </Link>
            </li>
            <li>
              <Link href="">
                <MdEmail />
              </Link>
            </li>
          </ul>
        </nav>
        <button className="bg-action-color text-dark-foreground rounded-2xl py-0.5 px-2 font-bold mt-3">
          Download CV
        </button>

        <p className="mt-5 italic text-light-secondary">Quick Links</p>
        <NavLinks navStyle="flex flex-col gap-1" anchorStyle="underline" />

        <p className="mt-5 text-center">
          &copy; 2026 GulbinDev - Frontend React Web Developer. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
