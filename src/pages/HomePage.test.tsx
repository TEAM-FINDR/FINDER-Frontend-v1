import { render, screen } from '@testing-library/react'
import HomePage from './HomePage'

test('홈 페이지 제목을 렌더링한다', () => {
  render(<HomePage />)

  expect(screen.getByRole('heading', { name: 'FINDER' })).toBeInTheDocument()
})
