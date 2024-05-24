import { createContext, useState, type ReactNode } from "react";

type SidebarContextData = {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
};

type PropsSidebarContextProvider = {
  children: ReactNode;
};

export const SidebarContext = createContext<SidebarContextData>(
  {} as SidebarContextData,
);

export const SidebarProvider = ({ children }: PropsSidebarContextProvider) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((curr) => !curr);
  };

  return (
    <SidebarContext.Provider value={{ isSidebarOpen, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};
