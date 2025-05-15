"use client";

import Image from "next/image";
import { useTheme } from "@/components/Theme/ThemeProvider";
import { useEffect, useState, useRef } from "react";
import AndroidSwitch from "@/components/UI/Switch/AndroidSwitch";
import { useView } from "@/views/ViewContext";
import { NAV_LINKS } from "@/views/navLinks";
import styles from "./Header.module.scss";

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const { view, setView } = useView();

  const [isDesktop, setIsDesktop] = useState<boolean | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navRef = useRef<HTMLDivElement>(null);
  const underlineRef = useRef<HTMLSpanElement>(null);
  const [hoveredRect, setHoveredRect] = useState<DOMRect | null>(null);
  const [activeRect, setActiveRect] = useState<DOMRect | null>(null);

  useEffect(() => {
    const handleResize = () => {
      const isWide = window.innerWidth > 754;
      setIsDesktop(isWide);
      if (isWide) setMobileMenuOpen(false);
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    let timeout: NodeJS.Timeout | null = null;

    const updateUnderline = () => {
      const activeBtn = document.querySelector(`[data-view="${view}"]`);
      if (activeBtn) {
        const rect = (activeBtn as HTMLElement).getBoundingClientRect();
        setActiveRect(rect);
      }
    };

    if (view === "home") {
      // Delay only on first load of home view
      timeout = setTimeout(updateUnderline, 600); // adjust if needed
    } else {
      updateUnderline();
    }

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [view]);

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
      <div className={styles.logoWrapper}>
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
          src="/logos/logo-heat-fill.png"
          alt="Nine Lions Logo Light"
          width={900}
          height={324}
          priority
          className={`${styles.logo} ${
            theme === "light" ? styles.visible : styles.hidden
          }`}
        />
      </div>
      <div className={styles.divider}></div>

      {isDesktop === true && (
        <nav
          className={styles.nav}
          ref={navRef}
          onMouseLeave={() => setHoveredRect(null)}
        >
          <ul className={styles.navLeft}>
            {NAV_LINKS.slice(0, 2).map(({ id, label }) => (
              <li
                key={id}
                data-view={id}
                onMouseEnter={(e) =>
                  setHoveredRect(e.currentTarget.getBoundingClientRect())
                }
                className={view === id ? styles.active : ""}
              >
                <button onClick={() => setView(id)}>{label}</button>
              </li>
            ))}
          </ul>
          <ul className={styles.navRight}>
            {NAV_LINKS.slice(2).map(({ id, label }) => (
              <li
                key={id}
                data-view={id}
                onMouseEnter={(e) =>
                  setHoveredRect(e.currentTarget.getBoundingClientRect())
                }
                className={view === id ? styles.active : ""}
              >
                <button onClick={() => setView(id)}>{label}</button>
              </li>
            ))}
          </ul>
          <span className={styles.underline} ref={underlineRef} />
        </nav>
      )}

      {isDesktop === false && (
        <button
          className={`${styles.hamburger} ${mobileMenuOpen ? styles.open : ""}`}
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          aria-label="Toggle mobile menu"
        >
          <span />
          <span />
          <span />
        </button>
      )}

      {isDesktop === false && mobileMenuOpen && (
        <div className={styles.mobileMenu}>
          <div className={styles.mobileMenuSwitch}>
            <AndroidSwitch checked={theme === "light"} onChange={toggleTheme} />
          </div>
          <nav className={styles.mobileNav}>
            {NAV_LINKS.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => {
                  setView(id);
                  setMobileMenuOpen(false);
                }}
                className={`${styles.mobileNavItem} ${
                  view === id ? styles.activeMobile : ""
                }`}
              >
                {label}
              </button>
            ))}
          </nav>
        </div>
      )}

      {isDesktop === true && (
        <div className={styles.switch}>
          <AndroidSwitch checked={theme === "light"} onChange={toggleTheme} />
        </div>
      )}
    </header>
  );
}
