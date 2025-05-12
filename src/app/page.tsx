import styles from "./page.module.scss";

export default function Home() {
  return (
    <div className={styles.background}>
      {/* <div className={styles.heroBackground}></div> */}
      <section className={styles.hero}>
        <div className={styles.hexGrid}>
          <div className={`${styles.hexCard} ${styles.hexCardOne}`}>
            <div className={styles.cardContent}>Card 1</div>
          </div>
          <div className={`${styles.hexCard} ${styles.hexCardTwo}`}>
            <div className={styles.cardContent}>Card 2</div>
          </div>
          <div className={`${styles.hexCard} ${styles.hexCardThree}`}>
            <div className={styles.cardContent}>Card 3</div>
          </div>
          <div className={`${styles.hexCard} ${styles.hexCardFour}`}>
            <div className={styles.cardContent}>Card 4</div>
          </div>
          <div className={`${styles.hexCard} ${styles.hexCardFive}`}>
            <div className={styles.cardContent}>Card 5</div>
          </div>
          <div className={`${styles.hexCard} ${styles.hexCardSix}`}>
            <div className={styles.cardContent}>Card 6</div>
          </div>
          <div className={`${styles.hexCard} ${styles.hexCardSeven}`}>
            <div className={styles.cardContent}>Card 7</div>
          </div>
          <div className={`${styles.hexCard} ${styles.hexCardEight}`}>
            <div className={styles.cardContent}>Card 8</div>
          </div>
          <div className={`${styles.hexCard} ${styles.hexCardNine}`}>
            <div className={styles.cardContent}>Card 9</div>
          </div>
        </div>

        {/* <div className={styles.hexagonWrapper}>
            <div className={styles.hexagonBorder}></div>
            <div className={styles.hexagon}></div>
          </div>
          <div className={styles.hexagonWrapper}>
            <div className={styles.hexagonBorder}></div>
            <div className={styles.hexagon}></div>
          </div>
          <div className={styles.hexagonWrapper}>
            <div className={styles.hexagonBorder}></div>
            <div className={styles.hexagon}></div>
          </div> */}
        {/* <div className={styles.content}>
            <h2>Design Technology</h2>
            <h3 className={styles.subtitle}>
              Intentional design crafted with frontend precision.
            </h3>
            <p className={styles.description}>
              Frontend Development · UX Design · Data Visualization · AI Tools
            </p>
          </div> */}
      </section>
    </div>
  );
}
