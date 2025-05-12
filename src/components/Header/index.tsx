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
  const pathname = usePathname();

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
      if (isWide) {
        setMobileMenuOpen(false);

        const activeLink = document.querySelector(`a[href="${pathname}"]`);
        if (activeLink) {
          const rect = (activeLink as HTMLElement).getBoundingClientRect();
          setActiveRect(rect);
        }
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [pathname]);

  useEffect(() => {
    setMobileMenuOpen(false);

    requestAnimationFrame(() => {
      const activeLink = document.querySelector(`a[href="${pathname}"]`);
      if (activeLink) {
        const rect = (activeLink as HTMLElement).getBoundingClientRect();
        setActiveRect(rect);
      }
    });
  }, [pathname]);

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
      {/* Always visible logo */}
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

      {/* Desktop navigation */}
      {isDesktop === true && (
        <nav
          className={styles.nav}
          ref={navRef}
          onMouseLeave={() => setHoveredRect(null)}
        >
          <ul className={styles.navLeft}>
            {NAV_LINKS.slice(0, 2).map(({ href, label }) => (
              <li
                key={href}
                onMouseEnter={(e) =>
                  setHoveredRect(e.currentTarget.getBoundingClientRect())
                }
                className={pathname === href ? styles.active : ""}
              >
                <Link href={href}>{label}</Link>
              </li>
            ))}
          </ul>
          <ul className={styles.navRight}>
            {NAV_LINKS.slice(2).map(({ href, label }) => (
              <li
                key={href}
                onMouseEnter={(e) =>
                  setHoveredRect(e.currentTarget.getBoundingClientRect())
                }
                className={pathname === href ? styles.active : ""}
              >
                <Link href={href}>{label}</Link>
              </li>
            ))}
          </ul>
          <span className={styles.underline} ref={underlineRef} />
        </nav>
      )}

      {/* Hamburger icon */}
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

      {/* Mobile dropdown menu */}
      {isDesktop === false && mobileMenuOpen && (
        <div className={styles.mobileMenu}>
          <div className={styles.mobileMenuSwitch}>
            <AndroidSwitch checked={theme === "light"} onChange={toggleTheme} />
          </div>
          <nav className={styles.mobileNav}>
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileMenuOpen(false)}
                className={`${styles.mobileNavItem} ${
                  pathname === href ? styles.activeMobile : ""
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      )}

      {/* Desktop-only theme toggle */}
      {isDesktop === true && (
        <div className={styles.switch}>
          <AndroidSwitch checked={theme === "light"} onChange={toggleTheme} />
        </div>
      )}
    </header>
  );
}
