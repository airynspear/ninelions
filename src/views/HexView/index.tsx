"use client";

import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "@/components/Theme/ThemeProvider";
import styles from "./HexView.module.scss";
import homeStyles from "@/views/Home/HomeView.module.scss";
import aboutStyles from "@/views/About/AboutView.module.scss";
import portfolioStyles from "@/views/Portfolio/PortfolioView.module.scss";
import connectStyles from "@/views/Connect/ConnectView.module.scss";
import { TfiClose } from "react-icons/tfi";

export interface HexCard {
  icon?: React.ReactNode;
  thumbnail?: string;
  image?: string;
  keyword?: string | React.ReactElement;
  description: string | React.ReactElement;
  themeThumbnailDark?: string;
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

const viewStylesMap: Record<string, Record<string, string>> = {
  home: homeStyles,
  about: aboutStyles,
  portfolio: portfolioStyles,
  connect: connectStyles,
};

export default function HexView({ cards, viewMode }: HexViewProps) {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [rotation, setRotation] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(
    null
  );

  const viewStyles = viewStylesMap[viewMode] || {};
  const { theme } = useTheme();

  useEffect(() => {
    const checkIsMobile = () => setIsMobile(window.innerWidth < 945);
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  useEffect(() => {
    const shouldSnap =
      viewMode === "about" || viewMode === "portfolio" || isMobile;
    const offset = rotation % 60;
    if (shouldSnap && offset !== 30) {
      const adjustment = (30 - offset + 60) % 60;
      setRotation((prev) => prev + adjustment);
    }
  }, [isMobile, viewMode]);

  useEffect(() => {
    const interval = setInterval(() => {
      const step =
        viewMode === "about" || viewMode === "portfolio" || isMobile ? 60 : 30;
      setRotation((prev) => prev + step);
    }, 9000);
    return () => clearInterval(interval);
  }, [isMobile, viewMode]);

  useEffect(() => {
    if (viewMode === "portfolio" && selectedCardIndex === null) {
      setSelectedCardIndex(0);
    }
  }, [viewMode, selectedCardIndex]);

  const handleCardClick = (index: number) => {
    if (viewMode === "portfolio") {
      setSelectedCardIndex(index);
    }
  };

  return (
    <div
      className={`${styles.background} ${styles[viewMode] ?? ""} ${viewMode}`}
      style={{ "--hex-rotation": `${rotation}deg` } as React.CSSProperties}
    >
      <section className={styles.hero}>
        <div className={styles.hexGrid}>
          <div className={styles.hexContainer}>
            <div className={styles.hexScrollWrapper}>
              <div className={styles.hexScroll}>
                {cards.map((card, i) => {
                  const hexClass = HEX_CARD_CLASSES[i];
                  const classNames = [styles.hexCard];

                  if (styles[hexClass]) classNames.push(styles[hexClass]);
                  if (viewStyles[hexClass])
                    classNames.push(viewStyles[hexClass]);
                  if (viewMode === "portfolio" && selectedCardIndex === i) {
                    classNames.push(styles.selected);
                  }

                  const imageSrc =
                    theme === "dark" && card.themeThumbnailDark
                      ? card.themeThumbnailDark
                      : card.thumbnail || card.image;

                  return (
                    <div
                      key={i}
                      ref={(el) => {
                        cardRefs.current[i] = el;
                      }}
                      className={classNames.join(" ")}
                      onClick={() => handleCardClick(i)}
                    >
                      <div className={`${styles.cardInner} cardInner`}>
                        <div className={styles.cardFlipWrapper}>
                          <div className={styles.front}>
                            {imageSrc && (
                              <div className={styles.image}>
                                <div className={styles.hexMask}>
                                  <img src={imageSrc} alt="Project Thumbnail" />
                                </div>
                              </div>
                            )}
                            {card.icon && (
                              <div className={styles.icon}>{card.icon}</div>
                            )}
                            {card.keyword && (
                              <span className={styles.keyword}>
                                {card.keyword}
                              </span>
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
            </div>
          </div>
        </div>
      </section>
      {selectedCardIndex !== null && viewMode === "portfolio" && (
        <div
          key={`project-${selectedCardIndex}`}
          className={styles.projectDetails}
        >
          <button
            className={styles.closeButton}
            onClick={() => setSelectedCardIndex(null)}
          >
            <TfiClose />
          </button>

          {cards[selectedCardIndex].image && (
            <div className={styles.projectImage}>
              <img
                src={cards[selectedCardIndex].image}
                alt={`${cards[selectedCardIndex].keyword} full image`}
              />
            </div>
          )}

          <h3 className={styles.projectTitle}>
            {cards[selectedCardIndex].keyword}
          </h3>
          <div className={styles.projectDescription}>
            {cards[selectedCardIndex].description}
          </div>
        </div>
      )}
    </div>
  );
}
