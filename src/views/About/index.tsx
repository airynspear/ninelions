"use client";

import styles from "./AboutView.module.scss";

export default function AboutPage() {
  return (
    <main className={styles.contentContainer}>
      <div className={styles.content}>
        <h2>Airyn Spear</h2>
        <p>
          <strong>UI Engineer</strong> and <strong>Design Technologist</strong>
          with over 15 years shaping digital experiences. Building elegant
          systems and interfaces that feel effortless, yet scale with intent.
          Moving between design and code with fluency, guided by clarity,
          curiosity, and craft. Recently drawn to the edges where AI, data, and
          interaction converge. Often explores solutions with React and Next.js,
          while staying open to tools that best fit the vision.
        </p>
      </div>
    </main>
  );
}
