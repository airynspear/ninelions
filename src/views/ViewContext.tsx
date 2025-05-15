"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

type View = "home" | "about" | "portfolio" | "connect";

const ViewContext = createContext<{
  view: View;
  setView: (view: View) => void;
}>({
  view: "home",
  setView: () => {},
});

export function ViewProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [view, setViewState] = useState<View>("home");

  // Set view from URL on initial load
  useEffect(() => {
    const viewParam = searchParams.get("view") as View;
    if (
      viewParam &&
      ["home", "about", "portfolio", "connect"].includes(viewParam)
    ) {
      setViewState(viewParam);
    }
  }, [searchParams]);

  const setView = (newView: View) => {
    setViewState(newView);
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("view", newView);
    router.replace(`${pathname}?${newParams.toString()}`, { scroll: false });
  };

  return (
    <ViewContext.Provider value={{ view, setView }}>
      {children}
    </ViewContext.Provider>
  );
}

export const useView = () => useContext(ViewContext);
