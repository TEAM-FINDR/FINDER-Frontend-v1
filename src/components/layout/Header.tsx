import { Bell } from 'lucide-react'
import { NavLink, Link } from 'react-router-dom'
import Container from '@/components/layout/Container'
import { cn } from '@/lib/cn'

const navItems = [
  { to: '/home', label: '홈' },
  { to: '/explore', label: '탐색' },
  { to: '/my-path', label: 'My-Path' },
  { to: '/saved', label: '저장' },
  { to: '/my/settings', label: 'MY' },
]

export default function Header() {
  return (
    <header className="bg-surface">
      <Container className="flex h-16 items-center">
        <Link to="/home" className="text-xl font-bold">
          Finder
        </Link>

        <nav className="ml-8 flex items-center gap-1" aria-label="주요 메뉴">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  'rounded-lg px-3 py-1.5 text-sm font-medium transition-colors',
                  isActive ? 'bg-chip text-ink' : 'text-ink-muted hover:text-ink',
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-4">
          <button
            type="button"
            aria-label="알림"
            className="text-ink-muted hover:text-ink transition-colors"
          >
            <Bell size={20} />
          </button>
          <span className="bg-line block size-8 rounded-full" aria-hidden />
        </div>
      </Container>
    </header>
  )
}
