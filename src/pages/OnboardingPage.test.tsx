import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import OnboardingPage from './OnboardingPage'
import { useSettingsStore } from '@/stores/useSettingsStore'

beforeEach(() => {
  useSettingsStore.setState({ purpose: 'apply', onboarded: false })
})

test('이용 목적을 고르면 설정에 반영된다', () => {
  render(
    <MemoryRouter>
      <OnboardingPage />
    </MemoryRouter>,
  )

  expect(screen.getByRole('radio', { name: /바로 지원 모드/ })).toBeChecked()

  fireEvent.click(screen.getByRole('radio', { name: /준비 모드/ }))

  expect(useSettingsStore.getState().purpose).toBe('prepare')
})

test('다음을 누르면 온보딩이 완료된다', () => {
  render(
    <MemoryRouter>
      <OnboardingPage />
    </MemoryRouter>,
  )

  fireEvent.click(screen.getByRole('button', { name: '다음' }))

  expect(useSettingsStore.getState().onboarded).toBe(true)
})
