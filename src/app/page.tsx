import styles from "./page.module.scss";

export default function Home() {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <h1 className={styles.title}>Hi, I&apos;m Airyn.</h1>
        <h2 className={styles.subtitle}>
          UI Engineer & Designer building fast, beautiful web experiences.
        </h2>
        <p className={styles.description}>
          Frontend development · UX Design · Data Visualization · AI Tools
        </p>
      </div>
    </section>
  );
}
