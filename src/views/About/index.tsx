"use client";

import styles from "./AboutView.module.scss";

export default function AboutPage() {
  return (
    <main className={styles.contentContainer}>
      <div className={styles.content}>
        <h2>Airyn Spear</h2>
        <p>
          <strong>Design Technologist</strong> and <strong>UI Engineer </strong>
          with over 15 years shaping digital experiences across design and code.
          I design intuitive products, build scalable systems, and turn complex
          ideas into polished, production-ready experiences. My work bridges
          product design and frontend engineering, with a growing focus on
          AI-driven experiences and the intersection of intelligent systems,
          data, and interaction. Fluent in React and Next.js, I move comfortably
          from early concepts and design systems to the interfaces that bring
          them to life.
        </p>
      </div>
    </main>
  );
}
