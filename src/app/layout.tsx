import type { Metadata } from "next";
import { Outfit, Syne } from "next/font/google";
import "@/styles/globals.scss";
import ThemeProvider from "@/components/Theme/ThemeProvider";
import Header from "@/components/Header";
import { ViewProvider } from "@/views/ViewContext";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-outfit",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-syne",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nine Lions Design – Airyn Spear",
  description:
    "UI Engineer & Designer. Explore a portfolio of advanced web experiences, interactive UIs, and creative frontend engineering.",
  keywords:
    "UI engineer, frontend developer, web design, portfolio, Airyn Spear, React, Next.js, UX design",
  authors: [{ name: "Airyn Spear", url: "https://ninelionsdesign.com" }],
  openGraph: {
    title: "Nine Lions Design – Airyn Spear",
    description:
      "Explore Airyn Spear’s portfolio of creative engineering, immersive interfaces, and data-rich design.",
    url: "https://ninelionsdesign.com",
    siteName: "Nine Lions Design",
    images: [
      {
        url: "/preview.png",
        width: 1200,
        height: 630,
        alt: "Nine Lions Design Portfolio Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nine Lions Design – Airyn Spear",
    description:
      "Frontend Engineer & Designer – Explore immersive UIs and creative frontend projects.",
    images: ["/preview.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${syne.variable}`}
      suppressHydrationWarning
    >
      <head>
        <meta name="apple-mobile-web-app-title" content="Nine Lions" />
        <meta name="application-name" content="Nine Lions" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <link rel="icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        {/* === Preload main project images === */}
        <link
          rel="preload"
          as="image"
          href="/images/portfolio/spesland-light.png"
        />
        <link
          rel="preload"
          as="image"
          href="/images/portfolio/ninelions-light.png"
        />
        <link
          rel="preload"
          as="image"
          href="/images/portfolio/peakmetrics.png"
        />
        <link rel="preload" as="image" href="/images/portfolio/epicmix.png" />
        <link rel="preload" as="image" href="/images/portfolio/spotx.png" />
        <link rel="preload" as="image" href="/images/portfolio/hwd-dark.png" />
        <link rel="preload" as="image" href="/images/portfolio/bacardi.png" />
        <link
          rel="preload"
          as="image"
          href="/images/portfolio/leaderbikes.png"
        />
        <link rel="preload" as="image" href="/images/portfolio/cri.png" />

        {/* === Theme script === */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                try {
                  const theme = localStorage.getItem('theme') || 'light';
                  document.documentElement.setAttribute('data-theme', theme);
                  document.documentElement.classList.remove('light', 'dark');
                  document.documentElement.classList.add(theme);
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body>
        <ThemeProvider>
          <ViewProvider>
            <Header />
            <div className="scroll-container">{children}</div>
          </ViewProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
