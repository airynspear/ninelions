import { HexCard } from "@/views/HexView";

export const CONNECT_CARDS: HexCard[] = new Array(9).fill({
  icon: <></>,
  keyword: "",
  description: "",
});

// Add light/dark images for cards 1, 5, and 9
CONNECT_CARDS[0] = {
  icon: <></>,
  keyword: "",
  description: "",
  image: "/images/connect/linkedin-light.png",
  themeImageDark: "/images/connect/linkedin-dark.png",
};

CONNECT_CARDS[4] = {
  icon: <></>,
  keyword: "",
  description: "",
  image: "/images/connect/connect-light.png",
  themeImageDark: "/images/connect/connect-dark.png",
};

CONNECT_CARDS[8] = {
  icon: <></>,
  keyword: "",
  description: "",
  image: "/images/connect/instagram-light.png",
  themeImageDark: "/images/connect/instagram-dark.png",
};
