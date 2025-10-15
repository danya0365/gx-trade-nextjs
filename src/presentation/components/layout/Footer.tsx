"use client";

import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "เกี่ยวกับเรา", href: "/about" },
    { name: "ติดต่อเรา", href: "/contact" },
    { name: "นโยบายความเป็นส่วนตัว", href: "/privacy" },
    { name: "เงื่อนไขการใช้งาน", href: "/terms" },
  ];

  const features = [
    { name: "ราคาทอง", href: "/prices" },
    { name: "ชุมชน", href: "/community" },
    { name: "รางวัล", href: "/gamification" },
    { name: "เรียนรู้", href: "/learn" },
  ];

  const resources = [
    { name: "ข่าวสาร", href: "/news" },
    { name: "คู่มือการใช้งาน", href: "/help" },
    { name: "FAQ", href: "/faq" },
    { name: "บล็อก", href: "/blog" },
  ];

  const socialMedia = [
    { name: "Facebook", icon: Facebook, href: "https://facebook.com", color: "hover:text-blue-600" },
    { name: "Twitter", icon: Twitter, href: "https://twitter.com", color: "hover:text-sky-500" },
    { name: "Instagram", icon: Instagram, href: "https://instagram.com", color: "hover:text-pink-600" },
    { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com", color: "hover:text-blue-700" },
  ];

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-gold rounded-lg flex items-center justify-center">
                <span className="text-xl font-bold text-white">GX</span>
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                  GX Trade
                </h2>
                <p className="text-xs text-gold-600 dark:text-gold-400">
                  Gold Exchange
                </p>
              </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              แพลตฟอร์มวิเคราะห์ราคาทองคำครบวงจร
              ติดตามราคาทองแบบ real-time พร้อมชุมชนนักลงทุน
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                <Mail className="w-4 h-4" />
                <span>contact@gxtrade.com</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                <Phone className="w-4 h-4" />
                <span>02-123-4567</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                <MapPin className="w-4 h-4" />
                <span>กรุงเทพมหานคร ประเทศไทย</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
              เกี่ยวกับ GX Trade
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-gold-600 dark:hover:text-gold-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
              ฟีเจอร์
            </h3>
            <ul className="space-y-2">
              {features.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-gold-600 dark:hover:text-gold-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
              ทรัพยากร
            </h3>
            <ul className="space-y-2">
              {resources.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-gold-600 dark:hover:text-gold-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Media & Copyright */}
        <div className="pt-8 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            {/* Social Media */}
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                ติดตามเรา:
              </span>
              {socialMedia.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-gray-600 dark:text-gray-400 ${social.color} transition-colors`}
                    aria-label={social.name}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>

            {/* Copyright */}
            <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
              <span>© {currentYear} GX Trade. All rights reserved.</span>
              <span className="hidden md:inline">•</span>
              <span className="hidden md:inline">
                Made with <span className="text-red-500">❤️</span> in Thailand
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
