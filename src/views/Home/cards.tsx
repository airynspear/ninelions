import {
  SiOpenai,
  SiFigma,
  SiMui,
  SiReact,
  SiGithub,
  SiD3Dotjs,
} from "react-icons/si";
import { FaPeopleArrows } from "react-icons/fa";
import { HexCard } from "@/views/HexView";
import { BiLogoAdobe } from "react-icons/bi";
import Image from "next/image";

export const HOME_CARDS: HexCard[] = [
  {
    icon: <BiLogoAdobe />,
    keyword: "UX Design",
    description: "Designing intuitive UX with Adobe CS and Figma",
  },
  {
    icon: <SiReact />,
    keyword: "Frontend Development",
    description: "Building responsive interfaces with React & Next.js",
  },
  {
    icon: <SiFigma />,
    keyword: "Prototyping",
    description: "Exploring ideas with Figma Make, v0 & Claude Design",
  },
  {
    icon: <SiOpenai />,
    keyword: "AI Tools",
    description: (
      <>
        {" "}
        <span>Codex</span> Claude, vO, Grok{" "}
      </>
    ),
  },
  {
    icon: (
      <Image
        src="/logos/design-engineer.png"
        alt=""
        width={643}
        height={750}
        style={{ width: "1.5em", height: "1.5em", objectFit: "contain" }}
      />
    ),
    keyword: "Design Engineer",
    description:
      "Blending design & code to bring intuitive digital experiences to life.",
  },
  {
    icon: <SiGithub />,
    keyword: "CI/CD",
    description: "Automating workflows with GitHub & Vercel",
  },
  {
    icon: <SiMui />,
    keyword: "Modern Design Systems",
    description: "Creating scalable UI with Tailwind & Storybook.",
  },
  {
    icon: <SiD3Dotjs />,
    keyword: "Data Visualization",
    description: (
      <>
        {" "}
        <span>Transforming</span> complex data into clear, interactive visuals{" "}
      </>
    ),
  },
  {
    icon: <FaPeopleArrows />,
    keyword: "Collaboration",
    description: "Connecting design, engineering & product",
  },
];
