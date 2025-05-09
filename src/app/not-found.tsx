"use client";

import styles from "./not-found.module.scss";

export default function NotFound() {
  return (
    <div className={styles.notFound}>
      <h3>404 – Page Not Found</h3>
      <p>You just wandered into the void.</p>
    </div>
  );
}
