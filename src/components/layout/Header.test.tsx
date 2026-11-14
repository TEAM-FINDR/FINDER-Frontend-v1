import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Header from './Header'

test('주요 메뉴와 알림 버튼을 렌더링한다', () => {
  render(
    <MemoryRouter>
      <Header />
    </MemoryRouter>,
  )

  expect(screen.getByRole('link', { name: '탐색' })).toHaveAttribute('href', '/explore')
  expect(screen.getByRole('button', { name: '알림' })).toBeInTheDocument()
})

test('현재 경로의 메뉴를 활성 상태로 표시한다', () => {
  render(
    <MemoryRouter initialEntries={['/home']}>
      <Header />
    </MemoryRouter>,
  )

  expect(screen.getByRole('link', { name: '홈' })).toHaveAttribute('aria-current', 'page')
})
