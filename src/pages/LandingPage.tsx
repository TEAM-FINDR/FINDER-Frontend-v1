import { useState, type ReactNode } from 'react'
import { Check, ChevronRight, Minus, Plus } from 'lucide-react'
import { Link } from 'react-router-dom'
import Container from '@/components/layout/Container'
import LandingHeader from '@/components/layout/LandingHeader'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import { cn } from '@/lib/cn'
import { usePageMotion } from '@/lib/usePageMotion'

const purposeOptions = [
  { title: '지금 바로 지원할 곳을 찾아요', desc: '마감 임박·지금 가능한 기회부터' },
  { title: '앞으로를 준비하고 싶어요', desc: '무엇을 하면 기회가 열리는지부터' },
  { title: '어떤 기회가 있는지 둘러볼래요', desc: '분야별로 가볍게' },
]

const previewOpportunities = [
  {
    category: '봉사',
    title: '청소년 디지털 봉사단',
    org: '광주광역시 자원봉사센터',
    due: '10.03 마감',
    dday: 'D-2',
    urgent: true,
  },
  {
    category: '교육',
    title: 'AI·SW 인재 양성 프로그램',
    org: '과학기술정보통신부',
    due: '10.06 마감',
    dday: 'D-5',
    urgent: false,
  },
  {
    category: '교육',
    title: '광주 청소년 AI 캠프',
    org: '광주광역시교육청',
    due: '10.08 마감',
    dday: 'D-7',
    urgent: false,
  },
]

const steps = [
  {
    no: '01',
    title: '목적 고르기',
    desc: '바로 지원, 준비, 둘러보기 중 하나를 골라요.',
    meta: '약 3초',
  },
  {
    no: '02',
    title: '보는 방식 고르기',
    desc: '간단히·자세히, 글자 크기, 알림을 얼마나 받을지 정해요.',
    meta: '약 10초',
  },
  {
    no: '03',
    title: '맞춤 홈 받기',
    desc: '고른 목적에 맞는 순서로 기회가 정리된 홈을 받아요.',
    meta: '바로',
  },
  {
    no: '04',
    title: '언제든 바꾸기',
    desc: '시험 기간엔 간단히, 방학엔 준비 모드처럼 바꿔 써요.',
    meta: '언제든',
  },
]

const modes = [
  {
    no: '01',
    title: '바로 지원 모드',
    subtitle: '지금 지원할 곳이 필요해요',
    items: ['마감 임박 기회를 맨 위에', '지금 가능한 기회만 마감 순으로', '목록에서 바로 지원하기'],
  },
  {
    no: '02',
    title: '준비 모드',
    subtitle: '앞으로를 준비하고 싶어요',
    items: ['이번 달 목표와 진행률', '오늘 할 일 체크리스트', '준비하면 열리는 기회'],
  },
  {
    no: '03',
    title: '둘러보기 모드',
    subtitle: '어떤 기회가 있는지 궁금해요',
    items: ['오늘 하나만 크게', '분야별로 가볍게'],
  },
]

const conditions = [
  { label: '나이 · 만 17세' },
  { label: '거주 지역 · 광주' },
  { label: '학년 · 고등학생' },
  { label: '관심 분야 · AI' },
]

const summaryRows = [
  { label: '누가', value: '광주 사는 만 14~19세' },
  { label: '언제', value: '10월 24~26일' },
  { label: '어떻게', value: '신청서 1장 내기' },
]

const stats = [
  { value: '3', unit: '가지', label: '이용 목적' },
  { value: '2', unit: '가지', label: '보기 방식' },
  { value: '3', unit: '단계', label: '글자 크기' },
]

const personas = [
  {
    tag: '고2 · 바로 지원 모드',
    title: '이번 주에 낼 수 있는 대회부터 봐요',
    desc: '시험 끝나고 남은 2주 안에 지원할 수 있는 것만 마감 순으로 봐요. 목록에서 바로 지원 버튼을 눌러요.',
  },
  {
    tag: '중3 · 준비 모드',
    title: '고등학교 가기 전에 하나씩 준비해요',
    desc: '포트폴리오를 만들면 12개 기회가 더 열린다는 걸 보고, 하루 10분씩 할 일을 체크해요.',
  },
  {
    tag: '학부모 · 함께 보기',
    title: '아이가 저장한 기회의 마감만 받아봐요',
    desc: '아이 계정과 연결해서 마감 3일 전 알림만 받아요. 프로필과 활동 기록은 보지 않아요.',
  },
]

const faqs = [
  {
    q: '목적은 나중에 바꿀 수 있나요?',
    a: '네. MY › 이용 방식에서 언제든 바꿀 수 있고, 바꾸면 홈 화면이 바로 다시 정리돼요.',
  },
  {
    q: '간단히 보기를 하면 정보가 빠지나요?',
    a: '아니요. 간단히 보기는 누가·언제·어떻게 세 줄과 내 조건만 먼저 보여줘요. 자세히 보기로 바꾸면 같은 기회의 전체 정보를 볼 수 있어요.',
  },
  {
    q: '보호자가 연결되면 무엇까지 보이나요?',
    a: '저장한 기회와 마감일만 공유돼요. 프로필과 활동 기록은 공유되지 않아요.',
  },
  {
    q: '앱과 웹 설정이 따로인가요?',
    a: '앱과 웹이 같은 설정을 써요. 한쪽에서 바꾸면 다른 쪽 홈 화면에도 바로 반영돼요.',
  },
]

function Reveal({ children }: { children: ReactNode }) {
  return <div data-reveal>{children}</div>
}

function Eyebrow({ children }: { children: string }) {
  return (
    <p className="text-ink-muted flex items-center gap-2 text-sm">
      <span className="bg-primary size-1.5 rounded-full" aria-hidden />
      {children}
    </p>
  )
}

function Hero() {
  return (
    <section className="bg-surface pt-24 pb-20">
      <Container>
        <div data-reveal>
          <Eyebrow>청소년 교육·공모전·장학금 기회 찾기</Eyebrow>
          <h1 className="mt-6 text-[56px] leading-[1.25] font-bold tracking-tight">
            같은 기회도
            <br />
            <span className="text-ink-muted/70">사람마다 다르게 보여야 하니까</span>
          </h1>
          <p className="text-ink-muted mt-6 text-base leading-relaxed">
            지금 바로 지원할 곳이 필요한 사람, 앞으로를 준비하는 사람, 그냥 둘러보고 싶은 사람
            <br />
            Finder는 처음에 목적을 묻고, 그에 맞게 홈 화면과 보는 방식을 바꿔요.
          </p>
          <Link to="/home" className="mt-9 inline-block">
            <Button size="lg">내 목적 고르고 시작하기</Button>
          </Link>
        </div>

        <div data-reveal>
          <div className="bg-page mt-14 rounded-3xl p-10">
            <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto_1fr]">
              <div className="bg-surface rounded-2xl p-7">
                <Eyebrow>처음 한 번만 물어봐요</Eyebrow>
                <h2 className="mt-4 text-xl leading-snug font-bold">
                  Finder를 어떤 목적으로
                  <br />
                  쓰실 건가요?
                </h2>
                <ul className="mt-5">
                  {purposeOptions.map((option, index) => (
                    <li
                      key={option.title}
                      className={cn(
                        'flex items-center justify-between py-4',
                        index > 0 && 'border-line border-t',
                      )}
                    >
                      <div>
                        <p
                          className={cn(
                            'text-sm font-semibold',
                            index === 0 ? 'text-primary' : 'text-ink',
                          )}
                        >
                          {option.title}
                        </p>
                        <p className="text-ink-muted mt-1 text-xs">{option.desc}</p>
                      </div>
                      <span
                        className={cn(
                          'flex size-5 shrink-0 items-center justify-center rounded-full',
                          index === 0 ? 'bg-primary text-white' : 'border-line border',
                        )}
                        aria-hidden
                      >
                        {index === 0 && <Check size={12} strokeWidth={3} />}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="text-ink-muted flex flex-col items-center gap-2">
                <ChevronRight size={24} aria-hidden />
                <span className="text-xs">바로 바뀌어요</span>
              </div>

              <div className="bg-surface rounded-2xl p-7">
                <div className="flex items-center justify-between">
                  <Eyebrow>바로 지원 모드 홈</Eyebrow>
                  <span className="text-ink-muted text-xs">마감 순 정렬</span>
                </div>
                <h2 className="mt-4 text-xl font-bold">시우님이 지금 지원할 수 있는 기회 4개</h2>
                <p className="bg-warning-soft text-warning mt-5 rounded-lg px-4 py-3 text-xs">
                  3일 안에 마감되는 기회가 2개 있어요. 맨 위에 올려뒀어요.
                </p>
                <ul className="mt-2">
                  {previewOpportunities.map((item, index) => (
                    <li
                      key={item.title}
                      className={cn(
                        'flex items-center gap-4 py-4',
                        index > 0 && 'border-line border-t',
                      )}
                    >
                      <div className="min-w-0 flex-1">
                        <Badge>{item.category}</Badge>
                        <p className="mt-2 truncate text-sm font-bold">{item.title}</p>
                        <p className="text-ink-muted mt-1 truncate text-xs">
                          {item.org} · {item.due}
                        </p>
                      </div>
                      <span
                        className={cn(
                          'text-sm font-bold',
                          item.urgent ? 'text-danger' : 'text-primary',
                        )}
                      >
                        {item.dday}
                      </span>
                      <Button size="sm">지원하기</Button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

function Steps() {
  return (
    <section id="intro" className="bg-surface py-24">
      <Reveal>
        <Container>
          <Eyebrow>이용 흐름</Eyebrow>
          <h2 className="mt-5 text-4xl font-bold">세 단계면 나에게 맞는 홈이 돼요</h2>
          <p className="text-ink-muted mt-4">
            가입하고 처음 한 번만 고르면 돼요. 마음이 바뀌면 MY에서 언제든 다시 골라요.
          </p>

          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => (
              <li key={step.no} data-reveal className="bg-page flex flex-col rounded-2xl p-7">
                <p className="text-primary text-sm font-bold">{step.no}</p>
                <h3 className="mt-4 text-lg font-bold">{step.title}</h3>
                <p className="text-ink-muted mt-3 text-sm leading-relaxed">{step.desc}</p>
                <p className="text-ink-muted mt-auto pt-12 text-xs font-semibold">{step.meta}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Reveal>
    </section>
  )
}

function Modes() {
  return (
    <section id="modes" className="py-24">
      <Reveal>
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <Eyebrow>목적별 이용</Eyebrow>
            <h2 className="mt-5 text-4xl leading-snug font-bold">
              처음에 목적부터
              <br />
              물어봐요
            </h2>
            <p className="text-ink-muted mt-5 text-sm leading-relaxed">
              기능은 같아도 쓰는 이유는 사람마다 달라요.
              <br />
              고른 목적에 따라 홈에서 먼저 보이는 것이 바뀌고,
              <br />
              언제든 다시 고를 수 있어요.
            </p>
          </div>

          <ul className="grid gap-5 sm:grid-cols-2">
            {modes.map((mode, index) => (
              <li
                key={mode.no}
                data-reveal
                className={cn('bg-surface rounded-2xl p-7', index === 1 && 'sm:mt-10')}
              >
                <p className="text-ink-muted text-sm font-semibold">{mode.no}</p>
                <h3 className="mt-3 text-xl font-bold">{mode.title}</h3>
                <p className="text-ink-muted mt-2 text-sm">{mode.subtitle}</p>
                <ul className="mt-6 space-y-3">
                  {mode.items.map((item) => (
                    <li key={item} className="text-ink-muted flex gap-2 text-sm">
                      <span className="text-line">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </Container>
      </Reveal>
    </section>
  )
}

function Comparison() {
  return (
    <section className="bg-surface py-24">
      <Reveal>
        <Container>
          <Eyebrow>같은 기회, 다른 모습</Eyebrow>
          <h2 className="mt-5 text-4xl leading-snug font-bold">
            광주 청소년 AI 캠프는
            <br />
            이렇게 다르게 보여요
          </h2>
          <p className="text-ink-muted mt-5 text-sm">
            정보는 같아요. 무엇을 먼저 보여줄지만 목적에 맞게 바꿔요.
          </p>

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            <div data-reveal className="bg-page rounded-2xl p-6">
              <h3 className="font-bold">바로 지원 모드</h3>
              <p className="text-ink-muted mt-1 text-xs">마감과 지원 버튼이 먼저</p>
              <div className="bg-surface mt-5 rounded-xl p-5">
                <div className="flex items-start justify-between">
                  <Badge>교육</Badge>
                  <span className="text-danger text-lg font-bold">D-7</span>
                </div>
                <p className="mt-3 text-sm font-bold">광주 청소년 AI 캠프</p>
                <p className="text-ink-muted mt-1 text-xs">10월 8일 마감 · 신청서 1장</p>
                <Button className="mt-4 w-full">지원하기</Button>
              </div>
            </div>

            <div data-reveal className="bg-page rounded-2xl p-6">
              <h3 className="font-bold">준비 모드</h3>
              <p className="text-ink-muted mt-1 text-xs">내 조건과 할 일이 먼저</p>
              <div className="bg-surface mt-5 rounded-xl p-5">
                <p className="text-sm font-bold">광주 청소년 AI 캠프</p>
                <ul className="mt-4 space-y-2">
                  {conditions.map((condition) => (
                    <li key={condition.label} className="flex justify-between text-xs">
                      <span className="text-ink-muted">{condition.label}</span>
                      <span className="text-success font-semibold">충족</span>
                    </li>
                  ))}
                </ul>
                <p className="text-primary mt-4 text-xs font-semibold">
                  준비할 것 없이 바로 지원할 수 있어요
                </p>
              </div>
            </div>

            <div data-reveal className="bg-page rounded-2xl p-6">
              <h3 className="font-bold">간단히 보기</h3>
              <p className="text-ink-muted mt-1 text-xs">세 줄과 큰 글씨</p>
              <div className="bg-surface mt-5 rounded-xl p-5">
                <p className="text-sm font-bold">광주 청소년 AI 캠프</p>
                <dl className="mt-4 space-y-2">
                  {summaryRows.map((row) => (
                    <div key={row.label} className="flex gap-4 text-xs">
                      <dt className="text-ink-muted w-10 shrink-0">{row.label}</dt>
                      <dd className="font-semibold">{row.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </Container>
      </Reveal>
    </section>
  )
}

function Stats() {
  return (
    <section className="bg-surface pb-24">
      <Reveal>
        <Container className="grid items-center gap-12 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <h2 className="text-4xl leading-snug font-bold">
              보는 방식도
              <br />
              편한 대로
            </h2>
            <p className="text-ink-muted mt-5 text-sm leading-relaxed">
              같은 정보라도 세 줄 요약이 편한 사람, 전부 봐야 마음이 놓이는 사람이 있어요. 글자
              크기와 알림 양도 직접 정해요.
            </p>
          </div>

          <dl className="grid grid-cols-3 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} data-reveal>
                <dd className="text-6xl font-bold">
                  <span data-count>{stat.value}</span>
                  <span className="ml-1 text-xl">{stat.unit}</span>
                </dd>
                <dt className="text-ink-muted mt-3 text-sm">{stat.label}</dt>
              </div>
            ))}
          </dl>
        </Container>
      </Reveal>
    </section>
  )
}

function Personas() {
  return (
    <section id="my-path" className="py-24">
      <Reveal>
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <Eyebrow>이런 분들이 써요</Eyebrow>
            <h2 className="mt-5 text-4xl leading-snug font-bold">
              같은 앱,
              <br />
              다른 하루
            </h2>
            <p className="text-ink-muted mt-5 text-sm">예시로 보는 세 사람의 사용 모습이에요.</p>
          </div>

          <ul className="space-y-5">
            {personas.map((persona) => (
              <li key={persona.tag} data-reveal className="bg-surface rounded-2xl p-7">
                <p className="text-primary text-xs font-bold">{persona.tag}</p>
                <h3 className="mt-2 text-xl font-bold">{persona.title}</h3>
                <p className="text-ink-muted mt-3 text-sm leading-relaxed">{persona.desc}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Reveal>
    </section>
  )
}

function Philosophy() {
  return (
    <section className="bg-surface py-28">
      <Reveal>
        <Container>
          <h2 className="text-5xl leading-[1.3] font-bold tracking-tight">
            기능을 더 늘리기보다,
            <br />
            <span className="text-ink-muted/70">쓰는 사람에게 맞추는 것.</span>
          </h2>
          <p className="text-ink-muted mt-7 text-base">
            사용자가 서비스에 맞추는 대신, 서비스가 사용자의 목적과 상황에 맞춰 달라지도록
            만들었어요.
          </p>
        </Container>
      </Reveal>
    </section>
  )
}

function Faq() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section id="faq" className="py-24">
      <Reveal>
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <Eyebrow>자주 묻는 질문</Eyebrow>
            <h2 className="mt-5 text-4xl leading-snug font-bold">
              궁금한 점이
              <br />
              있으신가요?
            </h2>
          </div>

          <ul className="bg-surface rounded-2xl px-7">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index
              return (
                <li key={faq.q} className={cn(index > 0 && 'border-line border-t')}>
                  <h3>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setOpenIndex(isOpen ? -1 : index)}
                      className="flex w-full items-center justify-between gap-4 py-6 text-left text-sm font-bold"
                    >
                      {faq.q}
                      <span className="text-ink-muted shrink-0" aria-hidden>
                        {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                      </span>
                    </button>
                  </h3>
                  <div
                    aria-hidden={!isOpen}
                    className={cn(
                      'grid transition-[grid-template-rows] duration-300 ease-out',
                      isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
                    )}
                  >
                    <p className="text-ink-muted overflow-hidden text-sm leading-relaxed">
                      <span className={cn('block pb-6', isOpen ? '-mt-2' : 'mt-0')}>{faq.a}</span>
                    </p>
                  </div>
                </li>
              )
            })}
          </ul>
        </Container>
      </Reveal>
    </section>
  )
}

function Cta() {
  return (
    <section className="bg-surface py-28 text-center">
      <Reveal>
        <Container>
          <h2 className="text-4xl leading-snug font-bold">
            지금의 나에게 맞는
            <br />
            Finder를 만들어보세요
          </h2>
          <Link to="/home" className="mt-10 inline-block">
            <Button size="lg">무료로 시작하기</Button>
          </Link>
          <p className="text-ink-muted mt-5 text-xs">앱과 웹이 같은 설정을 써요</p>
        </Container>
      </Reveal>
    </section>
  )
}

function Footer() {
  return (
    <footer className="py-10">
      <Container className="flex flex-wrap items-center justify-between gap-4">
        <p className="text-ink-muted font-bold">Finder</p>
        <p className="text-ink-muted text-xs">이용약관 · 개인정보처리방침 · 문의하기</p>
      </Container>
    </footer>
  )
}

export default function LandingPage() {
  const motionRoot = usePageMotion()

  return (
    <div ref={motionRoot} className="motion-root min-h-screen">
      <div className="scroll-progress" aria-hidden />
      <LandingHeader />
      <main>
        <Hero />
        <Steps />
        <Modes />
        <Comparison />
        <Stats />
        <Personas />
        <Philosophy />
        <Faq />
        <Cta />
      </main>
      <Footer />
    </div>
  )
}
