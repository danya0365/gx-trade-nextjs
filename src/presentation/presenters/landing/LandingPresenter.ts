import type { Metadata } from "next";
import {
  currentGoldPrices,
  historicalPrices,
  marketStats,
  type GoldPrice,
  type HistoricalPrice,
} from "@/src/data/mock/gold-prices";
import {
  latestNews,
  features,
  testimonials,
  platformStats,
  type NewsItem,
  type Feature,
  type Testimonial,
  type PlatformStats,
} from "@/src/data/mock/landing-data";

/**
 * View Model for Landing Page
 */
export interface LandingViewModel {
  goldPrices: GoldPrice[];
  historicalPrices: HistoricalPrice[];
  marketStats: typeof marketStats;
  news: NewsItem[];
  features: Feature[];
  testimonials: Testimonial[];
  platformStats: PlatformStats;
  metadata: {
    lastUpdate: string;
    nextUpdate: string;
  };
}

/**
 * Presenter for Landing Page
 * Follows Clean Architecture with proper separation of concerns
 */
export class LandingPresenter {
  /**
   * Get view model for the landing page
   */
  async getViewModel(): Promise<LandingViewModel> {
    try {
      // In production, this would fetch from API or Supabase
      // For now, we use mock data
      const now = new Date();
      const nextUpdate = new Date(now.getTime() + 60 * 1000); // 1 minute from now

      return {
        goldPrices: currentGoldPrices,
        historicalPrices: historicalPrices,
        marketStats: marketStats,
        news: latestNews.slice(0, 4), // Show only 4 latest news
        features: features,
        testimonials: testimonials,
        platformStats: platformStats,
        metadata: {
          lastUpdate: now.toISOString(),
          nextUpdate: nextUpdate.toISOString(),
        },
      };
    } catch (error) {
      console.error("Error in LandingPresenter.getViewModel:", error);
      throw error;
    }
  }

  /**
   * Generate metadata for the page
   */
  async generateMetadata(): Promise<Metadata> {
    try {
      return {
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
        ],
        openGraph: {
          title: "GX Trade - แพลตฟอร์มวิเคราะห์ราคาทองคำ",
          description: "ติดตามราคาทองแบบ real-time พร้อมเครื่องมือวิเคราะห์ระดับมืออาชีพ",
          type: "website",
        },
      };
    } catch (error) {
      console.error("Error generating metadata:", error);
      throw error;
    }
  }

  /**
   * Get current gold prices
   */
  async getCurrentPrices(): Promise<GoldPrice[]> {
    try {
      return currentGoldPrices;
    } catch (error) {
      console.error("Error getting current prices:", error);
      throw error;
    }
  }

  /**
   * Get latest news
   */
  async getLatestNews(limit: number = 4): Promise<NewsItem[]> {
    try {
      return latestNews.slice(0, limit);
    } catch (error) {
      console.error("Error getting latest news:", error);
      throw error;
    }
  }

  /**
   * Get platform features
   */
  async getFeatures(): Promise<Feature[]> {
    try {
      return features;
    } catch (error) {
      console.error("Error getting features:", error);
      throw error;
    }
  }

  /**
   * Get testimonials
   */
  async getTestimonials(): Promise<Testimonial[]> {
    try {
      return testimonials;
    } catch (error) {
      console.error("Error getting testimonials:", error);
      throw error;
    }
  }

  /**
   * Get platform statistics
   */
  async getPlatformStats(): Promise<PlatformStats> {
    try {
      return platformStats;
    } catch (error) {
      console.error("Error getting platform stats:", error);
      throw error;
    }
  }
}

/**
 * Factory for creating LandingPresenter instances
 * Supports both server and client environments
 */
export class LandingPresenterFactory {
  /**
   * Create presenter for server-side rendering
   */
  static async createServer(): Promise<LandingPresenter> {
    return new LandingPresenter();
  }

  /**
   * Create presenter for client-side rendering
   */
  static createClient(): LandingPresenter {
    return new LandingPresenter();
  }
}
