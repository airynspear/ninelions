"use client";

import HexView from "@/views/HexView";
import {
  SiOpenai,
  SiFigma,
  SiMui,
  SiReact,
  SiGithub,
  SiD3Dotjs,
} from "react-icons/si";
import { BsRocket } from "react-icons/bs";
import { FaRegObjectGroup, FaPeopleArrows } from "react-icons/fa";

const HEX_CARDS = [
  {
    icon: <FaRegObjectGroup />,
    keyword: "UX Design",
    description: (
      <>
        <span>Crafting intuitive</span> and elegant user experiences
      </>
    ),
  },
  {
    icon: <SiReact />,
    keyword: "Frontend Development",
    description: "Modern, responsive UI engineering with React & Next.js",
  },
  {
    icon: <SiFigma />,
    keyword: "Prototyping",
    description: "Bringing ideas to life fast with Figma & Storybook",
  },
  {
    icon: <SiOpenai />,
    keyword: "AI Tools",
    description: (
      <>
        <span>Leveraging AI</span> to accelerate development
      </>
    ),
  },
  {
    icon: <SiMui />,
    keyword: (
      <>
        <span>Modern</span> Design Systems
      </>
    ),
    description: (
      <>
        <span>Creating scalable,</span> consistent UI systems using Stencil,
        MUI, Tailwind, and custom web components.
      </>
    ),
  },
  {
    icon: <SiGithub />,
    keyword: "CI/CD",
    description: "Automating workflows with GitHub Actions & CMS",
  },
  {
    icon: <BsRocket />,
    keyword: "Performance",
    description: (
      <>
        <span>Optimizing speed</span> and accessibility across devices
      </>
    ),
  },
  {
    icon: <SiD3Dotjs />,
    keyword: "Data Visualization",
    description: (
      <>
        <span>Transforming</span> complex data into clear, interactive visuals
      </>
    ),
  },
  {
    icon: <FaPeopleArrows />,
    keyword: "Collaboration",
    description: (
      <>
        <span>Thriving in agile,</span> cross-functional environments
      </>
    ),
  },
];

export default function HomeView() {
  return <HexView cards={HEX_CARDS} viewMode="home" />;
}
