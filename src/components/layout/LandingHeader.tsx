import { Link } from 'react-router-dom'
import Container from '@/components/layout/Container'
import Button from '@/components/ui/Button'

const navItems = [
  { href: '#intro', label: '서비스 소개' },
  { href: '#modes', label: '목적별 이용' },
  { href: '#my-path', label: 'My-Path' },
  { href: '#faq', label: '자주 묻는 질문' },
]

export default function LandingHeader() {
  return (
    <header className="bg-surface">
      <Container className="flex h-20 items-center">
        <Link to="/" className="text-xl font-bold">
          FINDR
        </Link>

        <nav className="ml-10 hidden items-center gap-7 md:flex" aria-label="주요 메뉴">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-ink-muted hover:text-ink text-sm transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-5">
          <Link to="/home" className="text-ink-muted hover:text-ink text-sm transition-colors">
            로그인
          </Link>
          <Link to="/home">
            <Button size="md">시작하기</Button>
          </Link>
        </div>
      </Container>
    </header>
  )
}
