import { render, screen } from '@testing-library/react'
import App from './App'

function renderAt(path: string) {
  window.history.pushState(null, '', path)
  render(<App />)
}

test.each([
  ['/', '같은 기회도'],
  ['/onboarding', 'Finder를 어떤 목적으로 쓰실 건가요?'],
  ['/home', '시우님이 지금 지원할 수 있는 기회예요'],
  ['/explore', '기회 탐색'],
  ['/saved', '이번 달 마감 일정'],
  ['/my/settings', '설정'],
])('%s 경로에서 화면이 열린다', (path, heading) => {
  renderAt(path)

  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(heading)
})

test('기회 상세 경로가 열린다', () => {
  renderAt('/opportunities/gwangju-youth-ai-camp')

  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('광주 청소년 AI 캠프')
})
