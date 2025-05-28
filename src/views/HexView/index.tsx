"use client";

import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "@/components/Theme/ThemeProvider";
import Image from "next/image";
import styles from "./HexView.module.scss";
import homeStyles from "@/views/Home/HomeView.module.scss";
import aboutStyles from "@/views/About/AboutView.module.scss";
import portfolioStyles from "@/views/Portfolio/PortfolioView.module.scss";
import connectStyles from "@/views/Connect/ConnectView.module.scss";
import { RiTriangleLine, RiTriangleFill } from "react-icons/ri";

export interface HexCard {
  icon?: React.ReactNode;
  thumbnail?: string;
  image?: string;
  keyword?: string | React.ReactElement;
  description: string | React.ReactElement;
  themeImageDark?: string;
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
  const scrollRef = useRef<HTMLDivElement | null>(null); // NEW
  const [rotation, setRotation] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(
    null
  );

  const { theme } = useTheme();
  const viewStyles = viewStylesMap[viewMode] || {};
  const scrollAnimationFrame = useRef<number | null>(null);
  const lastScrollTop = useRef<number | null>(null);

  const smoothScrollBy = (
    element: HTMLElement,
    deltaY: number,
    duration = 1000
  ) => {
    if (scrollAnimationFrame.current) {
      cancelAnimationFrame(scrollAnimationFrame.current);
    }

    const start = element.scrollTop;
    const startTime = performance.now();

    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      element.scrollTop = start + deltaY * ease;

      if (progress < 1) {
        scrollAnimationFrame.current = requestAnimationFrame(step);
      } else {
        scrollAnimationFrame.current = null;
      }
    };

    scrollAnimationFrame.current = requestAnimationFrame(step);
  };

  const handleCardClick = (index: number) => {
    if (viewMode === "portfolio") {
      const previousIndex = selectedCardIndex;
      setSelectedCardIndex(index);

      setTimeout(() => {
        if (scrollRef.current && previousIndex !== null) {
          const scrollDirection = index > previousIndex ? 120 : -140;
          smoothScrollBy(scrollRef.current, scrollDirection, 1000);
        }
      }, 80);
    }
  };

  // Detect mobile layout and update isMobile state
  useEffect(() => {
    const checkIsMobile = () => setIsMobile(window.innerWidth < 945);
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  // Snap rotation to align hexes based on viewMode and device type
  useEffect(() => {
    const shouldSnap =
      viewMode === "about" || viewMode === "portfolio" || isMobile;
    const offset = rotation % 60;
    if (shouldSnap && offset !== 30) {
      const adjustment = (30 - offset + 60) % 60;
      setRotation((prev) => prev + adjustment);
    }
  }, [isMobile, viewMode, rotation]);

  // Animate background hex rotation every 9s
  useEffect(() => {
    const interval = setInterval(() => {
      const step =
        viewMode === "about" || viewMode === "portfolio" || isMobile ? 60 : 30;
      setRotation((prev) => prev + step);
    }, 9000);
    return () => clearInterval(interval);
  }, [isMobile, viewMode]);

  // Save scroll position when leaving portfolio view
  useEffect(() => {
    const scrollEl = scrollRef.current;

    return () => {
      if (viewMode === "portfolio" && scrollEl) {
        lastScrollTop.current = scrollEl.scrollTop;
      }
    };
  }, [viewMode]);

  // Reset selectedCardIndex and scroll to stored position on entering portfolio view
  useEffect(() => {
    if (viewMode === "portfolio") {
      const scrollTo = lastScrollTop.current ?? 0;
      setSelectedCardIndex(0);

      if (scrollRef.current) {
        scrollRef.current.scrollTo({
          top: scrollTo ?? 200,
          behavior: "instant",
        });
      }
    }
  }, [viewMode]);

  // Cancel smooth scroll animations on user wheel/touch interactions
  useEffect(() => {
    const cancelSmoothScroll = () => {
      if (scrollAnimationFrame.current) {
        cancelAnimationFrame(scrollAnimationFrame.current);
        scrollAnimationFrame.current = null;
      }
    };

    const scrollEl = scrollRef.current;
    if (!scrollEl) return;

    scrollEl.addEventListener("wheel", cancelSmoothScroll, { passive: true });
    scrollEl.addEventListener("touchmove", cancelSmoothScroll, {
      passive: true,
    });

    return () => {
      scrollEl.removeEventListener("wheel", cancelSmoothScroll);
      scrollEl.removeEventListener("touchmove", cancelSmoothScroll);
    };
  }, []);

  return (
    <div
      className={`${styles.background} ${styles[viewMode] ?? ""} ${viewMode}`}
      style={{ "--hex-rotation": `${rotation}deg` } as React.CSSProperties}
    >
      <section className={styles.hero}>
        <div className={styles.hexGrid}>
          <div className={styles.hexContainer}>
            <div className={styles.hexScrollWrapper}>
              <div className={styles.hexScroll} ref={scrollRef}>
                {cards.map((card, i) => {
                  const hexClass = HEX_CARD_CLASSES[i];
                  const classNames = [styles.hexCard];

                  if (styles[hexClass]) classNames.push(styles[hexClass]);
                  if (viewStyles[hexClass])
                    classNames.push(viewStyles[hexClass]);

                  const isSelected =
                    viewMode === "portfolio" && selectedCardIndex === i;
                  if (isSelected) classNames.push(styles.selected);

                  const baseLight = card.thumbnail || card.image;
                  const baseDark = card.themeThumbnailDark || card.image;
                  const imageSrc = theme === "dark" ? baseDark : baseLight;

                  const borderSrc =
                    viewMode === "portfolio"
                      ? `/images/portfolio/border-${theme}.png`
                      : null;

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
                                  <img
                                    className="default"
                                    src={imageSrc}
                                    alt="Project Thumbnail"
                                    loading="eager"
                                  />
                                  {borderSrc && (
                                    <img
                                      className="border"
                                      src={borderSrc}
                                      alt="Selected Overlay"
                                      loading="eager"
                                    />
                                  )}
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
                <div className={styles.hexScrollSpace} />
              </div>
            </div>
          </div>
        </div>
      </section>
      {selectedCardIndex !== null && viewMode === "portfolio" && (
        <div className={styles.projectWrapper}>
          <div className={styles.chevronNav}>
            <button
              className={styles.chevronButton}
              onClick={() => {
                if (selectedCardIndex > 0) {
                  setSelectedCardIndex((prev) =>
                    prev !== null ? prev - 1 : 0
                  );
                  setTimeout(() => {
                    if (scrollRef.current) {
                      smoothScrollBy(scrollRef.current, -110, 1000);
                    }
                  }, 80);
                }
              }}
              disabled={selectedCardIndex === 0}
              aria-label="Previous project"
            >
              <RiTriangleLine />
              <RiTriangleFill className={styles.innerTriangle} />
            </button>
            <button
              className={`${styles.chevronButton} ${styles.downTriangle}`}
              onClick={() => {
                if (selectedCardIndex < cards.length - 1) {
                  setSelectedCardIndex((prev) =>
                    prev !== null ? prev + 1 : cards.length - 1
                  );
                  setTimeout(() => {
                    if (scrollRef.current) {
                      smoothScrollBy(scrollRef.current, 110, 1000);
                    }
                  }, 80);
                }
              }}
              disabled={selectedCardIndex === cards.length - 1}
              aria-label="Next project"
            >
              <RiTriangleLine />
              <RiTriangleFill className={styles.innerTriangle} />
            </button>
          </div>

          <div
            key={`project-${selectedCardIndex}`}
            className={styles.projectDetails}
          >
            {(cards[selectedCardIndex].image ||
              cards[selectedCardIndex].themeImageDark) && (
              <div className={styles.projectImage}>
                <Image
                  src={
                    theme === "dark" && cards[selectedCardIndex].themeImageDark
                      ? cards[selectedCardIndex].themeImageDark
                      : cards[selectedCardIndex].image!
                  }
                  alt={`${
                    cards[selectedCardIndex].keyword || "Project"
                  } full image`}
                  width={1200}
                  height={800}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 50vw"
                  style={{
                    width: "100%",
                    height: "auto",
                    objectFit: "contain",
                  }}
                  priority
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
        </div>
      )}
    </div>
  );
}
