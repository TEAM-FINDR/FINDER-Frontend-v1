import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import LandingPage from './LandingPage'

function renderPage() {
  render(
    <MemoryRouter>
      <LandingPage />
    </MemoryRouter>,
  )
}

test('히어로 제목과 시작 버튼을 렌더링한다', () => {
  renderPage()

  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('같은 기회도')
  expect(screen.getByRole('button', { name: '내 목적 고르고 시작하기' })).toBeInTheDocument()
})

test('FAQ 항목을 열고 닫는다', () => {
  renderPage()

  const first = screen.getByRole('button', { name: '목적은 나중에 바꿀 수 있나요?' })
  const second = screen.getByRole('button', { name: '간단히 보기를 하면 정보가 빠지나요?' })

  expect(first).toHaveAttribute('aria-expanded', 'true')
  expect(second).toHaveAttribute('aria-expanded', 'false')

  fireEvent.click(second)

  expect(first).toHaveAttribute('aria-expanded', 'false')
  expect(second).toHaveAttribute('aria-expanded', 'true')

  fireEvent.click(second)

  expect(second).toHaveAttribute('aria-expanded', 'false')
})
