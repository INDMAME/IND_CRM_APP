import React, { createContext, useContext, useMemo, useState } from "react";

type NavigationValue = {
  activeModule: string;
  setActiveModule: (module: string) => void;
};

const defaultValue: NavigationValue = {
  activeModule: "",
  setActiveModule: () => undefined,
};

const NavigationContext = createContext<NavigationValue>(defaultValue);

type ProviderProps = {
  children: React.ReactNode;
  initialModule?: string;
};

export const NavigationProvider = ({ children, initialModule = "" }: ProviderProps) => {
  const [activeModule, setActiveModule] = useState(initialModule);

  const value = useMemo<NavigationValue>(() => {
    return { activeModule, setActiveModule };
  }, [activeModule]);

  return <NavigationContext.Provider value={value}>{children}</NavigationContext.Provider>;
};

export const useNavigation = () => useContext(NavigationContext);
