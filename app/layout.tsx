import { ThemeProvider } from "@/src/presentation/components/providers/ThemeProvider";
import type { Metadata } from "next";
import "../public/styles/index.css";

export const metadata: Metadata = {
  title: "GX Trade | ระบบวิเคราะห์ราคาทอง - Gold Exchange Trade",
  description:
    "แพลตฟอร์มวิเคราะห์ราคาทองคำครบวงจร ติดตามราคาทองแบบ real-time พร้อมชุมชนนักลงทุน ระบบ Gamification และเครื่องมือวิเคราะห์ระดับมืออาชีพ",
  keywords: [
    "ราคาทอง",
    "ทองคำวันนี้",
    "วิเคราะห์ราคาทอง",
    "ลงทุนทอง",
    "gold price",
    "gold trading",
    "ราคาทองคำแท่ง",
    "ราคาทองรูปพรรณ",
    "gold exchange",
    "gold investment",
    "กราฟราคาทอง",
    "gold chart",
    "ชุมชนนักลงทุนทอง",
    "gold community",
    "GX Trade",
  ],
  authors: [{ name: "GX Trade Team" }],
  creator: "Marosdee Uma",
  publisher: "GX Trade",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
  ),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon/favicon.ico" },
    ],
    shortcut: ["/favicon/favicon.ico"],
    apple: ["/favicon/apple-touch-icon.png"],
  },
  manifest: "/favicon/site.webmanifest",
  openGraph: {
    title: "GX Trade | ระบบวิเคราะห์ราคาทอง - Gold Exchange Trade",
    description:
      "แพลตฟอร์มวิเคราะห์ราคาทองคำครบวงจร ติดตามราคาทองแบบ real-time พร้อมชุมชนนักลงทุนและเครื่องมือวิเคราะห์ระดับมืออาชีพ",
    type: "website",
    siteName: "GX Trade",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "GX Trade - Gold Exchange Trade Platform",
      },
    ],
    locale: "th_TH",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
