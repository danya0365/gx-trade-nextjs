"use client";

import { useTheme } from "next-themes";
import Link from "next/link";
import React from "react";
import { FiMenu, FiMoon, FiSun, FiX } from "react-icons/fi";
import { Button } from "../ui/Button";

export const Header = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const navLinks = [
    { name: "ราคาทอง", href: "/prices" },
    { name: "วิเคราะห์", href: "/analysis" },
    { name: "พอร์ตโฟลิโอ", href: "/portfolio" },
    { name: "ชุมชน", href: "/community" },
  ];

  return (
    <header className="bg-amber-600 text-white dark:bg-gray-800 shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold">GX Trade</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-amber-200 transition-colors duration-200 font-medium"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            {mounted && (
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-amber-700 dark:hover:bg-gray-700 transition-colors"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <FiSun size={20} /> : <FiMoon size={20} />}
              </button>
            )}
            <button
              className="md:hidden p-2 rounded-md hover:bg-amber-700 dark:hover:bg-gray-700 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block py-2 px-4 rounded-md hover:bg-amber-700 dark:hover:bg-gray-700 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-2 border-t border-amber-500 dark:border-gray-700">
                <Button variant="outline" className="w-full">
                  เข้าสู่ระบบ
                </Button>
                <Button className="w-full mt-2 bg-amber-500 hover:bg-amber-600">
                  สมัครสมาชิก
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
