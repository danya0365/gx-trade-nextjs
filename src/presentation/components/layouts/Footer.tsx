import Link from "next/link";
import { FaFacebook, FaLine, FaTwitter, FaYoutube } from "react-icons/fa";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: "เกี่ยวกับเรา",
      links: [
        { name: "เกี่ยวกับ GX Trade", href: "/about" },
        { name: "ทีมงาน", href: "/team" },
        { name: "ติดต่อเรา", href: "/contact" },
        { name: "ร่วมงานกับเรา", href: "/careers" },
      ],
    },
    {
      title: "บริการ",
      links: [
        { name: "ราคาทองคำ", href: "/prices" },
        { name: "เครื่องคำนวณ", href: "/calculator" },
        { name: "บทวิเคราะห์", href: "/analysis" },
        { name: "สัญญาณการซื้อขาย", href: "/signals" },
      ],
    },
    {
      title: "กฎระเบียบ",
      links: [
        { name: "ข้อกำหนดการใช้งาน", href: "/terms" },
        { name: "นโยบายความเป็นส่วนตัว", href: "/privacy" },
        { name: "นโยบายคุกกี้", href: "/cookies" },
        { name: "คำถามที่พบบ่อย", href: "/faq" },
      ],
    },
  ];

  const socialLinks = [
    {
      icon: <FaFacebook size={20} />,
      href: "https://facebook.com",
      label: "Facebook",
    },
    { icon: <FaLine size={20} />, href: "https://line.me", label: "Line" },
    {
      icon: <FaYoutube size={20} />,
      href: "https://youtube.com",
      label: "YouTube",
    },
    {
      icon: <FaTwitter size={20} />,
      href: "https://twitter.com",
      label: "Twitter",
    },
  ];

  return (
    <footer className="bg-gray-800 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Logo and Description */}
          <div className="col-span-1">
            <h2 className="text-2xl font-bold text-amber-400 mb-4">GX Trade</h2>
            <p className="text-gray-300 mb-4">
              ระบบวิเคราะห์ราคาทองแบบครบวงจร พร้อมฟีเจอร์ชุมชน Gamification และ
              Social Trading สำหรับนักลงทุนทองคำ
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-amber-400 transition-colors"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {footerLinks.map((section, index) => (
            <div key={index}>
              <h3 className="text-lg font-semibold mb-4 text-amber-300">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-amber-400 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Copyright and Legal */}
        <div className="border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © {currentYear} GX Trade. สงวนลิขสิทธิ์ทุกประการ
          </p>
          <div className="flex space-x-6">
            <Link
              href="/terms"
              className="text-gray-400 hover:text-white text-sm"
            >
              ข้อตกลงและเงื่อนไข
            </Link>
            <Link
              href="/privacy"
              className="text-gray-400 hover:text-white text-sm"
            >
              นโยบายความเป็นส่วนตัว
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
