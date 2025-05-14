"use client";

import styles from "./page.module.scss";
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
import { useEffect, useRef, useState } from "react";

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

const HEX_CARD_CLASSES = [
  "hexCardOne",
  "hexCardTwo",
  "hexCardThree",
  "hexCardFour",
  "hexCardFive",
  "hexCardSix",
  "hexCardSeven",
  "hexCardEight",
  "hexCardNine",
];

export default function Home() {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [hideDescriptions, setHideDescriptions] = useState(true);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    HEX_CARDS.forEach((_, i) => {
      const card = cardRefs.current[i];
      if (!card) return;

      let enterDelay = i * 150;
      let exitDelay = enterDelay + 300;

      if (i === 3) {
        enterDelay = 2 * 150 + 75;
        exitDelay = enterDelay + 300;
      }

      if (i === 6) {
        enterDelay = 5 * 150 + 50;
        exitDelay = enterDelay + 300;
      }

      setTimeout(() => {
        card.classList.add(styles.flipInit);
      }, enterDelay);

      setTimeout(() => {
        card.classList.remove(styles.flipInit);
      }, exitDelay);
    });

    const finalRevealTime = 8 * 150 + 300 + 300;
    const t = setTimeout(() => setHideDescriptions(false), finalRevealTime);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((prev) => prev + 30);
    }, 9000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={styles.background}
      style={{ "--hex-rotation": `${rotation}deg` } as React.CSSProperties}
    >
      <section className={styles.hero}>
        <div className={styles.hexGrid}>
          {HEX_CARDS.map((card, i) => (
            <div
              key={i}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              className={`${styles.hexCard} ${styles[HEX_CARD_CLASSES[i]]}`}
            >
              <div className={styles.cardInner}>
                <div className={styles.front}>
                  <div className={styles.icon}>{card.icon}</div>
                  <span className={styles.keyword}>{card.keyword}</span>
                </div>
                <div className={styles.back}>
                  <span className={hideDescriptions ? styles.hiddenText : ""}>
                    <div className={styles.icon}>{card.icon}</div>
                    {card.description}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
