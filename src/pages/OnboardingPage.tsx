import { Check } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import Container from '@/components/layout/Container'
import Button from '@/components/ui/Button'
import { cn } from '@/lib/cn'
import { useSettingsStore, type Purpose } from '@/stores/useSettingsStore'

const purposes: { value: Purpose; label: string; title: string; items: string[] }[] = [
  {
    value: 'apply',
    label: '바로 지원 모드',
    title: '지금 바로 지원할 곳을 찾아요',
    items: ['마감 임박 기회를 맨 위에', '지금 가능한 기회만 마감 순으로'],
  },
  {
    value: 'prepare',
    label: '준비 모드',
    title: '앞으로를 준비하고 싶어요',
    items: ['이번 달 목표와 오늘 할 일', '준비하면 열리는 기회'],
  },
  {
    value: 'browse',
    label: '둘러보기 모드',
    title: '어떤 기회가 있는지 궁금해요',
    items: ['오늘 하나만 크게', '분야별로 가볍게'],
  },
]

export default function OnboardingPage() {
  const navigate = useNavigate()
  const purpose = useSettingsStore((state) => state.purpose)
  const setPurpose = useSettingsStore((state) => state.setPurpose)
  const completeOnboarding = useSettingsStore((state) => state.completeOnboarding)

  const handleNext = () => {
    completeOnboarding()
    navigate('/home')
  }

  return (
    <div className="bg-page min-h-screen">
      <Container className="flex h-20 items-center">
        <Link to="/" className="text-xl font-bold">
          Finder
        </Link>
        <Link to="/home" className="text-ink-muted hover:text-ink ml-auto text-sm">
          나중에 할게요
        </Link>
      </Container>

      <Container className="pb-24">
        <ol className="flex gap-4" aria-label="온보딩 진행 단계">
          {[1, 2, 3].map((step) => (
            <li
              key={step}
              aria-current={step === 1 ? 'step' : undefined}
              className={cn('h-1 flex-1 rounded-full', step === 1 ? 'bg-primary' : 'bg-line')}
            >
              <span className="sr-only">{step}단계</span>
            </li>
          ))}
        </ol>

        <p className="text-ink-muted mt-9 flex items-center gap-2 text-sm">
          <span className="bg-primary size-1.5 rounded-full" aria-hidden />1 / 3 · 이용 목적
        </p>
        <h1 className="mt-4 text-4xl font-bold">Finder를 어떤 목적으로 쓰실 건가요?</h1>
        <p className="text-ink-muted mt-4 text-sm">
          고른 목적에 맞춰 홈에서 먼저 보이는 것이 달라져요. 나중에 언제든 바꿀 수 있어요.
        </p>

        <fieldset className="mt-9">
          <legend className="sr-only">이용 목적</legend>
          <div className="grid gap-5 md:grid-cols-3">
            {purposes.map((item) => {
              const isSelected = purpose === item.value
              return (
                <label
                  key={item.value}
                  className={cn(
                    'cursor-pointer rounded-2xl p-6 transition-colors',
                    isSelected ? 'bg-primary-soft' : 'bg-surface',
                  )}
                >
                  <div className="flex items-start justify-between gap-4">
                    <span
                      className={cn(
                        'text-sm font-semibold',
                        isSelected ? 'text-primary' : 'text-ink-muted',
                      )}
                    >
                      {item.label}
                    </span>
                    <input
                      type="radio"
                      name="purpose"
                      value={item.value}
                      checked={isSelected}
                      onChange={() => setPurpose(item.value)}
                      className="peer sr-only"
                    />
                    <span
                      className={cn(
                        'flex size-5 shrink-0 items-center justify-center rounded-full',
                        'peer-focus-visible:outline-primary peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2',
                        isSelected ? 'bg-primary text-white' : 'border-line border',
                      )}
                      aria-hidden
                    >
                      {isSelected && <Check size={12} strokeWidth={3} />}
                    </span>
                  </div>

                  <p className="mt-3 text-lg font-bold">{item.title}</p>

                  <ul className="mt-5 space-y-2">
                    {item.items.map((text) => (
                      <li key={text} className="text-ink-muted flex items-center gap-2 text-xs">
                        <Check size={14} className="text-line shrink-0" aria-hidden />
                        {text}
                      </li>
                    ))}
                  </ul>
                </label>
              )
            })}
          </div>
        </fieldset>

        <div className="mt-8 flex items-center justify-between gap-4">
          <p className="text-ink-muted text-sm">다음: 보는 방식 · 글자 크기 · 알림</p>
          <Button size="lg" className="px-16" onClick={handleNext}>
            다음
          </Button>
        </div>
      </Container>
    </div>
  )
}
