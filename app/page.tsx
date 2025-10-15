import { LandingView } from "@/src/presentation/components/landing/LandingView";
import { LandingPresenter } from "@/src/presentation/presenters/landing/LandingPresenter";

// Tell Next.js this is a dynamic page
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

/**
 * Home page - Server Component for SEO optimization
 * Uses presenter pattern following Clean Architecture
 */
export default async function Home() {
  const presenter = await LandingPresenter.createServer();

  try {
    // Get view model from presenter
    const viewModel = await presenter.getViewModel();

    return <LandingView initialViewModel={viewModel} />;
  } catch (error) {
    console.error("Error fetching landing page data:", error);

    // Fallback UI with empty data
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
            เกิดข้อผิดพลาด
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            ไม่สามารถโหลดข้อมูลได้ในขณะนี้
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors"
          >
            โหลดใหม่
          </button>
        </div>
      </div>
    );
  }
}
