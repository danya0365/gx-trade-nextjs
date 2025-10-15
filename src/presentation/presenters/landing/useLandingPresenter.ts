"use client";

import { useCallback, useEffect, useState } from "react";
import {
  LandingViewModel,
  LandingPresenterFactory,
} from "./LandingPresenter";
import type { GoldPrice } from "@/src/data/mock/gold-prices";

// Initialize presenter instance once (singleton pattern)
const presenter = LandingPresenterFactory.createClient();

export interface LandingPresenterState {
  viewModel: LandingViewModel | null;
  loading: boolean;
  error: string | null;
  autoRefresh: boolean;
}

export interface LandingPresenterActions {
  loadData: () => Promise<void>;
  refreshPrices: () => Promise<void>;
  setAutoRefresh: (enabled: boolean) => void;
  getGoldPriceChange: (
    price: GoldPrice
  ) => "up" | "down" | "neutral";
  formatPrice: (price: number) => string;
  formatTime: (timestamp: string) => string;
}

/**
 * Custom hook for Landing presenter
 * Provides state management and actions for Landing page
 */
export function useLandingPresenter(
  initialViewModel?: LandingViewModel
): [LandingPresenterState, LandingPresenterActions] {
  const [viewModel, setViewModel] = useState<LandingViewModel | null>(
    initialViewModel || null
  );
  const [loading, setLoading] = useState(!initialViewModel);
  const [error, setError] = useState<string | null>(null);
  const [autoRefresh, setAutoRefreshState] = useState(true);

  /**
   * Load data from presenter
   */
  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const newViewModel = await presenter.getViewModel();
      setViewModel(newViewModel);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setError(errorMessage);
      console.error("Error loading landing data:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Refresh gold prices only
   */
  const refreshPrices = useCallback(async () => {
    try {
      const prices = await presenter.getCurrentPrices();
      if (viewModel) {
        setViewModel({
          ...viewModel,
          goldPrices: prices,
          metadata: {
            ...viewModel.metadata,
            lastUpdate: new Date().toISOString(),
          },
        });
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setError(errorMessage);
      console.error("Error refreshing prices:", err);
    }
  }, [viewModel]);

  /**
   * Set auto refresh enabled/disabled
   */
  const setAutoRefresh = useCallback((enabled: boolean) => {
    setAutoRefreshState(enabled);
  }, []);

  /**
   * Get price change direction
   */
  const getGoldPriceChange = useCallback(
    (price: GoldPrice): "up" | "down" | "neutral" => {
      if (price.change > 0) return "up";
      if (price.change < 0) return "down";
      return "neutral";
    },
    []
  );

  /**
   * Format price with commas
   */
  const formatPrice = useCallback((price: number): string => {
    return price.toLocaleString("th-TH", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  }, []);

  /**
   * Format timestamp to relative time
   */
  const formatTime = useCallback((timestamp: string): string => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));

    if (diffInMinutes < 1) return "เมื่อสักครู่";
    if (diffInMinutes < 60) return `${diffInMinutes} นาทีที่แล้ว`;

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} ชั่วโมงที่แล้ว`;

    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} วันที่แล้ว`;
  }, []);

  // Auto-refresh prices every 60 seconds
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      refreshPrices();
    }, 60000); // 60 seconds

    return () => clearInterval(interval);
  }, [autoRefresh, refreshPrices]);

  // Load data on mount if no initial data
  useEffect(() => {
    if (!initialViewModel) {
      loadData();
    }
  }, [initialViewModel, loadData]);

  return [
    {
      viewModel,
      loading,
      error,
      autoRefresh,
    },
    {
      loadData,
      refreshPrices,
      setAutoRefresh,
      getGoldPriceChange,
      formatPrice,
      formatTime,
    },
  ];
}
