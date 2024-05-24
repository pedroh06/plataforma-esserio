import { type ReactNode } from "react";
import { Navbar } from "../modules/Navbar";
import { Sidebar } from "../modules/Sidebar";

type RecordLayoutProps = {
  children: ReactNode;
};

export function RecordLayout({ children }: RecordLayoutProps) {
  return (
    <div className="flex flex-col bg-gray-100">
      <Navbar />
      <Sidebar />
      <main className="flex min-h-[calc(100vh_-_4rem)] flex-col items-center justify-center px-2 md:min-h-[calc(100vh_-_5rem)]">
        {children}
      </main>
    </div>
  );
}
