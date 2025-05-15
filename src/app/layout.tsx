import type { Metadata } from "next";
import { Outfit, Syne } from "next/font/google";
import "@/styles/globals.scss";
import ThemeProvider from "@/components/Theme/ThemeProvider";
import Header from "@/components/Header";
import { ViewProvider } from "@/views/ViewContext"; // ✅ NEW

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
  title: "Nine Lions Design",
  description: "Portfolio of Airyn Spear – UI Engineer & Designer",
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
            {children}
          </ViewProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
