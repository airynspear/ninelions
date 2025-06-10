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
import { IoTriangleSharp } from "react-icons/io5";
import TriangleIcon from "@/assets/icons/triangle.svg";
import { PROJECT_METADATA } from "@/views/Portfolio/cards";

export interface HexCard {
  icon?: React.ReactNode;
  thumbnail?: string;
  image?: string;
  keyword?: string | React.ReactElement;
  description?: string | React.ReactElement;
  themeImageDark?: string;
  themeThumbnailDark?: string;
  secondaryImageTwo?: string;
  secondaryImageThree?: string;
  secondaryImageSeven?: string;
  secondaryImageEight?: string;
  secondaryImageTwoLight?: string;
  secondaryImageThreeLight?: string;
  secondaryImageSevenLight?: string; // ✅ fixed
  secondaryImageEightLight?: string;
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
  const [slideDirection, setSlideDirection] = useState<"next" | "prev" | null>(
    null
  );
  const [lastIndex, setLastIndex] = useState<number | null>(null);
  const [activeGridClass, setActiveGridClass] = useState<string | null>(null);

  const handleHexToggle = (hexIndex: number) => {
    const base = HEX_CARD_CLASSES[hexIndex];

    const gridClass = base.replace("hexCard", "hexGrid");
    setActiveGridClass((prev) => (prev === gridClass ? null : gridClass));
  };

  const handleSelect = (direction: "next" | "prev") => {
    setSlideDirection(direction === "next" ? "next" : "prev");

    setLastIndex(selectedCardIndex); // Track current index before it changes

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
        setLastIndex(null); // Reset ghost render
      }, 600);

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
      const step =
        viewMode === "about" ||
        viewMode === "portfolio" ||
        viewMode === "home" ||
        isMobile
          ? 60
          : 30;
      setRotation((prev) => prev + step);
    }, 9000);
    return () => clearInterval(interval);
  }, [isMobile, viewMode]);

  // Snap rotation to align hexes based on viewMode and device type
  useEffect(() => {
    const shouldSnap =
      viewMode === "about" ||
      viewMode === "portfolio" ||
      viewMode === "home" ||
      isMobile;
    const offset = rotation % 60;
    if (shouldSnap && offset !== 30) {
      const adjustment = (30 - offset + 60) % 60;
      setRotation((prev) => prev + adjustment);
    }
  }, [isMobile, viewMode, rotation]);

  console.log(selectedCardIndex);

  return (
    <div
      className={`${styles.background} ${styles[viewMode] ?? ""} ${viewMode}`}
      style={{ "--hex-rotation": `${rotation}deg` } as React.CSSProperties}
    >
      <section className={styles.hero}>
        <div
          className={`${styles.hexGrid} ${
            activeGridClass && styles[activeGridClass]
              ? styles[activeGridClass]
              : ""
          }`}
        >
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
                    } else if (
                      viewMode === "portfolio" &&
                      [1, 2, 4, 6, 7].includes(i) // only those cards toggle the grid class
                    ) {
                      handleHexToggle(i);
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
                      } else if (
                        viewMode === "portfolio" &&
                        [1, 2, 4, 6, 7].includes(i) // only those cards toggle the grid class
                      ) {
                        handleHexToggle(i);
                      } else {
                        handleFallbackClick();
                      }
                    }
                  }}
                >
                  {viewMode === "portfolio" && i === 4 && (
                    <div
                      style={{
                        transform: `rotate(${(rotation - 30) % 360}deg)`,
                      }}
                    />
                  )}
                  <div className={`${styles.cardInner} cardInner`}>
                    <div className={styles.cardFlipWrapper}>
                      <div className={styles.front}>
                        {((i === 4 ||
                          i === 1 ||
                          i === 2 ||
                          i === 6 ||
                          i === 7) &&
                          viewMode === "portfolio") ||
                        imageSrc ? (
                          <div className={styles.image}>
                            <div className={styles.hexMask}>
                              {viewMode === "portfolio" && i === 4 ? (
                                // === Main hexFive image with transition logic ===
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
                                          isActive && slideDirection === "prev"
                                            ? styles.slideFromLeft
                                            : isActive &&
                                              slideDirection === "next"
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
                              ) : viewMode === "portfolio" && i === 1 ? (
                                <div className={styles.imageLayer}>
                                  {PROJECT_METADATA.map((project, index) => {
                                    const isActive = index === activeIndex;

                                    const useLight =
                                      theme === "light" &&
                                      project.secondaryImageTwoLight
                                        ? project.secondaryImageTwoLight
                                        : null;
                                    const src =
                                      useLight || project.secondaryImageTwo;
                                    if (!src) return null;

                                    return (
                                      <div
                                        key={`hex1-img-${index}`}
                                        className={`${
                                          styles.imageSlideWrapper
                                        } ${
                                          isActive && slideDirection === "prev"
                                            ? styles.slideFromLeft
                                            : isActive &&
                                              slideDirection === "next"
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
                                          } hexTwo`}
                                          loading="eager"
                                        />
                                      </div>
                                    );
                                  })}
                                </div>
                              ) : viewMode === "portfolio" && i === 2 ? (
                                <div className={styles.imageLayer}>
                                  {PROJECT_METADATA.map((project, index) => {
                                    const isActive = index === activeIndex;

                                    const useLight =
                                      theme === "light" &&
                                      project.secondaryImageThreeLight
                                        ? project.secondaryImageThreeLight
                                        : null;
                                    const src =
                                      useLight || project.secondaryImageThree;
                                    if (!src) return null;

                                    return (
                                      <div
                                        key={`hex2-img-${index}`}
                                        className={`${
                                          styles.imageSlideWrapper
                                        } ${
                                          isActive && slideDirection === "prev"
                                            ? styles.slideFromLeft
                                            : isActive &&
                                              slideDirection === "next"
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
                                          } hexThree`}
                                          loading="eager"
                                        />
                                      </div>
                                    );
                                  })}
                                </div>
                              ) : viewMode === "portfolio" && i === 6 ? (
                                <div className={styles.imageLayer}>
                                  {PROJECT_METADATA.map((project, index) => {
                                    const isActive = index === activeIndex;

                                    const useLight =
                                      theme === "light" &&
                                      project.secondaryImageSevenLight
                                        ? project.secondaryImageSevenLight
                                        : null;
                                    const src =
                                      useLight || project.secondaryImageSeven;
                                    if (!src) return null;

                                    return (
                                      <div
                                        key={`hex6-img-${index}`}
                                        className={`${
                                          styles.imageSlideWrapper
                                        } ${
                                          isActive && slideDirection === "prev"
                                            ? styles.slideFromLeft
                                            : isActive &&
                                              slideDirection === "next"
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
                                          } hexSeven`}
                                          loading="eager"
                                        />
                                      </div>
                                    );
                                  })}
                                </div>
                              ) : viewMode === "portfolio" && i === 7 ? (
                                <div className={styles.imageLayer}>
                                  {PROJECT_METADATA.map((project, index) => {
                                    const isActive = index === activeIndex;

                                    const useLight =
                                      theme === "light" &&
                                      project.secondaryImageEightLight
                                        ? project.secondaryImageEightLight
                                        : null;
                                    const src =
                                      useLight || project.secondaryImageEight;
                                    if (!src) return null;

                                    return (
                                      <div
                                        key={`hex7-img-${index}`}
                                        className={`${
                                          styles.imageSlideWrapper
                                        } ${
                                          isActive && slideDirection === "prev"
                                            ? styles.slideFromLeft
                                            : isActive &&
                                              slideDirection === "next"
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
                                          } hexEight`}
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
            {selectedCardIndex !== null && viewMode === "portfolio" && (
              <div className={styles.chevronNav}>
                <button
                  className={`${styles.chevronButton} ${
                    selectedCardIndex === PROJECT_METADATA.length - 1 &&
                    selectedCardIndex > 0
                      ? styles.showInnerPrev
                      : ""
                  }`}
                  onClick={() => handleSelect("prev")}
                  disabled={selectedCardIndex === 0}
                  aria-label="Previous project"
                >
                  <TriangleIcon className={styles.customTriangle} />
                  <div className={styles.triangleMask}>
                    <IoTriangleSharp className={styles.innerTriangle} />
                  </div>
                </button>

                <button
                  className={`${styles.chevronButton} ${styles.rightTriangle} ${
                    selectedCardIndex > 0 &&
                    selectedCardIndex < PROJECT_METADATA.length - 1
                      ? ""
                      : styles.showInnerNext
                  }`}
                  onClick={() => handleSelect("next")}
                  disabled={selectedCardIndex === PROJECT_METADATA.length - 1}
                  aria-label="Next project"
                >
                  <TriangleIcon className={styles.customTriangle} />
                  <div className={styles.triangleMask}>
                    <IoTriangleSharp className={styles.innerTriangle} />
                  </div>
                </button>
              </div>
            )}
            {selectedCardIndex !== null && viewMode === "portfolio" && (
              <div className={styles.thumbNav}>
                <div className={styles.navThumbs}>
                  {/* Prev Thumbnail */}
                  <div className={styles.prevThumbContainer}>
                    {selectedCardIndex > 0 && (
                      <button
                        className={`${styles.navButton} ${styles.prevThumb}`}
                        onClick={() => handleSelect("prev")}
                        aria-label="Previous project"
                      >
                        <div className={styles.thumbMask}>
                          <div
                            className={`${styles.thumbImageWrapper} ${
                              slideDirection === "next"
                                ? styles.slideFromRight
                                : slideDirection === "prev"
                                ? styles.slideOutRight
                                : ""
                            }`}
                          >
                            <img
                              src={
                                theme === "dark" &&
                                PROJECT_METADATA[selectedCardIndex - 1]
                                  ?.themeThumbnailDark
                                  ? PROJECT_METADATA[selectedCardIndex - 1]
                                      .themeThumbnailDark
                                  : PROJECT_METADATA[selectedCardIndex - 1]
                                      ?.thumbnail
                              }
                              alt="Previous Project"
                            />
                          </div>

                          {/* 👇 GHOST THUMB overlaid during prev */}
                          {slideDirection === "prev" &&
                            lastIndex !== null &&
                            lastIndex > 1 && (
                              <div
                                className={`${styles.thumbImageWrapper} ${styles.slideFromLeft}`}
                                style={{
                                  position: "absolute",
                                  top: 0,
                                  left: 0,
                                }}
                              >
                                <img
                                  src={
                                    theme === "dark" &&
                                    PROJECT_METADATA[lastIndex - 2]
                                      ?.themeThumbnailDark
                                      ? PROJECT_METADATA[lastIndex - 2]
                                          .themeThumbnailDark
                                      : PROJECT_METADATA[lastIndex - 2]
                                          ?.thumbnail
                                  }
                                  alt="Incoming Previous Project"
                                />
                              </div>
                            )}
                        </div>
                      </button>
                    )}
                  </div>

                  {/* Current Project */}
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
                            slideDirection === "prev"
                              ? styles.slideFromLeft
                              : slideDirection === "next"
                              ? styles.slideFromRight
                              : ""
                          }`}
                        >
                          <img
                            src={
                              theme === "dark" &&
                              PROJECT_METADATA[selectedCardIndex]
                                .themeThumbnailDark
                                ? PROJECT_METADATA[selectedCardIndex]
                                    .themeThumbnailDark
                                : PROJECT_METADATA[selectedCardIndex].thumbnail
                            }
                            alt={`${
                              PROJECT_METADATA[selectedCardIndex].keyword ||
                              "Project"
                            } thumbnail`}
                            loading="lazy"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Next Thumbnail */}
                  <div className={styles.nextThumbContainer}>
                    {selectedCardIndex < PROJECT_METADATA.length - 1 && (
                      <button
                        className={`${styles.navButton} ${styles.nextThumb}`}
                        onClick={() => handleSelect("next")}
                        aria-label="Next project"
                      >
                        <div className={styles.thumbMask}>
                          <div
                            className={`${styles.thumbImageWrapper} ${
                              slideDirection === "prev"
                                ? styles.slideFromLeft // when going to prev, next slides in from left
                                : slideDirection === "next"
                                ? styles.slideOutLeft // when going to next, next slides out left
                                : ""
                            }`}
                          >
                            <img
                              src={
                                theme === "dark" &&
                                PROJECT_METADATA[selectedCardIndex + 1]
                                  .themeThumbnailDark
                                  ? PROJECT_METADATA[selectedCardIndex + 1]
                                      .themeThumbnailDark
                                  : PROJECT_METADATA[selectedCardIndex + 1]
                                      .thumbnail
                              }
                              alt="Next Project"
                            />
                          </div>
                          {/* 👇 GHOST THUMB overlaid during next */}
                          {slideDirection === "next" &&
                            lastIndex !== null &&
                            lastIndex < PROJECT_METADATA.length - 2 && (
                              <div
                                className={`${styles.thumbImageWrapper} ${styles.slideFromRight}`}
                                style={{
                                  position: "absolute",
                                  top: 0,
                                  left: 0,
                                }}
                              >
                                <img
                                  src={
                                    theme === "dark" &&
                                    PROJECT_METADATA[lastIndex + 2]
                                      ?.themeThumbnailDark
                                      ? PROJECT_METADATA[lastIndex + 2]
                                          .themeThumbnailDark
                                      : PROJECT_METADATA[lastIndex + 2]
                                          ?.thumbnail
                                  }
                                  alt="Incoming Next Project"
                                />
                              </div>
                            )}
                        </div>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

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
