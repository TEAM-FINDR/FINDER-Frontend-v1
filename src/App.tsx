import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import AppLayout from '@/components/layout/AppLayout'
import ExplorePage from '@/pages/ExplorePage'
import HomePage from '@/pages/HomePage'
import OpportunityDetailPage from '@/pages/OpportunityDetailPage'
import LandingPage from '@/pages/LandingPage'
import OnboardingPage from '@/pages/OnboardingPage'
import SavedPage from '@/pages/SavedPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route element={<AppLayout />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/opportunities/:id" element={<OpportunityDetailPage />} />
          <Route path="/saved" element={<SavedPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
