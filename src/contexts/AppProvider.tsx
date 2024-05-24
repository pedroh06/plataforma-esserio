import { type ReactNode } from "react";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { ptBR } from "@mui/x-date-pickers/locales";
type AppProviderProps = {
  children: ReactNode;
};

import {} from "@mui/x-date-pickers/AdapterDateFns";
import { SidebarProvider } from "./SidebarContext";

export function AppProvider({ children }: AppProviderProps) {
  return (
    <SidebarProvider>
      <LocalizationProvider
        dateAdapter={AdapterDateFns}
        localeText={
          ptBR.components.MuiLocalizationProvider.defaultProps.localeText
        }
      >
        {children}
      </LocalizationProvider>
    </SidebarProvider>
  );
}
