"use client";

import HexView from "@/views/HexView";
import styles from "./AboutView.module.scss";
import { FaRegSmile } from "react-icons/fa"; // Just a test icon

export default function AboutPage() {
  const cards = new Array(9).fill({
    icon: null,
    keyword: "",
    description: "",
  });

  return (
    <main className={styles.content}>
      <HexView cards={cards} viewMode="about" />
      {/* <div className={styles.overlay}>
        <h1>About</h1>
        <p>This is the About page for Nine Lions.</p>
      </div> */}
    </main>
  );
}
