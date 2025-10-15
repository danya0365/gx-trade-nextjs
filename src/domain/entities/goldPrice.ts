export interface GoldPrice {
  id: string;
  type: 'gold_bar' | 'gold_ornament' | 'gold_jewelry';
  buyPrice: number;
  sellPrice: number;
  change: number;
  lastUpdated: Date;
  trend: 'up' | 'down' | 'stable';
}

export interface GoldPriceHistory {
  date: Date;
  buyPrice: number;
  sellPrice: number;
}
