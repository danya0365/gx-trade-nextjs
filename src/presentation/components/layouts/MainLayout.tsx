import React, { ReactNode } from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";

interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className={`min-h-screen flex flex-col`}>
      <Header />
      <main className="flex-grow bg-gradient-to-b from-amber-50 to-white dark:from-gray-900 dark:to-gray-800">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
