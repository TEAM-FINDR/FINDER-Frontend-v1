import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type Purpose = 'apply' | 'prepare' | 'browse'

interface SettingsState {
  purpose: Purpose
  onboarded: boolean
  setPurpose: (purpose: Purpose) => void
  completeOnboarding: () => void
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      purpose: 'apply',
      onboarded: false,
      setPurpose: (purpose) => set({ purpose }),
      completeOnboarding: () => set({ onboarded: true }),
    }),
    { name: 'finder-settings' },
  ),
)
