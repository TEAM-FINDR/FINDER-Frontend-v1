import { render, screen } from '@testing-library/react'
import { MemoryRouter, Navigate, Route, Routes } from 'react-router-dom'
import AppLayout from '@/components/layout/AppLayout'
import ExplorePage from '@/pages/ExplorePage'
import HomePage from '@/pages/HomePage'
import LandingPage from '@/pages/LandingPage'
import OnboardingPage from '@/pages/OnboardingPage'
import OpportunityDetailPage from '@/pages/OpportunityDetailPage'
import SavedPage from '@/pages/SavedPage'
import SettingsPage from '@/pages/SettingsPage'

function renderAt(path: string) {
  render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route element={<AppLayout />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/opportunities/:id" element={<OpportunityDetailPage />} />
          <Route path="/saved" element={<SavedPage />} />
          <Route path="/my/settings" element={<SettingsPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </MemoryRouter>,
  )
}

test.each([
  ['/home', '시우님이 지금 지원할 수 있는 기회예요'],
  ['/explore', '기회 탐색'],
  ['/saved', '이번 달 마감 일정'],
  ['/my/settings', '설정'],
])('%s 경로에서 화면이 열린다', (path, heading) => {
  renderAt(path)

  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(heading)
})
