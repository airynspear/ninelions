"use client";

import { useView } from "@/views/ViewContext";
import HomeView from "@/views/Home";
import AboutView from "@/views/About";
import PortfolioView from "@/views/Portfolio";
import ConnectView from "@/views/Connect";

export default function Page() {
  const { view } = useView();

  return (
    <>
      {view === "home" && <HomeView />}
      {view === "about" && <AboutView />}
      {view === "portfolio" && <PortfolioView />}
      {view === "connect" && <ConnectView />}
    </>
  );
}
