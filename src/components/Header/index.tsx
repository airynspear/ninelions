"use client";

import Link from "next/link";
import Image from "next/image";
import { useTheme } from "@/components/Theme/ThemeProvider";
import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import AndroidSwitch from "@/components/UI/Switch/AndroidSwitch";
import styles from "./Header.module.scss";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Connect", href: "/connect" },
];

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const navRef = useRef<HTMLDivElement>(null);
  const [hoveredRect, setHoveredRect] = useState<DOMRect | null>(null);
  const [activeRect, setActiveRect] = useState<DOMRect | null>(null);
  const underlineRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const activeLink = document.querySelector(`a[href="${pathname}"]`);
    if (activeLink) {
      const rect = (activeLink as HTMLElement).getBoundingClientRect();
      setActiveRect(rect);
    }
  }, [pathname, mounted]);

  useEffect(() => {
    const target = hoveredRect || activeRect;
    const underline = underlineRef.current;
    const nav = navRef.current;

    if (target && underline && nav) {
      const navLeft = nav.getBoundingClientRect().left;
      underline.style.transform = `translateX(${target.left - navLeft}px)`;
      underline.style.width = `${target.width}px`;
    }
  }, [hoveredRect, activeRect]);

  return (
    <header className={styles.header}>
      <nav
        className={styles.nav}
        ref={navRef}
        onMouseLeave={() => setHoveredRect(null)}
      >
        <ul className={styles.navLeft}>
          {NAV_LINKS.slice(0, 2).map((link) => (
            <li
              key={link.href}
              onMouseEnter={(e) =>
                setHoveredRect(e.currentTarget.getBoundingClientRect())
              }
              className={pathname === link.href ? styles.active : ""}
            >
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>
        <ul className={styles.navRight}>
          {NAV_LINKS.slice(2).map((link) => (
            <li
              key={link.href}
              onMouseEnter={(e) =>
                setHoveredRect(e.currentTarget.getBoundingClientRect())
              }
              className={pathname === link.href ? styles.active : ""}
            >
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>
        <span className={styles.underline} ref={underlineRef} />

        <Link href="/" className={styles.logoWrapper}>
          <Image
            src="/logos/logo-cool.png"
            alt="Nine Lions Logo Dark"
            width={900}
            height={324}
            priority
            className={`${styles.logo} ${
              theme === "dark" ? styles.visible : styles.hidden
            }`}
          />
          <Image
            src="/logos/logo-heat.png"
            alt="Nine Lions Logo Light"
            width={900}
            height={324}
            priority
            className={`${styles.logo} ${
              theme === "light" ? styles.visible : styles.hidden
            }`}
          />
        </Link>
      </nav>

      <div className={styles.switch}>
        <AndroidSwitch checked={theme === "light"} onChange={toggleTheme} />
      </div>
    </header>
  );
}
