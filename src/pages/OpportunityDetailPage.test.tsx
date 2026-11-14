import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import OpportunityDetailPage from './OpportunityDetailPage'

function renderPage(id: string) {
  render(
    <MemoryRouter initialEntries={[`/opportunities/${id}`]}>
      <Routes>
        <Route path="/opportunities/:id" element={<OpportunityDetailPage />} />
      </Routes>
    </MemoryRouter>,
  )
}

test('기회 상세 정보를 렌더링한다', () => {
  renderPage('gwangju-youth-ai-camp')

  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('광주 청소년 AI 캠프')
  expect(screen.getByText('모집 개요')).toBeInTheDocument()
})

test('탭을 누르면 내용이 바뀐다', () => {
  renderPage('gwangju-youth-ai-camp')

  fireEvent.click(screen.getByRole('tab', { name: '문의처' }))

  expect(screen.queryByText('모집 개요')).not.toBeInTheDocument()
  expect(screen.getByText('ai-camp@gen.go.kr')).toBeInTheDocument()
})

test('없는 기회는 안내 문구를 보여준다', () => {
  renderPage('unknown-id')

  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('기회를 찾을 수 없어요')
})
