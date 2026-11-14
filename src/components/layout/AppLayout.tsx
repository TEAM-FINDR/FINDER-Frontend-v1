import { Outlet } from 'react-router-dom'
import Header from '@/components/layout/Header'
import Container from '@/components/layout/Container'

export default function AppLayout() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Container className="py-12">
          <Outlet />
        </Container>
      </main>
    </div>
  )
}
