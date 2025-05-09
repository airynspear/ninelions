import styles from "./page.module.scss";

export default function Home() {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <h2 className={styles.subtitle}>
          Creating modern, intuitive interfaces, with clarity and purpose.
        </h2>
        <p className={styles.description}>
          Frontend Development · UX Design · Data Visualization · AI Tools
        </p>
      </div>
    </section>
  );
}
