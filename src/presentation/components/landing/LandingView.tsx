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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="bg-gradient-to-r from-yellow-600 to-yellow-700 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h1 className="text-3xl font-bold">Gold Exchange Trade</h1>
              <p className="text-yellow-100">ระบบติดตามราคาทองคำออนไลน์</p>
            </div>
            <div className="text-sm text-yellow-100">
              {lastUpdated && (
                <p>
                  อัปเดตล่าสุด:{" "}
                  {format(new Date(lastUpdated), "d MMMM yyyy HH:mm น.", {
                    locale: th,
                  })}
                </p>
              )}
              <button
                onClick={actions.refresh}
                disabled={isLoading}
                className="mt-1 text-yellow-200 hover:text-white flex items-center text-sm"
              >
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    กำลังโหลด...
                  </>
                ) : (
                  "รีเฟรชข้อมูล"
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
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

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p>
              © {new Date().getFullYear()} Gold Exchange Trade. All rights
              reserved.
            </p>
            <p className="text-sm text-gray-400 mt-2">
              ข้อมูลราคาทองคำเป็นเพียงการประมาณการเท่านั้น
              ไม่ใช่ราคาที่ใช้ในการซื้อขายจริง
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
