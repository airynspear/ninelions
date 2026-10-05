"use client";

import { type CSSProperties, useEffect, useId, useRef, useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import ScrollingMonitor from "./ScrollingMonitor";
import styles from "./JamloopCaseStudy.module.scss";

export type Slide = {
  label: string;
  caption?: string;
  alt: string;
  height: number;
  width?: number;
  scrollFile?: string;
  frameFile?: string;
  frameSrc?: string;
  frameClip?: string;
  scrollHeight?: number;
  viewportBottom?: number;
} & ({ file: string; src?: never } | { src: string; file?: never });

const jamloopSource = (file: string) => `/images/portfolio/jamloop/case-study/${file}`;
const imageSource = (slide: Slide) => slide.src ?? jamloopSource(slide.file);

// Retain decoded images so the browser can paint the next slide immediately.
const decodedImages = new Map<string, Promise<HTMLImageElement>>();

function prepareImage(src: string) {
  let pending = decodedImages.get(src);
  if (!pending) {
    const image = new Image();
    image.src = src;
    pending = image.decode().then(() => image).catch((error) => {
      decodedImages.delete(src);
      throw error;
    });
    decodedImages.set(src, pending);
  }
  return pending;
}

function prepareSlide(slide: Slide) {
  return Promise.all([
    imageSource(slide),
    ...(slide.frameSrc ? [slide.frameSrc] : []),
    ...[slide.scrollFile, slide.frameFile]
      .filter((file): file is string => Boolean(file))
      .map(jamloopSource),
  ].map(prepareImage));
}

// Keep this component mounted across slides so image swaps preserve the scroll timeline.
function FramedScreenshot({ slide }: { slide: Slide }) {
  const monitorRef = useRef<HTMLSpanElement>(null);
  const [scrolling, setScrolling] = useState(false);
  const animated = Boolean(slide.scrollHeight && slide.viewportBottom);

  useEffect(() => {
    const monitor = monitorRef.current;
    if (!animated || !monitor) return;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        observer.disconnect();
        timer = setTimeout(() => setScrolling(true), 1500);
      }
    });
    observer.observe(monitor);
    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [animated]);

  return (
    <span ref={monitorRef} className={`${styles.heroMonitor} ${styles.sliderMonitor}`}>
      <span className={styles.framedViewport} style={{ clipPath: slide.frameClip }} aria-hidden="true">
        <img
          className={animated ? styles.framedScroll : undefined}
          style={animated ? {
            animationPlayState: scrolling ? "running" : "paused",
            "--scroll-distance": `${-100 * (slide.scrollHeight! - slide.viewportBottom!) / slide.scrollHeight!}%`,
          } as CSSProperties : undefined}
          src={imageSource(slide)} alt="" width={slide.width} height={slide.scrollHeight ?? slide.height}
        />
      </span>
      <img className={styles.heroScreen} src={slide.frameSrc} alt={slide.alt} width={slide.width} height={slide.height} />
    </span>
  );
}

export default function ProductSlider({ name, slides, allowEnlarge = true, className = "" }: { name: string; slides: Slide[]; allowEnlarge?: boolean; className?: string }) {
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
      className={`${styles.productSlider} ${className}`}
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
          {slide.frameSrc ? (
            <FramedScreenshot slide={slide} />
          ) : slide.file !== undefined && (slide.scrollFile || slide.frameFile) ? (
            <ScrollingMonitor screen={slide.frameFile ?? slide.file} scroll={slide.scrollFile ?? slide.file} alt={slide.alt} animated={!slide.frameFile} />
          ) : (
            <img src={imageSource(slide)} alt={slide.alt} width={slide.width ?? 1280} height={slide.height} loading="lazy" />
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
        onKeyDown={(event) => {
          event.stopPropagation();
          if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
            event.preventDefault();
            void move(event.key === "ArrowLeft" ? -1 : 1);
          }
        }}
      >
        <DialogTitle id={`${id}-title`} className={styles.enlargedTitle}>{name} · {slide.label}</DialogTitle>
        <button autoFocus type="button" className={styles.enlargedClose} onClick={() => setEnlarged(false)} aria-label="Close enlarged screenshot">
          <span aria-hidden="true">×</span>
        </button>
        <DialogContent className={styles.enlargedContent}>
          <div className={styles.enlargedSliderRow}>
            <button type="button" className={styles.sliderButton} aria-label={`Previous ${name} screenshot`} aria-controls={`${id}-enlarged`} onClick={() => move(-1)}>
              <IoChevronBack aria-hidden="true" />
            </button>
            <div id={`${id}-enlarged`} className={styles.enlargedSlide}>
              {slide.frameSrc ? (
                <div className={styles.fittedMonitor} style={{ width: `min(100%, calc((100dvh - 230px) * ${slide.width ?? 1280} / ${slide.height}))` }}>
                  <FramedScreenshot slide={slide} />
                </div>
              ) : slide.file !== undefined && (slide.scrollFile || slide.frameFile) ? (
                <div className={styles.fittedMonitor}>
                  <ScrollingMonitor screen={slide.frameFile ?? slide.file} scroll={slide.scrollFile ?? slide.file} alt={slide.alt} animated={!slide.frameFile} />
                </div>
              ) : (
                <img className={styles.fittedScreenshot} src={imageSource(slide)} alt={slide.alt} width={slide.width ?? 1280} height={slide.height} />
              )}
            </div>
            <button type="button" className={styles.sliderButton} aria-label={`Next ${name} screenshot`} aria-controls={`${id}-enlarged`} onClick={() => move(1)}>
              <IoChevronForward aria-hidden="true" />
            </button>
          </div>
          <p className={styles.productSlideLabel} aria-live="polite" aria-atomic="true">{index + 1} / {slides.length} · {slide.label}{slide.caption && <> — {slide.caption}</>}</p>
          {loadError && <p role="status" className={styles.inspectHint}>{loadError}</p>}
        </DialogContent>
      </Dialog>
    </div>
  );
}
