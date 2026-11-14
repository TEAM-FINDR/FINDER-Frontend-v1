import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import SettingsPage from './SettingsPage'
import { useSettingsStore } from '@/stores/useSettingsStore'

beforeEach(() => {
  useSettingsStore.setState({ purpose: 'apply', viewMode: 'simple', fontSize: 'base' })
})

function renderPage() {
  render(
    <MemoryRouter>
      <SettingsPage />
    </MemoryRouter>,
  )
}

test('이용 목적을 바꾸면 설정 스토어에 반영된다', () => {
  renderPage()

  expect(screen.getByRole('radio', { name: /바로 지원/ })).toBeChecked()

  fireEvent.click(screen.getByRole('radio', { name: /준비/ }))

  expect(useSettingsStore.getState().purpose).toBe('prepare')
  expect(screen.getByRole('radio', { name: /준비/ })).toBeChecked()
})

test('글자 크기를 바꾸면 미리보기 글자 크기가 커진다', () => {
  renderPage()

  expect(screen.getByText('광주 청소년 AI 캠프')).toHaveClass('text-base')

  fireEvent.click(screen.getByRole('button', { name: '아주 크게' }))

  expect(useSettingsStore.getState().fontSize).toBe('xlarge')
  expect(screen.getByText('광주 청소년 AI 캠프')).toHaveClass('text-xl')
})
