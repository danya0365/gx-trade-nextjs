"use client";

import { LandingViewModel } from "@/src/presentation/presenters/landing/LandingPresenter";
import { useLandingPresenter } from "@/src/presentation/presenters/landing/useLandingPresenter";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  MinusIcon,
} from "@heroicons/react/24/solid";
import { format } from "date-fns";
import { th } from "date-fns/locale";

interface LandingViewProps {
  initialViewModel: LandingViewModel;
}

export function LandingView({ initialViewModel }: LandingViewProps) {
  const [state, actions] = useLandingPresenter(initialViewModel);
  const { viewModel, isLoading, error } = state;
  const { goldPrices, lastUpdated } = viewModel;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("th-TH", {
      style: "decimal",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getPriceChangeColor = (change: number) => {
    if (change > 0) return "text-red-500";
    if (change < 0) return "text-green-500";
    return "text-gray-500";
  };

  const getPriceChangeIcon = (trend: "up" | "down" | "stable") => {
    switch (trend) {
      case "up":
        return <ArrowUpIcon className="h-5 w-5 text-red-500" />;
      case "down":
        return <ArrowDownIcon className="h-5 w-5 text-green-500" />;
      default:
        return <MinusIcon className="h-5 w-5 text-gray-500" />;
    }
  };

  const getGoldTypeName = (type: string) => {
    switch (type) {
      case "gold_bar":
        return "ทองคำแท่ง";
      case "gold_ornament":
        return "ทองรูปพรรณ";
      case "gold_jewelry":
        return "ทองรูปพรรณ (เครื่องประดับ)";
      default:
        return type;
    }
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-amber-50 to-amber-100 dark:from-gray-900 dark:to-amber-900/30 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 bg-grid-amber-200/50 dark:bg-grid-amber-900/50 [mask-image:linear-gradient(180deg,white_0%,transparent_90%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(251,191,36,0.05)_70%)] dark:bg-[radial-gradient(circle_at_center,transparent_0%,rgba(180,83,9,0.1)_70%)]"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 lg:py-32">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-amber-900 dark:text-amber-100 mb-6">
              <span className="block">Gold Exchange Trade</span>
              <span className="block text-2xl md:text-3xl text-amber-700 dark:text-amber-300 mt-4">
                ระบบวิเคราะห์ราคาทองแบบครบวงจร
              </span>
            </h1>

            <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-amber-800 dark:text-amber-200">
              ติดตามราคาทองคำแบบเรียลไทม์ วิเคราะห์เทรนด์
              และร่วมเป็นส่วนหนึ่งของชุมชนนักลงทุนทองคำ
            </p>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="#prices"
                className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-amber-600 hover:bg-amber-700 md:py-4 md:text-lg md:px-10 transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <span>ดูราคาทองล่าสุด</span>
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              </a>
              <a
                href="#features"
                className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-amber-700 bg-white hover:bg-amber-50 md:py-4 md:text-lg md:px-10 transition-colors duration-200 flex items-center justify-center gap-2 dark:bg-amber-900/30 dark:text-amber-100 dark:hover:bg-amber-900/50"
              >
                <span>เรียนรู้เพิ่มเติม</span>
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </a>
            </div>

            {/* Real-time price ticker */}
            {!isLoading && goldPrices.length > 0 && (
              <div className="mt-16 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 max-w-4xl mx-auto border border-amber-100 dark:border-amber-900/50">
                <h3 className="text-lg font-medium text-amber-800 dark:text-amber-200 mb-3">
                  ราคาทองล่าสุด
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {goldPrices.slice(0, 3).map((price) => (
                    <div
                      key={price.id}
                      className="bg-amber-50 dark:bg-gray-700/50 p-4 rounded-lg"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-amber-700 dark:text-amber-200">
                          {getGoldTypeName(price.type)}
                        </span>
                        <span
                          className={`text-sm font-semibold ${getPriceChangeColor(
                            price.change
                          )}`}
                        >
                          {price.change > 0 ? "+" : ""}
                          {price.change}%
                          {getPriceChangeIcon(
                            price.change > 0
                              ? "up"
                              : price.change < 0
                              ? "down"
                              : "stable"
                          )}
                        </span>
                      </div>
                      <div className="mt-2 flex items-baseline">
                        <span className="text-2xl font-bold text-amber-900 dark:text-white">
                          {formatPrice(price.sellPrice)}
                        </span>
                        <span className="ml-2 text-sm text-amber-600 dark:text-amber-300">
                          บาท/บาท
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-3 text-xs text-amber-600 dark:text-amber-400 text-right">
                  อัปเดตล่าสุด:{" "}
                  {lastUpdated
                    ? format(new Date(lastUpdated), "d MMMM yyyy HH:mm", {
                        locale: th,
                      })
                    : "กำลังโหลด..."}
                </div>
              </div>
            )}

            {/* Scroll indicator */}
            <div className="w-full flex justify-center mt-16 mb-8">
              <div className="flex flex-col items-center">
                <button
                  onClick={() => {
                    const nextSection = document.getElementById("prices");
                    if (nextSection) {
                      nextSection.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  className="group flex flex-col items-center outline-none active:outline-none focus:outline-none rounded-full p-2 transition-all duration-200 animate-bounce"
                  aria-label="เลื่อนลงเพื่อดูราคาทองล่าสุด"
                >
                  <span className="text-sm text-amber-700 dark:text-amber-300 mb-2 group-hover:text-amber-600 dark:group-hover:text-amber-200 transition-colors">
                    เลื่อนลงเพื่อดูเพิ่มเติม
                  </span>
                  <svg
                    className="w-6 h-6 text-amber-500 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 14l-7 7m0 0l-7-7m7 7V3"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main id="prices" className="container mx-auto px-4 py-8">
        {error ? (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        ) : null}

        {/* Gold Prices Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
            ราคาทองคำวันนี้
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {goldPrices.map((price) => (
              <div
                key={price.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105"
              >
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                      {getGoldTypeName(price.type)}
                    </h3>
                    <div className="flex items-center">
                      <span className={getPriceChangeColor(price.change)}>
                        {price.change > 0 ? "+" : ""}
                        {price.change.toFixed(2)} บาท
                      </span>
                      {getPriceChangeIcon(price.trend)}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">
                        ราคารับซื้อ:
                      </span>
                      <span className="font-medium text-gray-800 dark:text-white">
                        {formatPrice(price.buyPrice)} บาท
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">
                        ราคาขายออก:
                      </span>
                      <span className="font-medium text-gray-800 dark:text-white">
                        {formatPrice(price.sellPrice)} บาท
                      </span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                      <span>อัปเดตล่าสุด:</span>
                      <span>
                        {format(price.lastUpdated, "HH:mm น.", { locale: th })}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 px-6 py-3 text-center">
                  <button className="text-sm font-medium text-yellow-600 hover:text-yellow-700 dark:text-yellow-400 dark:hover:text-yellow-300">
                    ดูกราฟราคาย้อนหลัง
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
            ทำไมต้องใช้ Gold Exchange Trade?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "ข้อมูลทันสมัย",
                description: "อัปเดตราคาทองแบบเรียลไทม์ทุก 1 นาที",
                icon: "⏱️",
              },
              {
                title: "วิเคราะห์แนวโน้ม",
                description: "วิเคราะห์กราฟราคาย้อนหลังสูงสุด 1 ปี",
                icon: "📈",
              },
              {
                title: "แจ้งเตือนราคา",
                description: "ตั้งค่าการแจ้งเตือนเมื่อราคาทองถึงจุดที่กำหนด",
                icon: "🔔",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center"
              >
                <div className="text-4xl mb-3">{feature.icon}</div>
                <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
