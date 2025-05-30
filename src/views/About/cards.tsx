import { HexCard } from "@/views/HexView";

export const ABOUT_CARDS: HexCard[] = new Array(9).fill(null).map((_, i) => {
  if (i === 4) {
    return {
      icon: null,
      image: "/images/light-3.jpg",
      themeImageDark: "/images/dark-3.jpg",
      keyword: "",
      description: "",
    };
  }
  return {
    icon: null,
    keyword: "",
    description: "",
  };
});
