"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface PiscoTabsContextType {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const PiscoTabsContext = createContext<PiscoTabsContextType | undefined>(undefined);

export function PiscoTabsProvider({ children }: { children: ReactNode }) {
  const [activeTab, setActiveTab] = useState<string>("Italia");
  
  return (
    <PiscoTabsContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </PiscoTabsContext.Provider>
  );
}

export function usePiscoTabs() {
  const context = useContext(PiscoTabsContext);
  if (!context) {
    throw new Error("usePiscoTabs must be used within PiscoTabsProvider");
  }
  return context;
}

