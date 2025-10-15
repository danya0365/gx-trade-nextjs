import { GoldPrice, GoldPriceHistory } from "@/src/domain/entities/goldPrice";

export const mockGoldPrices: GoldPrice[] = [
  {
    id: "1",
    type: "gold_bar",
    buyPrice: 32900,
    sellPrice: 32950,
    change: 50,
    lastUpdated: new Date("2025-10-15T09:30:00+07:00"),
    trend: "up",
  },
  {
    id: "2",
    type: "gold_ornament",
    buyPrice: 32850,
    sellPrice: 33050,
    change: -25,
    lastUpdated: new Date("2025-10-15T09:30:00+07:00"),
    trend: "down",
  },
  {
    id: "3",
    type: "gold_jewelry",
    buyPrice: 32750,
    sellPrice: 33150,
    change: 0,
    lastUpdated: new Date("2025-10-15T09:30:00+07:00"),
    trend: "stable",
  },
];

export const mockGoldPriceHistory: GoldPriceHistory[] = [
  {
    date: new Date("2025-10-15T09:30:00+07:00"),
    buyPrice: 32900,
    sellPrice: 32950,
  },
  {
    date: new Date("2025-10-14T09:30:00+07:00"),
    buyPrice: 32850,
    sellPrice: 32900,
  },
  {
    date: new Date("2025-10-13T09:30:00+07:00"),
    buyPrice: 32950,
    sellPrice: 33000,
  },
  {
    date: new Date("2025-10-12T09:30:00+07:00"),
    buyPrice: 32800,
    sellPrice: 32850,
  },
  {
    date: new Date("2025-10-11T09:30:00+07:00"),
    buyPrice: 32750,
    sellPrice: 32800,
  },
  {
    date: new Date("2025-10-10T09:30:00+07:00"),
    buyPrice: 32850,
    sellPrice: 32900,
  },
  {
    date: new Date("2025-10-09T09:30:00+07:00"),
    buyPrice: 32900,
    sellPrice: 32950,
  },
];
