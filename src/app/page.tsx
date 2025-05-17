"use client";

import { useView } from "@/views/ViewContext";
import HexView from "@/views/HexView";
import HomeOverlay from "@/views/Home";
import AboutOverlay from "@/views/About";
import PortfolioOverlay from "@/views/Portfolio";
import ConnectOverlay from "@/views/Connect";
import { HOME_CARDS } from "@/views/Home/cards";
import { ABOUT_CARDS } from "@/views/About/cards";
import { PORTFOLIO_CARDS } from "@/views/Portfolio/cards";
import { CONNECT_CARDS } from "@/views/Connect/cards";

export default function Page() {
  const { view } = useView();

  const cards = {
    home: HOME_CARDS,
    about: ABOUT_CARDS,
    portfolio: PORTFOLIO_CARDS,
    connect: CONNECT_CARDS,
  }[view];

  const overlays = {
    home: <HomeOverlay />,
    about: <AboutOverlay />,
    portfolio: <PortfolioOverlay />,
    connect: <ConnectOverlay />,
  };

  return (
    <>
      <HexView cards={cards} viewMode={view} />
      {overlays[view]}
    </>
  );
}
