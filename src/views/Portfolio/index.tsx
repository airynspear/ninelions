import styles from "./PortfolioView.module.scss";

export default function PortfolioPage() {
  return (
    <main className={styles.contentContainer}>
      <div className={styles.content}>
        <h1>Portfolio</h1>
        <p>This is the Portfolio page for Nine Lions.</p>
      </div>
    </main>
  );
}
