'use client';

import { useState, useEffect, useCallback } from 'react';
import { LandingPresenter } from './LandingPresenter';
import { LandingViewModel } from './LandingPresenter';

interface LandingPresenterState {
  viewModel: LandingViewModel;
  isLoading: boolean;
  error: string | null;
}

interface LandingPresenterActions {
  refresh: () => Promise<void>;
}

// Initialize presenter instance once (singleton pattern)
const presenter = LandingPresenter.createClient();

export function useLandingPresenter(
  initialViewModel: LandingViewModel
): [LandingPresenterState, LandingPresenterActions] {
  const [state, setState] = useState<LandingPresenterState>({
    viewModel: initialViewModel,
    isLoading: false,
    error: null,
  });

  const loadData = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const viewModel = await presenter.getViewModel();
      setState({
        viewModel,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      console.error('Error in useLandingPresenter:', error);
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: 'เกิดข้อผิดพลาดในการโหลดข้อมูล',
      }));
    }
  }, []);

  // Initial load
  useEffect(() => {
    if (!initialViewModel.goldPrices.length) {
      loadData();
    }
  }, [initialViewModel.goldPrices.length, loadData]);

  const refresh = useCallback(async () => {
    await loadData();
  }, [loadData]);

  return [state, { refresh }];
}
