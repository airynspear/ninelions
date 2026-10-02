"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import ScrollingMonitor from "./ScrollingMonitor";
import styles from "./JamloopCaseStudy.module.scss";

interface Slide {
  file: string;
  label: string;
  caption?: string;
  alt: string;
  height: number;
  width?: number;
  scrollFile?: string;
  frameFile?: string;
}

// Retain decoded images so the browser can paint the next slide immediately.
const decodedImages = new Map<string, Promise<HTMLImageElement>>();

function prepareImage(file: string) {
  let pending = decodedImages.get(file);
  if (!pending) {
    const image = new Image();
    image.src = `/images/portfolio/case-study/${file}`;
    pending = image.decode().then(() => image).catch((error) => {
      decodedImages.delete(file);
      throw error;
    });
    decodedImages.set(file, pending);
  }
  return pending;
}

function prepareSlide(slide: Slide) {
  return Promise.all([slide.file, slide.scrollFile, slide.frameFile]
    .filter((file): file is string => Boolean(file))
    .map(prepareImage));
}

export default function ProductSlider({ name, slides, allowEnlarge = true }: { name: string; slides: Slide[]; allowEnlarge?: boolean }) {
  const [index, setIndex] = useState(0);
  const [enlarged, setEnlarged] = useState(false);
  const ImageContainer = allowEnlarge ? "button" : "div";
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const swiped = useRef(false);
  const requestedIndex = useRef(0);
  const navigationRequest = useRef(0);
  const [loadError, setLoadError] = useState("");
  const id = useId();

  useEffect(() => {
    slides.forEach((item) => { void prepareSlide(item).catch(() => {}); });
  }, [slides]);

  useEffect(() => () => { navigationRequest.current += 1; }, []);
  const slide = slides[index];
  const move = async (delta: number) => {
    const next = (requestedIndex.current + delta + slides.length) % slides.length;
    requestedIndex.current = next;
    const request = ++navigationRequest.current;
    setLoadError("");
    try {
      await prepareSlide(slides[next]);
      if (request === navigationRequest.current) setIndex(next);
    } catch {
      if (request === navigationRequest.current) {
        requestedIndex.current = index;
        setLoadError("This image could not load. Please try again.");
      }
    }
  };

  return (
    <div
      className={styles.productSlider}
      role="region"
      aria-roledescription="carousel"
      aria-label={`${name} screenshots`}
      onKeyDown={(event) => {
        if (enlarged) return;
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
          event.preventDefault();
          event.stopPropagation();
          move(event.key === "ArrowLeft" ? -1 : 1);
        }
      }}
    >
      <div className={styles.productSliderRow}>
        <button type="button" className={styles.sliderButton} aria-label={`Previous ${name} screenshot`} aria-controls={id} onClick={() => move(-1)}>
          <IoChevronBack aria-hidden="true" />
        </button>
        <ImageContainer
          type={allowEnlarge ? "button" : undefined}
          id={id}
          className={`${styles.screenshotButton} ${!allowEnlarge ? styles.staticScreenshot : ""}`}
          style={{ aspectRatio: `${Math.min(...slides.map((item) => (item.width ?? 1280) / item.height))}` }}
          aria-label={allowEnlarge ? `Enlarge ${name}: ${slide.label}` : undefined}
          aria-haspopup={allowEnlarge ? "dialog" : undefined}
          onTouchStart={(event) => {
            const touch = event.touches[0];
            touchStart.current = { x: touch.clientX, y: touch.clientY };
            swiped.current = false;
          }}
          onTouchCancel={() => { touchStart.current = null; }}
          onTouchEnd={(event) => {
            const start = touchStart.current;
            touchStart.current = null;
            if (!start) return;
            const touch = event.changedTouches[0];
            const dx = touch.clientX - start.x;
            const dy = touch.clientY - start.y;
            if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
              swiped.current = true;
              move(dx < 0 ? 1 : -1);
            }
          }}
          onClick={() => {
            if (swiped.current) { swiped.current = false; return; }
            if (allowEnlarge) setEnlarged(true);
          }}
        >
          {slide.scrollFile || slide.frameFile ? (
            <ScrollingMonitor screen={slide.frameFile ?? slide.file} scroll={slide.scrollFile ?? slide.file} alt={slide.alt} animated={!slide.frameFile} />
          ) : (
            <img src={`/images/portfolio/case-study/${slide.file}`} alt={slide.alt} width={slide.width ?? 1280} height={slide.height} loading="lazy" />
          )}
        </ImageContainer>
        <button type="button" className={styles.sliderButton} aria-label={`Next ${name} screenshot`} aria-controls={id} onClick={() => move(1)}>
          <IoChevronForward aria-hidden="true" />
        </button>
      </div>
      <p className={styles.productSlideLabel} aria-live="polite" aria-atomic="true">{index + 1} / {slides.length} · {slide.label}{slide.caption && <> — {slide.caption}</>}</p>
      {loadError && <p role="status" className={styles.inspectHint}>{loadError}</p>}
      {allowEnlarge && <p className={styles.inspectHint}>Select image to enlarge</p>}
      <Dialog
        open={enlarged}
        onClose={() => setEnlarged(false)}
        maxWidth={false}
        aria-labelledby={`${id}-title`}
        transitionDuration={0}
        PaperProps={{ className: styles.enlargedPaper }}
        onKeyDown={(event) => event.stopPropagation()}
      >
        <DialogTitle id={`${id}-title`} className={styles.enlargedTitle}>{name} · {slide.label}</DialogTitle>
        <button autoFocus type="button" className={styles.enlargedClose} onClick={() => setEnlarged(false)} aria-label="Close enlarged screenshot">
          <span aria-hidden="true">×</span>
        </button>
        <DialogContent className={styles.enlargedContent}>
          {slide.scrollFile || slide.frameFile ? (
            <div className={styles.fittedMonitor}>
              <ScrollingMonitor screen={slide.frameFile ?? slide.file} scroll={slide.scrollFile ?? slide.file} alt={slide.alt} animated={!slide.frameFile} />
            </div>
          ) : (
            <img className={styles.fittedScreenshot} src={`/images/portfolio/case-study/${slide.file}`} alt={slide.alt} width={slide.width ?? 1280} height={slide.height} />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
