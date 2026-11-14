import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import HomePage from './HomePage'
import { useSettingsStore } from '@/stores/useSettingsStore'

beforeEach(() => {
  useSettingsStore.setState({ purpose: 'apply' })
})

function renderPage() {
  render(
    <MemoryRouter>
      <HomePage />
    </MemoryRouter>,
  )
}

test('바로 지원 모드에서 지원 가능한 기회를 보여준다', () => {
  renderPage()

  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
    '시우님이 지금 지원할 수 있는 기회예요',
  )
  expect(screen.getAllByRole('button', { name: '지원하기' }).length).toBeGreaterThan(0)
})

test('모드를 바꾸면 준비 모드 화면으로 전환된다', () => {
  renderPage()

  fireEvent.click(screen.getByRole('button', { name: '준비' }))

  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
    '한 걸음씩 준비하면 12개가 더 열려요',
  )
  expect(screen.getByText('준비할수록 늘어나는 기회')).toBeInTheDocument()
})
