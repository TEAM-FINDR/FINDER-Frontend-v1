import { Outlet, useLocation } from 'react-router-dom'
import Header from '@/components/layout/Header'
import Container from '@/components/layout/Container'

export default function AppLayout() {
  const { pathname } = useLocation()

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Container key={pathname} className="animate-fade-up py-12">
          <Outlet />
        </Container>
      </main>
    </div>
  )
}
