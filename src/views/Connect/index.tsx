"use client";

import styles from "./ConnectView.module.scss";
import ConnectForm from "./ConnectForm";

export default function ConnectPage() {
  return (
    <main className={styles.content}>
      <p className={styles.notice}>under construction</p>
      <div className={styles.hide}>
        <h3>connect & create</h3>
        <ConnectForm />
      </div>
    </main>
  );
}
