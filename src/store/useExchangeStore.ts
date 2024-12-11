import { create } from 'zustand';
import { ExchangeRequest } from '../types';

interface ExchangeState {
  exchanges: ExchangeRequest[];
  addExchange: (exchange: ExchangeRequest) => void;
  updateExchange: (id: string, status: ExchangeRequest['status']) => void;
  removeExchange: (id: string) => void;
}

export const useExchangeStore = create<ExchangeState>((set) => ({
  exchanges: [],
  addExchange: (exchange) =>
    set((state) => ({
      exchanges: [...state.exchanges, exchange],
    })),
  updateExchange: (id, status) =>
    set((state) => ({
      exchanges: state.exchanges.map((e) =>
        e.id === id ? { ...e, status } : e
      ),
    })),
  removeExchange: (id) =>
    set((state) => ({
      exchanges: state.exchanges.filter((e) => e.id !== id),
    })),
}));