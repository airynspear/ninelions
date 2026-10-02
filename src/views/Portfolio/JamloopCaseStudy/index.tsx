"use client";

import { useEffect, useRef, useState } from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import ProductSlider from "./ProductSlider";
import styles from "./JamloopCaseStudy.module.scss";

interface Props {
  open: boolean;
  onClose: () => void;
}

const designSystemSlides = [
  {
    image: "logo",
    title: "01 — Logo & Identity",
    description:
      "Evolving the Jamloop identity into a flexible visual foundation for the product.",
  },
  {
    image: "color",
    title: "02 — Color System",
    description:
      "A scalable palette built for hierarchy, accessibility, interaction, and data-rich experiences.",
  },
  {
    image: "type",
    title: "03 — Typography",
    description:
      "A clear type system balancing brand expression with readability across dense application interfaces.",
  },
  {
    image: "buttons",
    title: "04 — Buttons & Actions",
    description:
      "Consistent actions and interaction states designed to create predictable behavior across workflows.",
  },
  {
    image: "chips",
    title: "05 — Chips & Selection",
    description:
      "Flexible selection patterns designed for targeting, filtering, status, and increasingly complex campaign configuration.",
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
          <h1 id="jamloop-case-study-title" ref={headingRef} tabIndex={-1}>
            Jamloop
          </h1>
          <p className={styles.lead}>
            A connected experience for campaign management.
          </p>
          <p>
            Product design for a connected TV advertising platform, bringing campaign management and analytics together through a shared design system.
          </p>
        </header>

        <section className={styles.role} aria-labelledby="jamloop-role">
          <h2 id="jamloop-role">My Role</h2>
          <p className={styles.roleTitle}>
            Lead Product Designer
          </p>
          <p className={styles.roleTimeline}>2025 – Present</p>
          <div className={styles.roleCopy}>
            <p>
              I lead product design across Jamloop’s advertising platform, from early concepts and complex workflows through interaction design, visual systems, prototyping, and developer handoff.
            </p>
            <p>
              My engineering background informs how I collaborate with developers and design for production. My focus spans product strategy, data visualization, and a shared design language across the platform.
            </p>
          </div>
          <ul
            className={styles.responsibilities}
            aria-label="Areas of responsibility"
          >
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
            <p className={styles.problemLead}>
              The product was growing faster than the experience supporting it.
            </p>
            <p>
              As Jamloop expanded, the application accumulated inconsistent
              patterns, limited visual hierarchy, and increasingly complex
              workflows. Two areas made the need for a scalable design
              foundation especially clear: the Dashboard and Campaign Builder.
            </p>
          </div>

          <div className={styles.problemShowcase}>
            <div className={styles.problemDetails} id="jamloop-problem-details">
              <section
                className={styles.problemCard}
                aria-labelledby="jamloop-dashboard-problem"
                hidden={problemSlide !== 0}
              >
                <h3 id="jamloop-dashboard-problem">Dashboard</h3>
                <p>
                  <em>Limited hierarchy and insight</em>
                </p>
                <ul>
                  <li>Key performance data lacked visual emphasis</li>
                  <li>Data visualization was basic and difficult to explore</li>
                  <li>
                    The interface felt visually flat and disconnected from the
                    evolving brand
                  </li>
                  <li>
                    Components and patterns weren't built from a consistent system
                  </li>
                </ul>
              </section>
              <section
                className={styles.problemCard}
                aria-labelledby="jamloop-builder-problem"
                hidden={problemSlide !== 1}
              >
                <h3 id="jamloop-builder-problem">Campaign Builder</h3>
                <p>
                  <em>Complexity without enough structure</em>
                </p>
                <ul>
                  <li>Campaign creation existed as one extremely long page</li>
                  <li>
                    Users navigated many unrelated decisions in a single workflow
                  </li>
                  <li>Important settings competed equally for attention</li>
                  <li>
                    New capabilities made the experience progressively harder to
                    scale
                  </li>
                </ul>
              </section>
            </div>

            <figure
              className={`${styles.imageCard} ${styles.previousExperience}`}
            >
              <div
                className={styles.previousScreens}
                role="region"
                aria-label="Before the redesign screenshots"
                aria-roledescription="carousel"
              >
                <button
                  type="button"
                  className={styles.sliderButton}
                  aria-label="Previous screenshot"
                  aria-controls="jamloop-problem-slides jamloop-problem-details"
                  disabled={problemSlide === 0}
                  onClick={() => setProblemSlide(0)}
                >
                  <IoChevronBack aria-hidden="true" />
                </button>
                <div
                  className={styles.sliderViewport}
                  id="jamloop-problem-slides"
                >
                  <div
                    className={styles.sliderTrack}
                    style={{ transform: `translateX(-${problemSlide * 100}%)` }}
                  >
                    <div
                      className={styles.slide}
                      aria-hidden={problemSlide !== 0}
                    >
                      <img
                        src="/images/portfolio/case-study/jamloop-problem-1.png"
                        alt="Jamloop dashboard before the redesign, with summary metrics and performance charts"
                        loading="lazy"
                      />
                    </div>
                    <div
                      className={styles.slide}
                      aria-hidden={problemSlide !== 1}
                    >
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
                  aria-controls="jamloop-problem-slides jamloop-problem-details"
                  disabled={problemSlide === 1}
                  onClick={() => setProblemSlide(1)}
                >
                  <IoChevronForward aria-hidden="true" />
                </button>
              </div>
              <p
                className={styles.slideStatus}
                aria-live="polite"
                aria-atomic="true"
              >
                {problemSlide + 1} / 2 ·{" "}
                {problemSlide === 0 ? "Dashboard" : "Campaign Builder"}
              </p>
              <figcaption>
                <strong>Before the redesign.</strong> The existing experience
                provided the necessary functionality, but lacked the hierarchy,
                consistency, and extensibility needed as the platform grew.
              </figcaption>
            </figure>
          </div>

          <p className={styles.challengeStatement}>
            <strong>
              The challenge wasn't simply to modernize the UI. It was to create
              a system that could support a much more sophisticated product.
            </strong>
          </p>

        </section>

        <section
          className={styles.designSystem}
          aria-labelledby="jamloop-system"
        >
          <div className={styles.problemIntro}>
            <h2 id="jamloop-system">01 — Design System</h2>
            <h3 className={styles.problemLead}>
              Building the foundation for a product that could scale.
            </h3>
            <p>
              I established a shared design foundation for Jamloop, defining color,
              typography, hierarchy, interaction states, and reusable components
              around real product needs. This gave design and engineering a common
              reference as I redesigned the dashboard and campaign workflows.
            </p>
          </div>

          <div className={styles.designDecisions}>
            <h3>Design Decisions</h3>
            <dl className={styles.decisionGrid}>
              <div>
                <dt>Designed for reuse</dt>
                <dd>
                  Reusable patterns address recurring product needs across screens and workflows.
                </dd>
              </div>
              <div>
                <dt>Clear interaction states</dt>
                <dd>
                  Defined hover, focus, selected, disabled, and validation states communicate component behavior.
                </dd>
              </div>
              <div>
                <dt>Built for complex data</dt>
                <dd>
                  Typography, color, and hierarchy organize dense metrics and campaign settings into distinct groups.
                </dd>
              </div>
              <div>
                <dt>Design + engineering alignment</dt>
                <dd>
                  My frontend background informed component specifications and discussions with developers about implementation.
                </dd>
              </div>
            </dl>
          </div>

          <figure className={styles.imageCard}>
            <div
              className={styles.previousScreens}
              role="region"
              aria-label="Design system images"
              aria-roledescription="carousel"
            >
              <button
                type="button"
                className={styles.sliderButton}
                aria-label="Previous design system image"
                aria-controls="jamloop-design-slides"
                disabled={designSlide === 0}
                onClick={() =>
                  setDesignSlide((current) => Math.max(0, current - 1))
                }
              >
                <IoChevronBack aria-hidden="true" />
              </button>
              <div className={styles.sliderViewport} id="jamloop-design-slides">
                <div
                  className={styles.sliderTrack}
                  style={{ transform: `translateX(-${designSlide * 100}%)` }}
                >
                  {designSystemSlides.map((slide, index) => (
                    <div
                      className={styles.slide}
                      key={slide.image}
                      aria-hidden={designSlide !== index}
                    >
                      <img
                        src={`/images/portfolio/case-study/jl-ds-${slide.image}.png`}
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
                onClick={() =>
                  setDesignSlide((current) =>
                    Math.min(designSystemSlides.length - 1, current + 1)
                  )
                }
              >
                <IoChevronForward aria-hidden="true" />
              </button>
            </div>
            <figcaption
              className={styles.designCaption}
              aria-live="polite"
              aria-atomic="true"
            >
              <strong>{designSystemSlides[designSlide].title}</strong>
              <em>{designSystemSlides[designSlide].description}</em>
            </figcaption>
          </figure>
        </section>

        <section className={styles.systemProduct} aria-labelledby="jamloop-system-product">
          <div className={styles.problemIntro}>
            <h2 id="jamloop-system-product">02 — Product Experience</h2>
            <p>I applied the shared design system to two core experiences: understanding campaign performance and configuring campaigns.</p>
          </div>

          <div className={`${styles.productRow} ${styles.productImageLeft}`}>
            <div className={styles.productCopy}>
              <p className={styles.eyebrow}>Dashboard</p>
              <h3>Turning data into insight</h3>
              <p>I designed the dashboard to bring the most important metrics forward,
                with a clearer hierarchy and more purposeful data visualization.</p>
              <ul>
                <li>Prioritized key metrics for quick scanning.</li>
                <li>Organized performance trends and supporting breakdowns into focused sections.</li>
                <li>Applied consistent components, typography, color, and spacing across light and dark themes.</li>
              </ul>
            </div>
            <ProductSlider name="Dashboard" allowEnlarge={false} slides={[
              { file: "jamloop-hero-screen.png", scrollFile: "jamloop-hero-scroll.png", label: "Light theme", caption: "Summary cards foreground impressions, spend, reach, frequency, and completed views above campaign delivery details and geographic breakdowns.", alt: "Jamloop dashboard in the light theme", width: 1469, height: 1131 },
              { file: "jamloop-hero-screen-dark.png", scrollFile: "jamloop-hero-scroll-dark.png", label: "Dark theme", caption: "Distinct panels group impressions, advertiser count, spend, VCR, and CPM, with booked-versus-delivered comparisons and a geographic view below.", alt: "Jamloop dashboard in the dark theme", width: 1469, height: 1131 },
            ]} />
          </div>

          <div className={styles.productRow}>
            <div className={styles.productCopy}>
              <p className={styles.eyebrow}>Campaign Builder</p>
              <h3>Turning complexity into a guided workflow</h3>
              <p>I redesigned the single-page campaign builder as a structured,
                multi-step experience, grouping related decisions into focused stages.</p>
              <ul>
                <li>Used progressive disclosure to make complex configuration more manageable.</li>
                <li>Kept campaign estimates visible alongside configuration choices.</li>
                <li>Created reusable patterns to support new capabilities as the product grows.</li>
              </ul>
            </div>
            <ProductSlider name="Campaign Builder" slides={[
              { step: "Create", caption: "Goal cards separate awareness from conversion objectives; campaign details and billing choices sit beside contextual goal guidance." },
              { step: "Details", caption: "Line name, budget, duration, and ad strategy are grouped beneath a stage indicator, with line estimates alongside." },
              { step: "Inventory", caption: "Package cards and included/excluded app lists organize inventory choices while line estimates remain visible." },
              { step: "Audience", caption: "Audience-source cards lead into demographic controls, with age selection and targeting guidance grouped beside line estimates." },
              { step: "Geo & Time", caption: "Local and national options separate targeting scope; area search and selected-location chips organize geographic choices." },
              { step: "Review", caption: "Editable summary cards bring budget, duration, inventory, and audience selections together beside line estimates." },
            ].map(({ step, caption }, index) => ({
              file: `jamloop-campaign-${index + 1}.png`,
              frameFile: "jamloop-campaign-screen.png",
              label: `Campaign configuration · ${step}`,
              caption,
              alt: `Jamloop guided campaign builder, ${step} step`,
              width: 1469,
              height: 1131,
            }))} />
          </div>
        </section>

        <section className={`${styles.systemProduct} ${styles.problemIntro}`} aria-labelledby="jamloop-reflection">
          <h2 id="jamloop-reflection">Reflection &amp; Next Steps</h2>
          <p>
            My work across Jamloop’s design system, dashboard, and campaign builder
            connects a shared visual language with the structure of everyday tasks.
            The dashboard brings performance information into focus, while the
            campaign builder organizes complex configuration into guided stages.
          </p>
          <p>
            A key lesson from this work is that consistency extends beyond components.
            Deciding how to group choices, sequence steps, and keep supporting
            information visible is just as important as defining typography, color,
            and interaction states. Those decisions connect the design system to the
            workflows it supports.
          </p>
        </section>

        <footer className={styles.footer}>
          <button className={styles.backLink} onClick={onClose} type="button">
            ↑ back to portfolio
          </button>
        </footer>
      </div>
    </article>
  );
}
