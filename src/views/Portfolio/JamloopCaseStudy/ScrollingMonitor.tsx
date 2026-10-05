"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./JamloopCaseStudy.module.scss";

export default function ScrollingMonitor({ screen, scroll, alt, animated = true }: { screen: string; scroll: string; alt: string; animated?: boolean }) {
  const monitorRef = useRef<HTMLSpanElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const monitor = monitorRef.current;
    if (!animated || !monitor) return;

    const observer = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting && entry.intersectionRatio >= 0.15);
    }, { threshold: [0, 0.15] });
    observer.observe(monitor);
    return () => observer.disconnect();
  }, [animated]);

  return (
    <span ref={monitorRef} className={`${styles.heroMonitor} ${styles.sliderMonitor}`}>
      <span className={animated ? styles.heroViewport : styles.campaignViewport} aria-hidden="true">
        <img className={animated ? styles.heroScroll : undefined} style={animated ? { animationPlayState: inView ? "running" : "paused" } : undefined} src={`/images/portfolio/jamloop/case-study/${scroll}`} alt="" width={1469} height={animated ? 2896 : 1131} />
      </span>
      <img className={styles.heroScreen} src={`/images/portfolio/jamloop/case-study/${screen}`} alt={alt} width={1469} height={1131} />
    </span>
  );
}
