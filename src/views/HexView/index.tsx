"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./HexView.module.scss";
import homeStyles from "@/views/Home/HomeView.module.scss";
import aboutStyles from "@/views/About/AboutView.module.scss";
import portfolioStyles from "@/views/Portfolio/PortfolioView.module.scss";
import connectStyles from "@/views/Connect/ConnectView.module.scss";

export interface HexCard {
  icon?: React.ReactNode;
  image?: string;
  keyword?: string | React.ReactElement;
  description: string | React.ReactElement;
}

interface HexViewProps {
  cards: HexCard[];
  viewMode: string;
}

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

const viewStylesMap: Record<string, any> = {
  home: homeStyles,
  about: aboutStyles,
  portfolio: portfolioStyles,
  connect: connectStyles,
};

export default function HexView({ cards, viewMode }: HexViewProps) {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [rotation, setRotation] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const viewStyles = viewStylesMap[viewMode] || {};

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 945);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  useEffect(() => {
    const shouldSnap = viewMode === "about" || isMobile;
    const offset = rotation % 60;

    if (shouldSnap && offset !== 30) {
      const adjustment = (30 - offset + 60) % 60;
      setRotation((prev) => prev + adjustment);
    }
  }, [isMobile, viewMode]);

  useEffect(() => {
    const interval = setInterval(() => {
      const step = viewMode === "about" ? 60 : isMobile ? 60 : 30;
      setRotation((prev) => prev + step);
    }, 9000);

    return () => clearInterval(interval);
  }, [isMobile, viewMode]);

  return (
    <div
      className={`${styles.background} ${styles[viewMode] ?? ""} ${viewMode}`}
      style={{ "--hex-rotation": `${rotation}deg` } as React.CSSProperties}
    >
      <section className={styles.hero}>
        <div className={styles.hexGrid}>
          {cards.map((card, i) => {
            const hexClass = HEX_CARD_CLASSES[i];
            const classNames = [styles.hexCard];

            if (styles[hexClass]) classNames.push(styles[hexClass]);
            if (viewStyles[hexClass]) classNames.push(viewStyles[hexClass]);

            return (
              <div
                key={i}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                className={classNames.join(" ")}
              >
                <div className={`${styles.cardInner} cardInner`}>
                  <div className={styles.cardFlipWrapper}>
                    <div className={styles.front}>
                      {card.image ? (
                        <div className={styles.image}>
                          <div className={styles.hexMask}>
                            <img src={card.image} alt="Hex Image" />
                          </div>
                        </div>
                      ) : card.icon ? (
                        <div className={styles.icon}>{card.icon}</div>
                      ) : null}
                      {card.keyword && (
                        <span className={styles.keyword}>{card.keyword}</span>
                      )}
                    </div>
                    <div className={styles.back}>
                      {card.icon && (
                        <div className={styles.icon}>{card.icon}</div>
                      )}
                      {card.description}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
