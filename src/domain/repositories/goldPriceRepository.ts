import { GoldPrice, GoldPriceHistory } from '../entities/goldPrice';

export interface GoldPriceRepository {
  getCurrentPrices(): Promise<GoldPrice[]>;
  getPriceHistory(type: 'gold_bar' | 'gold_ornament' | 'gold_jewelry', days: number): Promise<GoldPriceHistory[]>;
}
