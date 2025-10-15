import { GoldPrice } from "@/src/domain/entities/goldPrice";
import { GoldPriceRepository } from "@/src/domain/repositories/goldPriceRepository";
import { MockGoldPriceRepository } from "@/src/infrastructure/repositories/mockGoldPriceRepository";
import type { Metadata } from "next";

export interface LandingViewModel {
  goldPrices: GoldPrice[];
  isLoading: boolean;
  error: string | null;
  lastUpdated: Date | null;
  stats: {
    totalPrices: number;
    lastUpdated: string;
    priceChange24h: number;
  };
}

/**
 * Presenter for the Landing page
 * Follows Clean Architecture with proper separation of concerns
 */
export class LandingPresenter {
  constructor(private readonly goldPriceRepository: GoldPriceRepository) {}

  /**
   * Get view model for the page
   */
  async getViewModel(): Promise<LandingViewModel> {
    try {
      const [goldPrices] = await Promise.all([
        this.goldPriceRepository.getCurrentPrices(),
      ]);

      // Calculate stats
      const stats = {
        totalPrices: goldPrices.length,
        lastUpdated: new Date().toISOString(),
        priceChange24h: this.calculate24hPriceChange(goldPrices),
      };

      return {
        goldPrices,
        isLoading: false,
        error: null,
        lastUpdated: new Date(),
        stats,
      };
    } catch (error) {
      console.error("Error in LandingPresenter.getViewModel:", error);
      return {
        goldPrices: [],
        isLoading: false,
        error: "ไม่สามารถโหลดข้อมูลราคาทองได้ในขณะนี้",
        lastUpdated: null,
        stats: {
          totalPrices: 0,
          lastUpdated: new Date().toISOString(),
          priceChange24h: 0,
        },
      };
    }
  }

  /**
   * Generate metadata for the page
   */
  async generateMetadata(): Promise<Metadata> {
    return {
      title: "ราคาทองคำวันนี้ | GX Trade",
      description:
        "ตรวจสอบราคาทองคำล่าสุด อัพเดทแบบเรียลไทม์ พร้อมกราฟและสถิติย้อนหลัง",
      keywords: [
        "ราคาทอง",
        "ทองคำ",
        "ราคาทองวันนี้",
        "ทองรูปพรรณ",
        "ทองคำแท่ง",
      ],
      openGraph: {
        title: "ราคาทองคำวันนี้ | GX Trade",
        description:
          "ตรวจสอบราคาทองคำล่าสุด อัพเดทแบบเรียลไทม์ พร้อมกราฟและสถิติย้อนหลัง",
        type: "website",
        locale: "th_TH",
        siteName: "GX Trade",
      },
    };
  }

  /**
   * Calculate 24h price change percentage
   * This is a mock implementation - in a real app, you would compare with historical data
   */
  private calculate24hPriceChange(prices: GoldPrice[]): number {
    if (prices.length < 2) return 0;

    // Mock calculation - in a real app, compare with actual 24h old data
    const currentPrice = prices[0].buyPrice;
    const previousPrice = prices[prices.length - 1].buyPrice;

    return ((currentPrice - previousPrice) / previousPrice) * 100;
  }

  /**
   * Factory method for server-side usage
   */
  static async createServer(): Promise<LandingPresenter> {
    const repository = await new MockGoldPriceRepository();
    return new LandingPresenter(repository);
  }

  /**
   * Factory method for client-side usage
   */
  static createClient(): LandingPresenter {
    const repository = new MockGoldPriceRepository();
    return new LandingPresenter(repository);
  }
}

// Export factory functions for easy access
export const LandingPresenterFactory = {
  createServer: async () => await LandingPresenter.createServer(),
  createClient: () => LandingPresenter.createClient(),
};
