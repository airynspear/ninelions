"use client";

import { useEffect, useRef, useState } from "react";
import ProductSlider from "../JamloopCaseStudy/ProductSlider";
import styles from "../JamloopCaseStudy/JamloopCaseStudy.module.scss";
import unitedStyles from "./UnitedCaseStudy.module.scss";
import { unitedImages, unitedHero } from "./images";

const responsibilities = [
  "High-fidelity prototyping",
  "Component engineering",
  "Data visualization",
  "Design-to-code workflows",
];
const tools = [
  "React",
  "Next.js",
  "Stencil.js",
  "TypeScript",
  "SCSS",
  "Figma",
  "Storybook",
  "Figma MCP",
  "Claude Code",
];

export default function UnitedCaseStudy({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const panelRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const hero = unitedHero;
  const heroRef = useRef<HTMLDivElement>(null);
  const [heroScrolling, setHeroScrolling] = useState(false);

  useEffect(() => {
    const monitor = heroRef.current;
    setHeroScrolling(false);
    if (!open || !monitor) return;

    let startTimer: ReturnType<typeof setTimeout> | undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect();
          startTimer = setTimeout(() => setHeroScrolling(true), 1500);
        }
      },
      { root: panelRef.current, threshold: 0 }
    );

    observer.observe(monitor);
    return () => {
      clearTimeout(startTimer);
      observer.disconnect();
    };
  }, [open]);

  useEffect(() => {
    if (open) {
      panelRef.current?.scrollTo({ top: 0, behavior: "instant" });
      headingRef.current?.focus({ preventScroll: true });
    }
  }, [open]);

  return (
    <article
      id="united-case-study"
      ref={panelRef}
      className={`${styles.panel} ${unitedStyles.panel} ${
        open ? styles.open : ""
      }`}
      inert={!open}
      aria-hidden={!open}
      aria-labelledby="united-case-study-title"
      onKeyDown={(event) => {
        if (event.key === "Escape") onClose();
      }}
    >
      <div className={styles.content}>
        <button className={styles.backLink} onClick={onClose} type="button">
          <span aria-hidden="true">↑</span> back to portfolio
        </button>
        <header className={`${styles.intro} ${unitedStyles.intro}`}>
          <p className={styles.eyebrow}>Case study / UI engineering</p>
          <h1 id="united-case-study-title" ref={headingRef} tabIndex={-1}>
            United Airlines
          </h1>
          <p className={styles.lead}>
            Bringing the Orion design system to life.
          </p>
          <p>
            UI engineering for United’s Orion design system, connecting design
            and development through high-fidelity prototypes, reusable
            components, and data visualization.
          </p>
        </header>

        <section className={styles.role} aria-labelledby="united-role">
          <h2 id="united-role">My Role</h2>
          <p className={styles.roleTitle}>UI Engineer</p>
          <p className={styles.roleTimeline}>2024–2026</p>
          <div className={styles.roleCopy}>
            <p>
              I worked at the intersection of design and frontend engineering,
              translating Figma designs into working interfaces and helping
              maintain the shared components behind them.
            </p>
            <p>
              My contributions included high-fidelity prototyping, reusable web
              components, and documentation for the Orion Design System, which
              supported more than 25 development teams.
            </p>
          </div>
          <ul
            className={styles.responsibilities}
            aria-label="Areas of responsibility"
          >
            {responsibilities.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <figure className={`${styles.imageCard} ${styles.heroImage}`}>
          <div ref={heroRef} className={styles.heroMonitor}>
            <div className={unitedStyles.heroViewport} aria-hidden="true">
              <img
                className={unitedStyles.heroScroll}
                style={{
                  animationPlayState: heroScrolling ? "running" : "paused",
                }}
                src={hero.scroll}
                alt=""
                width={hero.width}
                height={hero.scrollHeight}
              />
            </div>
            <img
              className={styles.heroScreen}
              src={hero.screen}
              alt={hero.alt}
              width={hero.width}
              height={hero.height}
            />
          </div>
          <figcaption>{hero.caption}</figcaption>
        </figure>

        <section
          className={`${styles.productRow} ${styles.productImageLeft} ${unitedStyles.sliderSection}`}
          aria-labelledby="united-prototyping"
        >
          <div className={styles.productCopy}>
            <h2 id="united-prototyping" className={styles.eyebrow}>
              01 — High-Fidelity Prototyping
            </h2>
            <h3>Making design tangible in the browser.</h3>
            <p>
              I created high-fidelity prototypes using the Orion design library,
              translating designs into interactive interfaces.
            </p>
            <ul>
              <li>Built prototypes with React and Next.js.</li>
              <li>
                Used shared components to stay connected to the system’s visual
                language.
              </li>
              <li>Applied reusable patterns across prototype interfaces.</li>
            </ul>
          </div>
          <ProductSlider
            name="Orion prototyping examples"
            slides={unitedImages.prototypes}
          />
        </section>

        <section
          className={`${styles.productRow} ${unitedStyles.sliderSection}`}
          aria-labelledby="united-components"
        >
          <div className={styles.productCopy}>
            <h2 id="united-components" className={styles.eyebrow}>
              02 — Building the Component Library
            </h2>
            <h3>Reusable components, attention to detail.</h3>
            <p>
              I developed and maintained reusable web components with
              Stencil.js, TypeScript, and SCSS.
            </p>
            <ul>
              <li>
                Partnered with designers to translate Figma specifications into
                implementation.
              </li>
              <li>
                Built component variants, interaction states, and theme support.
              </li>
              <li>
                Modernized Storybook documentation and component architecture.
              </li>
            </ul>
          </div>
          <ProductSlider
            name="Orion components"
            slides={unitedImages.components}
          />
        </section>

        <section
          className={`${styles.productRow} ${styles.productImageLeft} ${unitedStyles.sliderSection}`}
          aria-labelledby="united-visualization"
        >
          <div className={styles.productCopy}>
            <h2 id="united-visualization" className={styles.eyebrow}>
              03 — Data Visualization Within the System
            </h2>
            <h3>Exploring color across charts and themes.</h3>
            <p>
              My Orion work also included data visualization examples, bringing
              chart types and palette variations into the component
              demonstration environment. These examples made it possible to
              inspect color choices across different charts, series counts, and
              light and dark themes.
            </p>
          </div>
          <ProductSlider
            name="Orion data visualization"
            className={unitedStyles.dataVisualizationSlider}
            slides={unitedImages.charts}
          />
        </section>

        <section
          className={unitedStyles.fullWidthSection}
          aria-labelledby="united-workflow"
        >
          <div className={styles.problemIntro}>
            <h2 id="united-workflow" className={styles.eyebrow}>
              04 — Design-to-Code Workflow
            </h2>
            <h3>Evaluating new ways to connect design and implementation.</h3>
            <p>
              Alongside component and prototype development, I evaluated Figma
              MCP and Claude Code as part of an AI-assisted development
              workflow. This exploration focused on how those tools could
              support the translation of design context into frontend
              implementation.
            </p>
          </div>
          <ul
            className={unitedStyles.tools}
            aria-label="Tools used across my Orion work"
          >
            {tools.map((tool) => (
              <li key={tool}>{tool}</li>
            ))}
          </ul>
        </section>

        <section
          className={styles.problemIntro}
          aria-labelledby="united-closing"
        >
          <h2 id="united-closing">Connecting Design and Implementation</h2>
          <p>
            My work on Orion connected high-fidelity prototypes with the
            reusable components and documentation that support them. It brought
            together the visual detail of interface design and the engineering
            work needed to make shared patterns consistent and maintainable.
          </p>
        </section>
        <footer className={styles.footer}>
          <button className={styles.backLink} onClick={onClose} type="button">
            <span aria-hidden="true">↑</span> back to portfolio
          </button>
        </footer>
      </div>
    </article>
  );
}
