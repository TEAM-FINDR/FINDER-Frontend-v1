import { fireEvent, render, screen } from '@testing-library/react'
import SavedPage from './SavedPage'

test('이전·다음 달 버튼으로 달을 옮긴다', () => {
  render(<SavedPage />)

  expect(screen.getByRole('heading', { name: '2026년 10월' })).toBeInTheDocument()
  expect(screen.getByText('봉사단')).toBeInTheDocument()

  fireEvent.click(screen.getByRole('button', { name: '다음 달' }))

  expect(screen.getByRole('heading', { name: '2026년 11월' })).toBeInTheDocument()
  expect(screen.queryByText('봉사단')).not.toBeInTheDocument()

  fireEvent.click(screen.getByRole('button', { name: '이전 달' }))
  fireEvent.click(screen.getByRole('button', { name: '이전 달' }))

  expect(screen.getByRole('heading', { name: '2026년 9월' })).toBeInTheDocument()
})

test('마감 알림 토글을 켜고 끈다', () => {
  render(<SavedPage />)

  const morning = screen.getByLabelText('당일 아침')
  const threeDays = screen.getByLabelText('3일 전')

  expect(morning).not.toBeChecked()
  expect(threeDays).toBeChecked()

  fireEvent.click(morning)
  fireEvent.click(threeDays)

  expect(morning).toBeChecked()
  expect(threeDays).not.toBeChecked()
})
