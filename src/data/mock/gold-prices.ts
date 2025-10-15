/**
 * Mock data for gold prices
 * ข้อมูลราคาทองแบบ mock สำหรับการพัฒนา
 */

export interface GoldPrice {
  id: string;
  type: "bar" | "ornament"; // ทองคำแท่ง | ทองรูปพรรณ
  buyPrice: number;
  sellPrice: number;
  change: number; // เปลี่ยนแปลงจากวันก่อน (บาท)
  changePercent: number; // เปลี่ยนแปลงเป็นเปอร์เซ็นต์
  lastUpdate: string; // ISO timestamp
}

export interface HistoricalPrice {
  timestamp: string;
  price: number;
}

/**
 * Current gold prices
 */
export const currentGoldPrices: GoldPrice[] = [
  {
    id: "gold-bar",
    type: "bar",
    buyPrice: 41850,
    sellPrice: 41950,
    change: 150,
    changePercent: 0.36,
    lastUpdate: new Date().toISOString(),
  },
  {
    id: "gold-ornament",
    type: "ornament",
    buyPrice: 40850,
    sellPrice: 41850,
    change: 200,
    changePercent: 0.49,
    lastUpdate: new Date().toISOString(),
  },
];

/**
 * Historical prices for charts (last 30 days)
 */
export const historicalPrices: HistoricalPrice[] = Array.from(
  { length: 30 },
  (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (29 - i));
    const basePrice = 41000;
    const variation = Math.sin(i / 5) * 500 + Math.random() * 300;
    return {
      timestamp: date.toISOString(),
      price: basePrice + variation,
    };
  }
);

/**
 * Market statistics
 */
export const marketStats = {
  dailyVolume: 15234,
  weeklyHigh: 42150,
  weeklyLow: 40850,
  monthlyAverage: 41350,
  trend: "up" as const,
  volatility: "medium" as const,
};
