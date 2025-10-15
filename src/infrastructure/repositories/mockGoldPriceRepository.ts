import {
  mockGoldPriceHistory,
  mockGoldPrices,
} from "@/src/data/mock/goldPrice.mock";
import { GoldPrice, GoldPriceHistory } from "@/src/domain/entities/goldPrice";
import { GoldPriceRepository } from "@/src/domain/repositories/goldPriceRepository";

export class MockGoldPriceRepository implements GoldPriceRepository {
  async getCurrentPrices(): Promise<GoldPrice[]> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300));
    return [...mockGoldPrices];
  }

  async getPriceHistory(
    type: "gold_bar" | "gold_ornament" | "gold_jewelry",
    days: number = 7
  ): Promise<GoldPriceHistory[]> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // In a real implementation, we would filter by type and limit by days
    return mockGoldPriceHistory.slice(0, days);
  }
}
