"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

type View = "home" | "about" | "portfolio" | "connect";

const ViewContext = createContext<{
  view: View;
  setView: (view: View) => void;
  viewHistory: View[];
}>({
  view: "home",
  setView: () => {},
  viewHistory: [],
});

export function ViewProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [view, setViewState] = useState<View>("home");
  const [viewHistory, setViewHistory] = useState<View[]>(["home"]);

  // ⬇️ Set view from ?view= param on initial load
  useEffect(() => {
    const param = searchParams.get("view") as View;
    if (param && ["home", "about", "portfolio", "connect"].includes(param)) {
      setViewState(param);
      setViewHistory([param]);
    }
  }, [searchParams]);

  const setView = (newView: View) => {
    setViewState(newView);
    setViewHistory((prev) =>
      prev[prev.length - 1] === newView ? prev : [...prev, newView]
    );

    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("view", newView);
    router.replace(`${pathname}?${newParams.toString()}`, { scroll: false });
  };

  return (
    <ViewContext.Provider value={{ view, setView, viewHistory }}>
      {children}
    </ViewContext.Provider>
  );
}

export const useView = () => useContext(ViewContext);
