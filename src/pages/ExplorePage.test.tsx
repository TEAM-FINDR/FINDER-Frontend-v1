import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import ExplorePage from './ExplorePage'

function renderPage() {
  render(
    <MemoryRouter>
      <ExplorePage />
    </MemoryRouter>,
  )
}

test('검색어로 목록을 거른다', () => {
  renderPage()

  fireEvent.change(screen.getByRole('searchbox', { name: '기회 검색' }), {
    target: { value: '장학금' },
  })

  expect(screen.getAllByText('청소년 진로 장학금').length).toBeGreaterThan(0)
  expect(screen.queryByText('광주 청소년 AI 캠프')).not.toBeInTheDocument()
})

test('내 조건만 끄면 조건이 부족한 기회도 보인다', () => {
  renderPage()

  expect(screen.queryByText('전국 고교생 앱 개발 해커톤')).not.toBeInTheDocument()

  fireEvent.click(screen.getByLabelText('내 조건만'))

  expect(screen.getByText('전국 고교생 앱 개발 해커톤')).toBeInTheDocument()
})
