"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Switch } from "@mui/material";
import styles from "./Header.module.scss";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = theme === "dark";

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.logo}>Nine Lions</div>
        <ul className={styles.links}>
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>
        <div className={styles.switch}>
          {mounted && (
            <Switch
              checked={!isDark}
              onChange={() => setTheme(isDark ? "light" : "dark")}
            />
          )}
        </div>
      </nav>
    </header>
  );
}
