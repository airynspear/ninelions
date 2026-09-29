"use client";

import { useEffect, useRef, useState } from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import styles from "./JamloopCaseStudy.module.scss";

interface Props {
  open: boolean;
  onClose: () => void;
}

const designSystemSlides = [
  {
    image: "logo",
    title: "01 — Logo & Identity",
    description: "Evolving the Jamloop identity into a flexible visual foundation for the product.",
  },
  {
    image: "colors",
    title: "02 — Color System",
    description: "A scalable palette built for hierarchy, accessibility, interaction, and data-rich experiences.",
  },
  {
    image: "typography",
    title: "03 — Typography",
    description: "A clear type system balancing brand expression with readability across dense application interfaces.",
  },
  {
    image: "buttons",
    title: "04 — Buttons & Actions",
    description: "Consistent actions and interaction states designed to create predictable behavior across workflows.",
  },
  {
    image: "chips",
    title: "05 — Chips & Selection",
    description: "Flexible selection patterns designed for targeting, filtering, status, and increasingly complex campaign configuration.",
  },
];

export default function JamloopCaseStudy({ open, onClose }: Props) {
  const [designSlide, setDesignSlide] = useState(0);
  const [problemSlide, setProblemSlide] = useState(0);
  const panelRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (open) {
      panelRef.current?.scrollTo({ top: 0, behavior: "instant" });
      headingRef.current?.focus({ preventScroll: true });
    }
  }, [open]);

  return (
    <article
      id="jamloop-case-study"
      ref={panelRef}
      className={`${styles.panel} ${open ? styles.open : ""}`}
      inert={!open}
      aria-hidden={!open}
      aria-labelledby="jamloop-case-study-title"
      onKeyDown={(event) => {
        if (event.key === "Escape") onClose();
      }}
    >
      <div className={styles.content}>
        <button className={styles.backLink} onClick={onClose} type="button">
          <span aria-hidden="true">↑</span> back to portfolio
        </button>
        <header className={styles.intro}>
          <p className={styles.eyebrow}>Case study / Product design</p>
          <h1 id="jamloop-case-study-title" ref={headingRef} tabIndex={-1}>Jamloop</h1>
          <p className={styles.lead}>A connected experience for campaign management.</p>
          <p>Product design for a connected TV advertising platform spanning campaign
            management, analytics, AI-powered optimization, and a scalable design system.</p>
        </header>

        <section className={styles.role} aria-labelledby="jamloop-role">
          <h2 id="jamloop-role">My Role</h2>
          <p className={styles.roleTitle}>Lead Product Designer · UX Design Engineer</p>
          <p className={styles.roleTimeline}>2025 – Present</p>
          <div className={styles.roleCopy}>
            <p>I lead product design across Jamloop's advertising platform, working
              from early product concepts and complex workflows through interaction
              design, visual systems, prototyping, and implementation.</p>
            <p>My engineering background allows me to work closely with developers
              and design with production in mind, while my role has increasingly
              focused on product strategy, AI-driven experiences, data visualization,
              and building a cohesive design language across the platform.</p>
          </div>
          <ul className={styles.responsibilities} aria-label="Areas of responsibility">
            <li>Product Design</li>
            <li>AI Experiences</li>
            <li>Design Systems</li>
            <li>Frontend Collaboration</li>
          </ul>
        </section>

        <figure className={`${styles.imageCard} ${styles.heroImage}`}>
          <div className={styles.heroMonitor}>
            <div className={styles.heroViewport} aria-hidden="true">
              <img
                className={styles.heroScroll}
                src="/images/portfolio/case-study/jamloop-hero-scroll.png"
                alt=""
                width={1469}
                height={2896}
              />
            </div>
            <img
              className={styles.heroScreen}
              src="/images/portfolio/case-study/jamloop-hero-screen.png"
              alt="Jamloop campaign analytics dashboard displayed on a desktop monitor"
              width={1469}
              height={1131}
            />
          </div>
          <figcaption>Campaign performance, at a glance.</figcaption>
        </figure>

        <section className={styles.problem} aria-labelledby="jamloop-problem">
          <div className={styles.problemIntro}>
            <h2 id="jamloop-problem">The Problem</h2>
            <p className={styles.problemLead}>The product was growing faster than the experience supporting it.</p>
            <p>As Jamloop expanded, the application accumulated inconsistent patterns,
              limited visual hierarchy, and increasingly complex workflows. Two areas
              made the need for a scalable design foundation especially clear: the
              Dashboard and Campaign Builder.</p>
          </div>

          <div className={styles.problemGrid}>
            <section className={styles.problemCard} aria-labelledby="jamloop-dashboard-problem">
              <h3 id="jamloop-dashboard-problem">Dashboard</h3>
              <p><em>Limited hierarchy and insight</em></p>
              <ul>
                <li>Key performance data lacked visual emphasis</li>
                <li>Data visualization was basic and difficult to explore</li>
                <li>The interface felt visually flat and disconnected from the evolving brand</li>
                <li>Components and patterns weren't built from a consistent system</li>
              </ul>
            </section>
            <section className={styles.problemCard} aria-labelledby="jamloop-builder-problem">
              <h3 id="jamloop-builder-problem">Campaign Builder</h3>
              <p><em>Complexity without enough structure</em></p>
              <ul>
                <li>Campaign creation existed as one extremely long page</li>
                <li>Users navigated many unrelated decisions in a single workflow</li>
                <li>Important settings competed equally for attention</li>
                <li>New capabilities made the experience progressively harder to scale</li>
              </ul>
            </section>
          </div>

          <p className={styles.challengeStatement}>
            <strong>The challenge wasn't simply to modernize the UI. It was to create
              a system that could support a much more sophisticated product.</strong>
          </p>

          <figure className={`${styles.imageCard} ${styles.previousExperience}`}>
            <div className={styles.previousScreens} role="region" aria-label="Before the redesign screenshots" aria-roledescription="carousel">
              <button
                type="button"
                className={styles.sliderButton}
                aria-label="Previous screenshot"
                aria-controls="jamloop-problem-slides"
                disabled={problemSlide === 0}
                onClick={() => setProblemSlide(0)}
              >
                <IoChevronBack aria-hidden="true" />
              </button>
              <div className={styles.sliderViewport} id="jamloop-problem-slides">
                <div className={styles.sliderTrack} style={{ transform: `translateX(-${problemSlide * 100}%)` }}>
                  <div className={styles.slide} aria-hidden={problemSlide !== 0}>
                    <img
                      src="/images/portfolio/case-study/jamloop-problem-1.png"
                      alt="Jamloop dashboard before the redesign, with summary metrics and performance charts"
                      loading="lazy"
                    />
                  </div>
                  <div className={styles.slide} aria-hidden={problemSlide !== 1}>
                    <img
                      src="/images/portfolio/case-study/jamloop-problem-2.png"
                      alt="Jamloop Campaign Builder before the redesign, with budget, duration, ad product, and screen settings in a long form"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
              <button
                type="button"
                className={styles.sliderButton}
                aria-label="Next screenshot"
                aria-controls="jamloop-problem-slides"
                disabled={problemSlide === 1}
                onClick={() => setProblemSlide(1)}
              >
                <IoChevronForward aria-hidden="true" />
              </button>
            </div>
            <p className={styles.slideStatus} aria-live="polite" aria-atomic="true">
              {problemSlide + 1} / 2 · {problemSlide === 0 ? "Dashboard" : "Campaign Builder"}
            </p>
            <figcaption><strong>Before the redesign.</strong> The existing experience
              provided the necessary functionality, but lacked the hierarchy,
              consistency, and extensibility needed as the platform grew.</figcaption>
          </figure>
        </section>

        <section className={styles.designSystem} aria-labelledby="jamloop-system">
          <div className={styles.problemIntro}>
            <h2 id="jamloop-system">01 — Design System</h2>
            <h3 className={styles.problemLead}>Building the foundation for a product that could scale.</h3>
            <p>Before redesigning individual workflows, I established a shared design
              foundation for the platform. The goal was more than visual consistency.
              The system needed to support increasingly complex product experiences
              while giving design and engineering a common language for building them.</p>
            <p>I evolved Jamloop’s visual identity into a scalable product design
              system, defining color, typography, hierarchy, interaction states, and
              reusable component patterns. Components were designed around real product
              needs rather than in isolation, allowing the system to grow alongside the platform.</p>
          </div>

          <div className={styles.designDecisions}>
            <h3>Design Decisions</h3>
            <dl className={styles.decisionGrid}>
              <div>
                <dt>Designed for reuse</dt>
                <dd>Patterns were created to solve recurring product problems, reducing
                  one-off solutions and making new experiences faster to design and build.</dd>
              </div>
              <div>
                <dt>Clear interaction states</dt>
                <dd>Components use consistent hover, focus, selected, disabled, and
                  validation states to make behavior predictable and accessible.</dd>
              </div>
              <div>
                <dt>Built for complex data</dt>
                <dd>Color, hierarchy, and component patterns were designed to support
                  dense campaign workflows, analytics, and data visualization without
                  overwhelming the interface.</dd>
              </div>
              <div>
                <dt>Design + engineering alignment</dt>
                <dd>My frontend background helped me design with implementation in mind,
                  creating patterns that could translate cleanly from Figma into reusable
                  production components.</dd>
              </div>
            </dl>
          </div>

          <figure className={styles.imageCard}>
            <div className={styles.previousScreens} role="region" aria-label="Design system images" aria-roledescription="carousel">
              <button
                type="button"
                className={styles.sliderButton}
                aria-label="Previous design system image"
                aria-controls="jamloop-design-slides"
                disabled={designSlide === 0}
                onClick={() => setDesignSlide((current) => Math.max(0, current - 1))}
              >
                <IoChevronBack aria-hidden="true" />
              </button>
              <div className={styles.sliderViewport} id="jamloop-design-slides">
                <div className={styles.sliderTrack} style={{ transform: `translateX(-${designSlide * 100}%)` }}>
                  {designSystemSlides.map((slide, index) => (
                    <div className={styles.slide} key={slide.image} aria-hidden={designSlide !== index}>
                      <img
                        src={`/images/portfolio/case-study/jamloop-ds-${slide.image}.png`}
                        alt={`Jamloop design system: ${slide.title.slice(5)}`}
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              </div>
              <button
                type="button"
                className={styles.sliderButton}
                aria-label="Next design system image"
                aria-controls="jamloop-design-slides"
                disabled={designSlide === designSystemSlides.length - 1}
                onClick={() => setDesignSlide((current) => Math.min(designSystemSlides.length - 1, current + 1))}
              >
                <IoChevronForward aria-hidden="true" />
              </button>
            </div>
            <figcaption className={styles.designCaption} aria-live="polite" aria-atomic="true">
              <strong>{designSystemSlides[designSlide].title}</strong>
              <em>{designSystemSlides[designSlide].description}</em>
            </figcaption>
          </figure>
        </section>

        <footer className={styles.footer}>
          <button className={styles.backLink} onClick={onClose} type="button">↑ back to portfolio</button>
        </footer>
      </div>
    </article>
  );
}
