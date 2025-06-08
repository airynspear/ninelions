import { HexCard } from "@/views/HexView";

// Hex layout: only Hex 5 (index 4) gets image content
export const PORTFOLIO_CARDS: HexCard[] = [
  {}, // 0
  {}, // 1
  {}, // 2
  {}, // 3
  {}, // 4
  {}, // 5
  {}, // 6
  {}, // 7
  {}, // 8
];

// Full project metadata (used for switching content in Hex 5)
export const PROJECT_METADATA = [
  {
    keyword: "Spesland",
    description: (
      <>
        The flagship web experience for Spesland, blending cutting-edge AI chat,
        responsive data visualization, and role-based analytics for public and
        private sector clients.
      </>
    ),
    thumbnail: "/images/portfolio/spesland-thumb-light.png",
    themeThumbnailDark: "/images/portfolio/spesland-thumb-dark.png",
    image: "/images/portfolio/spesland-light.png",
    themeImageDark: "/images/portfolio/spesland-dark.png",
    secondaryImageTwo: "/images/portfolio/spesland-two.jpg",
    secondaryImageThree: "/images/portfolio/spesland-three.jpg",
    secondaryImageSeven: "/images/portfolio/spesland-seven.jpg",
    secondaryImageEight: "/images/portfolio/spesland-eight.jpg",
    secondaryImageTwoLight: "/images/portfolio/spesland-two-light.jpg",
    secondaryImageThreeLight: "/images/portfolio/spesland-three-light.jpg",
    secondaryImageSevenLight: "/images/portfolio/spesland-seven-light.jpg",
    secondaryImageEightLight: "/images/portfolio/spesland-eight-light.jpg",
  },
  {
    keyword: "United Airlines",
    description: (
      <>
        Design system and enterprise tools for United Airlines, including a
        reusable component library and a full-featured crew scheduling app.
        Focused on consistency, performance, and accessibility.
      </>
    ),
    thumbnail: "/images/portfolio/united-thumb-light.png",
    themeThumbnailDark: "/images/portfolio/united-thumb-dark.png",
    image: "/images/portfolio/united-light.png",
    themeImageDark: "/images/portfolio/united-dark.png",
    secondaryImageTwo: "/images/portfolio/united-two.jpg",
    secondaryImageTwoLight: "/images/portfolio/united-two-light.jpg",
    secondaryImageThree: "/images/portfolio/united-three.jpg",
    secondaryImageThreeLight: "/images/portfolio/united-three-light.jpg",
    secondaryImageSeven: "/images/portfolio/united-seven.jpg",
    secondaryImageSevenLight: "/images/portfolio/united-seven-light.jpg",
    secondaryImageEight: "/images/portfolio/united-eight.jpg",
    secondaryImageEightLight: "/images/portfolio/united-eight-light.jpg",
  },

  // {
  //   keyword: "Nine Lions",
  //   description: (
  //     <>
  //       A bold personal portfolio for Nine Lions, highlighting frontend mastery,
  //       immersive UI/UX, and project storytelling through custom geometry, theme
  //       toggling, and dynamic animations.
  //     </>
  //   ),
  //   thumbnail: "/images/portfolio/ninelions-thumb-light.png",
  //   themeThumbnailDark: "/images/portfolio/ninelions-thumb-dark.png",
  //   image: "/images/portfolio/ninelions-light.png",
  //   themeImageDark: "/images/portfolio/ninelions-dark.png",
  // },
  {
    keyword: "PeakMetrics",
    description: (
      <>
        A full-featured frontend for PeakMetrics' media intelligence platform,
        integrating search, trend analysis, and alerting across social, news,
        and broadcast data sources.
      </>
    ),
    thumbnail: "/images/portfolio/peakmetrics-thumb-light.png",
    themeThumbnailDark: "/images/portfolio/peakmetrics-thumb-dark.png",
    image: "/images/portfolio/peakmetrics.png",
    secondaryImageTwo: "/images/portfolio/peakmetrics-two.jpg",
    secondaryImageThree: "/images/portfolio/peakmetrics-three.jpg",
    secondaryImageSeven: "/images/portfolio/peakmetrics-seven.jpg",
    secondaryImageEight: "/images/portfolio/peakmetrics-eight.jpg",
    secondaryImageTwoLight: "/images/portfolio/peakmetrics-two-light.jpg",
    secondaryImageThreeLight: "/images/portfolio/peakmetrics-three-light.jpg",
    secondaryImageEightLight: "/images/portfolio/peakmetrics-eight-light.jpg",
  },
  {
    keyword: "EpicMix",
    description: (
      <>
        A dynamic reimagining of Vail Resorts&apos;s EpicMix app, focusing on
        personalized stats, lift tracking, and seamless resort integration
        across mobile and wearable devices.
      </>
    ),
    thumbnail: "/images/portfolio/epicmix-thumb-light.png",
    themeThumbnailDark: "/images/portfolio/epicmix-thumb-dark.png",
    image: "/images/portfolio/epicmix.png",
    secondaryImageTwo: "/images/portfolio/epicmix-two.jpg",
    secondaryImageThree: "/images/portfolio/epicmix-three.jpg",
    secondaryImageSeven: "/images/portfolio/epicmix-seven.jpg",
    secondaryImageEight: "/images/portfolio/epicmix-eight.jpg",
  },
  {
    keyword: "SPOTX",
    description: (
      <>
        A sleek enterprise dashboard design for SpotX, enabling ad operations
        teams to monitor revenue, optimize campaigns, and manage partners with
        real-time insights.
      </>
    ),
    thumbnail: "/images/portfolio/spotx-thumb-light.png",
    themeThumbnailDark: "/images/portfolio/spotx-thumb-dark.png",
    image: "/images/portfolio/spotx.png",
    secondaryImageTwo: "/images/portfolio/spotx-two.jpg",
    secondaryImageThree: "/images/portfolio/spotx-three.jpg",
    secondaryImageSeven: "/images/portfolio/spotx-seven.jpg",
    secondaryImageEight: "/images/portfolio/spotx-eight.jpg",
  },
  {
    keyword: "Bacardi",
    description: (
      <>
        A vibrant microsite concept for Bacardi spotlighting heritage cocktails,
        immersive brand storytelling, and mobile-first user experience design.
      </>
    ),
    thumbnail: "/images/portfolio/bacardi-thumb-light.png",
    themeThumbnailDark: "/images/portfolio/bacardi-thumb-dark.png",
    image: "/images/portfolio/bacardi-light.png",
    secondaryImageTwo: "/images/portfolio/bacardi-two.png",
    secondaryImageThree: "/images/portfolio/bacardi-three.jpg",
    secondaryImageSeven: "/images/portfolio/bacardi-seven.png",
    secondaryImageEight: "/images/portfolio/bacardi-eight.png",
  },
  {
    keyword: "Leader Bikes",
    description: (
      <>
        A modern rebranding and eCommerce refresh for Leader Bikes, focused on
        urban cycling culture and responsive performance.
      </>
    ),
    thumbnail: "/images/portfolio/leaderbikes-thumb-light.png",
    themeThumbnailDark: "/images/portfolio/leaderbikes-thumb-dark.png",
    image: "/images/portfolio/leaderbikes.png",
    secondaryImageTwo: "/images/portfolio/leaderbikes-two.jpg",
    secondaryImageTwoLight: "/images/portfolio/leaderbikes-two-light.jpg",
    secondaryImageThree: "/images/portfolio/leaderbikes-three.jpg",
    secondaryImageSeven: "/images/portfolio/leaderbikes-seven.jpg",
    secondaryImageEight: "/images/portfolio/leaderbikes-eight.jpg",
  },
  {
    keyword: "Cancer Research Institute",
    description: (
      <>
        A bold and accessible redesign for the Cancer Research Institute,
        highlighting clinical trials, immunotherapy breakthroughs, and
        donor-supported research impact.
      </>
    ),
    thumbnail: "/images/portfolio/cri-thumb-light.png",
    themeThumbnailDark: "/images/portfolio/cri-thumb-dark.png",
    image: "/images/portfolio/cri.png",
  },
];
