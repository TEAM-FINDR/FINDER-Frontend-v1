import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type Purpose = 'apply' | 'prepare' | 'browse'
export type ViewMode = 'simple' | 'detail'
export type FontSize = 'base' | 'large' | 'xlarge'

interface SettingsState {
  purpose: Purpose
  viewMode: ViewMode
  fontSize: FontSize
  onboarded: boolean
  setPurpose: (purpose: Purpose) => void
  setViewMode: (viewMode: ViewMode) => void
  setFontSize: (fontSize: FontSize) => void
  completeOnboarding: () => void
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      purpose: 'apply',
      viewMode: 'simple',
      fontSize: 'base',
      onboarded: false,
      setPurpose: (purpose) => set({ purpose }),
      setViewMode: (viewMode) => set({ viewMode }),
      setFontSize: (fontSize) => set({ fontSize }),
      completeOnboarding: () => set({ onboarded: true }),
    }),
    { name: 'findr-settings' },
  ),
)
