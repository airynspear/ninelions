"use client";

import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "@/components/Theme/ThemeProvider";
import { Button } from "@mui/material";
import styles from "./HexView.module.scss";
import homeStyles from "@/views/Home/HomeView.module.scss";
import aboutStyles from "@/views/About/AboutView.module.scss";
import portfolioStyles from "@/views/Portfolio/PortfolioView.module.scss";
import connectStyles from "@/views/Connect/ConnectView.module.scss";
import Modal from "@/components/Modal";
import ConnectForm from "@/views/Connect/ConnectForm";
import { RiTriangleLine, RiTriangleFill } from "react-icons/ri";
import { PROJECT_METADATA } from "@/views/Portfolio/cards";

export interface HexCard {
  icon?: React.ReactNode;
  thumbnail?: string;
  image?: string;
  keyword?: string | React.ReactElement;
  description?: string | React.ReactElement;
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
  const [activeIndex, setActiveIndex] = useState(0);
  const [hexFiveFlipped, setHexFiveFlipped] = useState(false);
  const [slideDirection, setSlideDirection] = useState<"left" | "right" | null>(
    null
  );

  const handleSelect = (direction: "next" | "prev") => {
    setSlideDirection(direction === "next" ? "right" : "left");

    setSelectedCardIndex((prev) => {
      const newIndex =
        direction === "next"
          ? Math.min(prev! + 1, PROJECT_METADATA.length - 1)
          : Math.max(prev! - 1, 0);

      setActiveIndex(newIndex);

      setTimeout(() => {
        if (scrollRef.current) {
          smoothScrollBy(
            scrollRef.current,
            direction === "next" ? 110 : -110,
            1000
          );
        }

        setSlideDirection(null);
      }, 150);

      return newIndex;
    });
  };

  useEffect(() => {
    if (viewMode === "portfolio" && selectedCardIndex === null) {
      setSelectedCardIndex(0);
    }
  }, [viewMode, selectedCardIndex]);

  const { theme } = useTheme();
  const viewStyles = viewStylesMap[viewMode] || {};
  const scrollAnimationFrame = useRef<number | null>(null);

  const [modalType, setModalType] = useState<
    "linkedin" | "instagram" | "form" | null
  >(null);
  const handleHexClick = (type: typeof modalType) => setModalType(type);
  const closeModal = () => setModalType(null);

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
      const ease = 1 - Math.pow(1 - progress, 3);
      element.scrollTop = start + deltaY * ease;

      if (progress < 1) {
        scrollAnimationFrame.current = requestAnimationFrame(step);
      } else {
        scrollAnimationFrame.current = null;
      }
    };

    scrollAnimationFrame.current = requestAnimationFrame(step);
  };

  const handleFallbackClick = () => {
    if (viewMode === "connect") {
      // fallback behavior if needed later
    }
  };

  // Detect mobile layout and update isMobile state
  useEffect(() => {
    const checkIsMobile = () => setIsMobile(window.innerWidth < 945);
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  // Animate background hex rotation every 9s
  useEffect(() => {
    const interval = setInterval(() => {
      const step = viewMode === "about" || "portfolio" || isMobile ? 60 : 30;
      setRotation((prev) => prev + step);
    }, 9000);
    return () => clearInterval(interval);
  }, [isMobile, viewMode]);

  // Snap rotation to align hexes based on viewMode and device type
  useEffect(() => {
    const shouldSnap = viewMode === "about" || "portfolio" || isMobile;
    const offset = rotation % 60;
    if (shouldSnap && offset !== 30) {
      const adjustment = (30 - offset + 60) % 60;
      setRotation((prev) => prev + adjustment);
    }
  }, [isMobile, viewMode, rotation]);

  return (
    <div
      className={`${styles.background} ${styles[viewMode] ?? ""} ${viewMode}`}
      style={{ "--hex-rotation": `${rotation}deg` } as React.CSSProperties}
    >
      <section className={styles.hero}>
        <div className={styles.hexGrid}>
          <div className={styles.hexContainer}>
            {cards.map((card, i) => {
              const hexClass = HEX_CARD_CLASSES[i];
              const classNames = [styles.hexCard];

              if (styles[hexClass]) classNames.push(styles[hexClass]);
              if (viewStyles[hexClass]) classNames.push(viewStyles[hexClass]);

              const baseLight = card.thumbnail || card.image;
              const baseDark = card.themeThumbnailDark || card.image;
              const imageSrc = theme === "dark" ? baseDark : baseLight;

              return (
                <div
                  key={i}
                  ref={(el) => {
                    cardRefs.current[i] = el;
                  }}
                  className={classNames.join(" ")}
                  role={
                    (viewMode === "connect" && [0, 4, 8].includes(i)) ||
                    (viewMode === "portfolio" && (i === 0 || i === 8))
                      ? "button"
                      : undefined
                  }
                  tabIndex={
                    (viewMode === "connect" && [0, 4, 8].includes(i)) ||
                    (viewMode === "portfolio" && (i === 0 || i === 8))
                      ? 0
                      : undefined
                  }
                  style={{
                    pointerEvents:
                      viewMode === "portfolio" &&
                      ((i === 0 && selectedCardIndex === 0) ||
                        (i === 8 &&
                          selectedCardIndex === PROJECT_METADATA.length - 1))
                        ? "none"
                        : undefined,
                  }}
                  onClick={(e) => {
                    if (viewMode === "connect" && [0, 4, 8].includes(i)) {
                      e.stopPropagation();
                      if (i === 0) handleHexClick("linkedin");
                      else if (i === 4) handleHexClick("form");
                      else handleHexClick("instagram");
                    } else if (viewMode === "portfolio") {
                      if (i === 0 && selectedCardIndex! > 0)
                        handleSelect("prev");
                      else if (
                        i === 8 &&
                        selectedCardIndex! < PROJECT_METADATA.length - 1
                      )
                        handleSelect("next");
                    } else {
                      handleFallbackClick();
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      if (viewMode === "connect" && [0, 4, 8].includes(i)) {
                        if (i === 0) handleHexClick("linkedin");
                        else if (i === 4) handleHexClick("form");
                        else handleHexClick("instagram");
                      } else if (viewMode === "portfolio") {
                        if (i === 0 && selectedCardIndex! > 0)
                          handleSelect("prev");
                        else if (
                          i === 8 &&
                          selectedCardIndex! < PROJECT_METADATA.length - 1
                        )
                          handleSelect("next");
                      }
                    }
                  }}
                >
                  {viewMode === "portfolio" && i === 4 && (
                    <div
                      className={styles.hexHoverMask}
                      onMouseEnter={() => setHexFiveFlipped(true)}
                      onMouseLeave={() => setHexFiveFlipped(false)}
                      style={{
                        transform: `rotate(${(rotation - 30) % 360}deg)`,
                      }}
                    />
                  )}
                  <div className={`${styles.cardInner} cardInner`}>
                    <div
                      className={styles.cardFlipWrapper}
                      style={
                        viewMode === "portfolio" && i === 4
                          ? {
                              transform: hexFiveFlipped
                                ? "rotateY(180deg)"
                                : "rotateY(0deg)",
                            }
                          : undefined
                      }
                    >
                      <div className={styles.front}>
                        {(i === 4 && viewMode === "portfolio") || imageSrc ? (
                          <div className={styles.image}>
                            <div className={styles.hexMask}>
                              {viewMode === "portfolio" && i === 4 ? (
                                <div className={styles.imageLayer}>
                                  {PROJECT_METADATA.map((project, index) => {
                                    const isActive = index === activeIndex;
                                    const useDark =
                                      theme === "dark" && project.themeImageDark
                                        ? project.themeImageDark
                                        : null;
                                    const src = useDark || project.image;

                                    return (
                                      <div
                                        key={index}
                                        className={`${
                                          styles.imageSlideWrapper
                                        } ${
                                          isActive && slideDirection === "left"
                                            ? styles.slideFromLeft
                                            : isActive &&
                                              slideDirection === "right"
                                            ? styles.slideFromRight
                                            : ""
                                        }`}
                                      >
                                        <img
                                          src={src}
                                          className={`${styles.imageBase} ${
                                            isActive
                                              ? styles.visible
                                              : styles.hidden
                                          }`}
                                          alt={`${
                                            project.keyword || "Project"
                                          } ${theme} mode`}
                                          loading="eager"
                                        />
                                      </div>
                                    );
                                  })}
                                </div>
                              ) : card.image && card.themeImageDark ? (
                                <>
                                  {theme === "dark" ? (
                                    <img
                                      src={card.themeImageDark}
                                      className={styles.imageBase}
                                      alt="Dark mode image"
                                      loading="eager"
                                    />
                                  ) : (
                                    <>
                                      <img
                                        src={card.image}
                                        className={styles.imageBase}
                                        alt="Light mode image"
                                        loading="eager"
                                      />
                                      <div className={styles.flame}></div>
                                    </>
                                  )}
                                </>
                              ) : (
                                imageSrc && (
                                  <img
                                    className="default"
                                    src={imageSrc}
                                    alt="Default Image"
                                    loading="eager"
                                  />
                                )
                              )}
                            </div>
                          </div>
                        ) : null}

                        {card.icon && (
                          <div className={styles.icon}>{card.icon}</div>
                        )}

                        {card.keyword && (
                          <span className={styles.keyword}>{card.keyword}</span>
                        )}
                      </div>

                      <div className={styles.back}>
                        {card.icon && (
                          <div className={styles.icon}>{card.icon}</div>
                        )}
                        {card.description}
                        {selectedCardIndex !== null &&
                          viewMode === "portfolio" && (
                            <div className={styles.projectWrapper}>
                              <div
                                key={`project-${selectedCardIndex}`}
                                className={styles.projectDetails}
                              >
                                <div className={styles.projectThumb}>
                                  <img
                                    src={
                                      theme === "dark" &&
                                      PROJECT_METADATA[selectedCardIndex]
                                        .themeThumbnailDark
                                        ? PROJECT_METADATA[selectedCardIndex]
                                            .themeThumbnailDark
                                        : PROJECT_METADATA[selectedCardIndex]
                                            .thumbnail
                                    }
                                    alt={`${
                                      PROJECT_METADATA[selectedCardIndex]
                                        .keyword || "Project"
                                    } thumbnail`}
                                    loading="lazy"
                                  />
                                </div>
                                <div className={styles.projectContent}>
                                  <h3 className={styles.projectTitle}>
                                    {
                                      PROJECT_METADATA[selectedCardIndex]
                                        .keyword
                                    }
                                  </h3>

                                  <div className={styles.projectDescription}>
                                    {
                                      PROJECT_METADATA[selectedCardIndex]
                                        .description
                                    }
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            <div className={styles.hexScrollSpace} />
          </div>
        </div>
      </section>
      {selectedCardIndex !== null && viewMode === "portfolio" && (
        <div className={styles.thumbNav}>
          <div className={styles.chevronNav}>
            <button
              className={styles.chevronButton}
              onClick={() => handleSelect("next")}
              disabled={selectedCardIndex === PROJECT_METADATA.length - 1}
              aria-label="Previous project"
            >
              <RiTriangleLine />
              <RiTriangleFill className={styles.innerTriangle} />
            </button>

            <button
              className={`${styles.chevronButton} ${styles.downTriangle}`}
              onClick={() => handleSelect("prev")}
              disabled={selectedCardIndex === 0}
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
            <h3 className={styles.projectTitle}>
              {PROJECT_METADATA[selectedCardIndex].keyword}
            </h3>

            <div className={styles.projectThumb}>
              <div className={styles.thumbMask}>
                <div
                  className={`${styles.thumbImageWrapper} ${
                    slideDirection === "left"
                      ? styles.slideFromLeft
                      : slideDirection === "right"
                      ? styles.slideFromRight
                      : ""
                  }`}
                >
                  <img
                    src={
                      theme === "dark" &&
                      PROJECT_METADATA[selectedCardIndex].themeThumbnailDark
                        ? PROJECT_METADATA[selectedCardIndex].themeThumbnailDark
                        : PROJECT_METADATA[selectedCardIndex].thumbnail
                    }
                    alt={`${
                      PROJECT_METADATA[selectedCardIndex].keyword || "Project"
                    } thumbnail`}
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Modal isOpen={modalType !== null} onClose={closeModal}>
        {modalType === "linkedin" && (
          <>
            <p style={{ margin: 0 }}>
              You’re about to leave this site. Continue to LinkedIn?
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Button
                variant="outlined"
                sx={{
                  alignSelf: "flex-start",
                  color: "var(--accent)",
                  borderColor: "var(--accent)",
                  fontWeight: 600,
                  padding: "0.4rem 1.5rem",
                  borderRadius: "4px",
                  textTransform: "none",
                  fontSize: "14px",
                  transition: "color 0.3s ease",
                  "&:hover": {
                    backgroundColor: "transparent",
                    color: "var(--accent-hover)",
                  },
                }}
                onClick={() =>
                  window.open(
                    "https://linkedin.com/in/airynspear",
                    "_blank",
                    "noopener,noreferrer"
                  )
                }
              >
                Yes, continue
              </Button>
            </div>
          </>
        )}
        {modalType === "instagram" && (
          <>
            <p style={{ margin: 0 }}>
              You’re about to leave this site. Continue to Instagram?
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Button
                variant="outlined"
                sx={{
                  alignSelf: "flex-start",
                  color: "var(--accent)",
                  borderColor: "var(--accent)",
                  fontWeight: 600,
                  padding: "0.4rem 1.5rem",
                  borderRadius: "4px",
                  textTransform: "none",
                  transition: "color 0.3s ease",
                  "&:hover": {
                    backgroundColor: "transparent",
                    color: "var(--accent-hover)",
                  },
                }}
                onClick={() =>
                  window.open(
                    "https://instagram.com/airynspear",
                    "_blank",
                    "noopener,noreferrer"
                  )
                }
              >
                Yes, continue
              </Button>
            </div>
          </>
        )}
        {modalType === "form" && (
          <>
            <h3>connect & create</h3>
            <ConnectForm onSubmitSuccess={closeModal} />
          </>
        )}
      </Modal>
    </div>
  );
}
