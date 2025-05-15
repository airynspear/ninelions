"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./HexView.module.scss";

export interface HexCard {
  icon: React.ReactNode;
  keyword: string | React.ReactElement;
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

export default function HexView({ cards, viewMode }: HexViewProps) {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [hideDescriptions, setHideDescriptions] = useState(true);
  const [rotation, setRotation] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (viewMode === "home") {
      cards.forEach((_, i) => {
        const card = cardRefs.current[i];
        if (!card) return;

        let enterDelay = i * 150;
        if (i === 3) enterDelay = 2 * 150 + 75;
        if (i === 6) enterDelay = 5 * 150 + 50;

        setTimeout(() => {
          card.classList.add(styles.flipInit);
        }, enterDelay);
      });

      const t = setTimeout(() => setHideDescriptions(false), 8 * 150 + 600);
      return () => clearTimeout(t);
    } else {
      setHideDescriptions(false);
    }
  }, [cards, viewMode]);

  useEffect(() => {
    const checkIsMobile = () => {
      const mobile = window.innerWidth < 945;
      setIsMobile(mobile);
      setRotation(mobile ? 30 : 0);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((prev) => prev + (isMobile ? 60 : 30));
    }, 9000);
    return () => clearInterval(interval);
  }, [isMobile]);

  return (
    <div
      className={`${styles.background} ${styles[viewMode]}`}
      style={{ "--hex-rotation": `${rotation}deg` } as React.CSSProperties}
    >
      <section className={styles.hero}>
        <div className={styles.hexGrid}>
          {cards.map((card, i) => {
            const className =
              i < HEX_CARD_CLASSES.length
                ? `${styles.hexCard} ${styles[HEX_CARD_CLASSES[i]]}`
                : styles.hexCard;

            return (
              <div
                key={i}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                className={className}
              >
                <div className={styles.cardInner}>
                  <div
                    className={styles.cardFlipWrapper}
                    style={{
                      transform:
                        viewMode === "home" ? undefined : "rotateY(-90deg)",
                    }}
                  >
                    <div className={styles.front}>
                      <div className={styles.icon}>{card.icon}</div>
                      <span className={styles.keyword}>{card.keyword}</span>
                    </div>
                    <div className={styles.back}>
                      <span
                        className={hideDescriptions ? styles.hiddenText : ""}
                      >
                        <div className={styles.icon}>{card.icon}</div>
                        {card.description}
                      </span>
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
