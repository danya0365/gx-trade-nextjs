import { LandingView } from "@/src/presentation/components/landing/LandingView";
import { LandingPresenterFactory } from "@/src/presentation/presenters/landing/LandingPresenter";
import { MainLayout } from "@/src/presentation/components/layout/MainLayout";
import Link from "next/link";
import type { Metadata } from "next";

// Tell Next.js this is a dynamic page
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

/**
 * Generate metadata for the landing page
 */
export async function generateMetadata(): Promise<Metadata> {
  const presenter = await LandingPresenterFactory.createServer();

  try {
    return await presenter.generateMetadata();
  } catch (error) {
    console.error("Error generating metadata:", error);

    // Fallback metadata
    return {
      title: "GX Trade | ระบบวิเคราะห์ราคาทอง",
      description: "แพลตฟอร์มวิเคราะห์ราคาทองคำครบวงจร",
    };
  }
}

/**
 * Landing Page - Server Component for SEO optimization
 * Uses presenter pattern following Clean Architecture
 */
export default async function HomePage() {
  const presenter = await LandingPresenterFactory.createServer();

  try {
    // Get view model from presenter
    const viewModel = await presenter.getViewModel();

    return (
      <MainLayout>
        <LandingView initialViewModel={viewModel} />
      </MainLayout>
    );
  } catch (error) {
    console.error("Error fetching landing page data:", error);

    // Fallback UI
    return (
      <MainLayout>
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gold-50 via-amber-50 to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              เกิดข้อผิดพลาด
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              ไม่สามารถโหลดข้อมูลได้ กรุณาลองใหม่อีกครั้ง
            </p>
            <Link
              href="/"
              className="bg-gradient-gold text-white px-6 py-3 rounded-lg hover:opacity-90 transition-opacity font-medium inline-block"
            >
              โหลดหน้าใหม่
            </Link>
          </div>
        </div>
      </MainLayout>
    );
  }
}
