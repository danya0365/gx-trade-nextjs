"use client";

import { LandingViewModel } from "@/src/presentation/presenters/landing/LandingPresenter";
import { useLandingPresenter } from "@/src/presentation/presenters/landing/useLandingPresenter";
import Link from "next/link";
import {
  TrendingUp,
  TrendingDown,
  ArrowRight,
  BarChart3,
  Users,
  Award,
  BookOpen,
  Bell,
  Play,
  Star,
  RefreshCw,
  ChevronRight,
} from "lucide-react";

interface LandingViewProps {
  initialViewModel?: LandingViewModel;
}

export function LandingView({ initialViewModel }: LandingViewProps) {
  const [state, actions] = useLandingPresenter(initialViewModel);
  const viewModel = state.viewModel;

  // Loading state
  if (state.loading && !viewModel) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gold-50 via-amber-50 to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-gold-500 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            กำลังโหลดข้อมูล...
          </p>
        </div>
      </div>
    );
  }

  // Error state
  if (state.error && !viewModel) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gold-50 via-amber-50 to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <p className="text-red-600 dark:text-red-400 font-medium mb-2">
            เกิดข้อผิดพลาด
          </p>
          <p className="text-gray-600 dark:text-gray-400 mb-4">{state.error}</p>
          <button
            onClick={actions.loadData}
            className="bg-gradient-gold text-white px-6 py-3 rounded-lg hover:opacity-90 transition-opacity font-medium"
          >
            ลองใหม่อีกครั้ง
          </button>
        </div>
      </div>
    );
  }

  if (!viewModel) return null;

  return (
    <div className="bg-gray-50 dark:bg-gray-950">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gold-400 via-amber-500 to-orange-500 dark:from-gold-600 dark:via-amber-700 dark:to-orange-700">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-block mb-6">
              <span className="bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm">
                🏆 แพลตฟอร์มวิเคราะห์ราคาทองอันดับ 1 ในไทย
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              ติดตามราคาทอง
              <br />
              <span className="text-white/90">แบบ Real-time</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
              วิเคราะห์ลงทุนทองคำอย่างมืออาชีพ พร้อมเครื่องมือครบครัน
              และชุมชนนักลงทุนมากกว่า {viewModel.platformStats.totalUsers.toLocaleString()} คน
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/prices"
                className="bg-white text-gold-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg inline-flex items-center space-x-2 group"
              >
                <span>เริ่มใช้งานฟรี</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white/20 transition-colors border-2 border-white/30 inline-flex items-center space-x-2">
                <Play className="w-5 h-5" />
                <span>ดูวิดีโอแนะนำ</span>
              </button>
            </div>

            {/* Stats */}
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { label: "ผู้ใช้งาน", value: viewModel.platformStats.totalUsers.toLocaleString() },
                { label: "โพสต์ทั้งหมด", value: viewModel.platformStats.totalPosts.toLocaleString() },
                { label: "ผู้ใช้รายวัน", value: viewModel.platformStats.dailyActiveUsers.toLocaleString() },
                { label: "รางวัล", value: viewModel.platformStats.totalAchievements.toLocaleString() },
              ].map((stat, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-white/80 text-sm md:text-base">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Wave Shape */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto"
          >
            <path
              d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              className="fill-gray-50 dark:fill-gray-950"
            />
          </svg>
        </div>
      </section>

      {/* Gold Prices Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 -mt-20 relative z-10">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            ราคาทองคำวันนี้
          </h2>
          <button
            onClick={actions.refreshPrices}
            className="flex items-center space-x-2 text-gold-600 dark:text-gold-400 hover:text-gold-700 dark:hover:text-gold-300 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            <span className="text-sm">อัพเดท</span>
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {viewModel.goldPrices.map((price) => {
            const direction = actions.getGoldPriceChange(price);
            const isUp = direction === "up";
            const isDown = direction === "down";

            return (
              <div
                key={price.id}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {price.type === "bar" ? "ทองคำแท่ง" : "ทองรูปพรรณ"}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      96.5%
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-gold rounded-full flex items-center justify-center">
                    <span className="text-2xl">💰</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                      ราคารับซื้อ
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {actions.formatPrice(price.buyPrice)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                      ราคาขาย
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {actions.formatPrice(price.sellPrice)}
                    </p>
                  </div>
                </div>

                <div
                  className={`flex items-center justify-between p-3 rounded-lg ${
                    isUp
                      ? "bg-green-50 dark:bg-green-900/20"
                      : isDown
                      ? "bg-red-50 dark:bg-red-900/20"
                      : "bg-gray-50 dark:bg-gray-700/20"
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    {isUp ? (
                      <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400" />
                    ) : isDown ? (
                      <TrendingDown className="w-5 h-5 text-red-600 dark:text-red-400" />
                    ) : (
                      <div className="w-5 h-5" />
                    )}
                    <span
                      className={`font-semibold ${
                        isUp
                          ? "text-green-600 dark:text-green-400"
                          : isDown
                          ? "text-red-600 dark:text-red-400"
                          : "text-gray-600 dark:text-gray-400"
                      }`}
                    >
                      {isUp ? "+" : ""}
                      {actions.formatPrice(price.change)} บาท
                    </span>
                  </div>
                  <span
                    className={`text-sm font-medium ${
                      isUp
                        ? "text-green-600 dark:text-green-400"
                        : isDown
                        ? "text-red-600 dark:text-red-400"
                        : "text-gray-600 dark:text-gray-400"
                    }`}
                  >
                    {isUp ? "+" : ""}
                    {price.changePercent.toFixed(2)}%
                  </span>
                </div>

                <p className="text-xs text-gray-500 dark:text-gray-400 mt-3 text-center">
                  อัพเดท {actions.formatTime(price.lastUpdate)}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/prices"
            className="inline-flex items-center space-x-2 text-gold-600 dark:text-gold-400 hover:text-gold-700 dark:hover:text-gold-300 font-medium transition-colors group"
          >
            <span>ดูกราฟวิเคราะห์เพิ่มเติม</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white dark:bg-gray-900 py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              ฟีเจอร์ครบครัน สำหรับนักลงทุนทุกระดับ
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              เครื่องมือและฟีเจอร์ที่คุณต้องการ ทั้งหมดอยู่ในที่เดียว
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {viewModel.features.map((feature) => {
              const iconName = feature.icon as keyof typeof iconMap;
              const Icon = iconMap[iconName] || BarChart3;

              return (
                <div
                  key={feature.id}
                  className="group bg-gray-50 dark:bg-gray-800 rounded-xl p-6 hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-gold-400 dark:hover:border-gold-600"
                >
                  <div
                    className={`w-14 h-14 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="bg-gray-50 dark:bg-gray-950 py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              ข่าวสารล่าสุด
            </h2>
            <Link
              href="/news"
              className="text-gold-600 dark:text-gold-400 hover:text-gold-700 dark:hover:text-gold-300 font-medium inline-flex items-center space-x-1 transition-colors group"
            >
              <span>ดูทั้งหมด</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {viewModel.news.map((news) => (
              <div
                key={news.id}
                className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow border border-gray-200 dark:border-gray-700 group cursor-pointer"
              >
                <div className="p-6">
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="px-3 py-1 bg-gold-100 dark:bg-gold-900/30 text-gold-700 dark:text-gold-400 text-xs font-medium rounded-full">
                      {getCategoryLabel(news.category)}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {actions.formatTime(news.publishedAt)}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-gold-600 dark:group-hover:text-gold-400 transition-colors">
                    {news.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">
                    {news.description}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-500">
                    {news.source}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gradient-to-br from-gold-50 via-amber-50 to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              ความคิดเห็นจากผู้ใช้งาน
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              มากกว่า 100,000+ ผู้ใช้งานเชื่อมั่นและไว้วางใจ
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {viewModel.testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-center space-x-1 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < testimonial.rating
                          ? "text-gold-500 fill-gold-500"
                          : "text-gray-300 dark:text-gray-600"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-6 italic">
                  &ldquo;{testimonial.content}&rdquo;
                </p>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-gold rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-gold-400 via-amber-500 to-orange-500 dark:from-gold-600 dark:via-amber-700 dark:to-orange-700 py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            พร้อมเริ่มต้นลงทุนทองคำแล้วหรือยัง?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            สมัครสมาชิกวันนี้ รับฟรีเครดิต 100 คะแนน
            พร้อมเข้าถึงฟีเจอร์พิเศษทั้งหมด
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/register"
              className="bg-white text-gold-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg inline-flex items-center space-x-2"
            >
              <span>สมัครสมาชิกฟรี</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/learn"
              className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white/20 transition-colors border-2 border-white/30"
            >
              เรียนรู้เพิ่มเติม
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

// Icon mapping helper
const iconMap = {
  TrendingUp,
  BarChart3,
  Users,
  Award,
  BookOpen,
  Bell,
};

// Category label helper
function getCategoryLabel(category: string): string {
  const labels: Record<string, string> = {
    market: "ตลาด",
    analysis: "วิเคราะห์",
    global: "โลก",
    thailand: "ไทย",
  };
  return labels[category] || category;
}
