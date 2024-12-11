import { create } from 'zustand';
import { ServiceDay } from '../types';

interface ServiceDayState {
  serviceDays: ServiceDay[];
  setServiceDays: (days: ServiceDay[]) => void;
  addServiceDay: (day: ServiceDay) => void;
  updateServiceDay: (id: string, updates: Partial<ServiceDay>) => void;
  deleteServiceDay: (id: string) => void;
}

export const useServiceDayStore = create<ServiceDayState>((set) => ({
  serviceDays: [],
  setServiceDays: (days) => set({ serviceDays: days }),
  addServiceDay: (day) =>
    set((state) => ({ serviceDays: [...state.serviceDays, day] })),
  updateServiceDay: (id, updates) =>
    set((state) => ({
      serviceDays: state.serviceDays.map((day) =>
        day.id === id ? { ...day, ...updates } : day
      ),
    })),
  deleteServiceDay: (id) =>
    set((state) => ({
      serviceDays: state.serviceDays.filter((day) => day.id !== id),
    })),
}));