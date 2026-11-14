import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type Purpose = 'apply' | 'prepare' | 'browse'
export type ViewMode = 'simple' | 'detail'

interface SettingsState {
  purpose: Purpose
  viewMode: ViewMode
  onboarded: boolean
  setPurpose: (purpose: Purpose) => void
  setViewMode: (viewMode: ViewMode) => void
  completeOnboarding: () => void
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      purpose: 'apply',
      viewMode: 'simple',
      onboarded: false,
      setPurpose: (purpose) => set({ purpose }),
      setViewMode: (viewMode) => set({ viewMode }),
      completeOnboarding: () => set({ onboarded: true }),
    }),
    { name: 'finder-settings' },
  ),
)
