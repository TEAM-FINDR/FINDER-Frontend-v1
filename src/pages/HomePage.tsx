import { ChevronRight, Clock, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import { opportunities } from '@/data/opportunities'
import { cn } from '@/lib/cn'
import { useSettingsStore, type Purpose } from '@/stores/useSettingsStore'

const modeLabels: Record<Purpose, string> = {
  apply: '바로 지원',
  prepare: '준비',
  browse: '둘러보기',
}

const monthlyGoal = {
  title: '포트폴리오 만들기',
  percent: 50,
  tasks: [
    { label: '관심 분야 고르기', done: true },
    { label: '프로젝트 정리', done: true },
    { label: '결과물 사진 올리기', done: false },
    { label: '자기소개 쓰기', done: false },
  ],
}

const todayTasks = [
  { label: '프로젝트 1개 정리하기', done: true, minutes: '' },
  { label: '결과물 사진 올리기', done: false, minutes: '10분' },
  { label: '자기소개 3줄 쓰기', done: false, minutes: '5분' },
]

const growthPoints = [
  { label: '지금', count: 29 },
  { label: '프로젝트 정리', count: 33 },
  { label: '사진 올리기', count: 37 },
  { label: '자기소개', count: 41 },
]

const unlockedOpportunities = [
  {
    category: '인턴',
    title: '테크 스타트업 여름 인턴십',
    condition: '포트폴리오 내면 지원 가능',
    dday: 14,
  },
  { category: '대회', title: '청소년 SW 해커톤', condition: '3인 팀을 만들면 지원 가능', dday: 9 },
  {
    category: '공모전',
    title: '공공데이터 활용 공모전',
    condition: '컴활 2급이 있으면 지원 가능',
    dday: 21,
  },
]

const savedOpportunities = opportunities.filter((item) =>
  ['highschool-app-hackathon', 'ai-sw-talent-program', 'gwangju-youth-ai-camp'].includes(item.id),
)

function Dday({ days }: { days: number }) {
  return (
    <span className={cn('text-sm font-bold', days <= 3 ? 'text-danger' : 'text-primary')}>
      D-{days}
    </span>
  )
}

function ModeSwitch() {
  const purpose = useSettingsStore((state) => state.purpose)
  const setPurpose = useSettingsStore((state) => state.setPurpose)

  return (
    <div className="flex items-center gap-3">
      <div className="bg-chip flex rounded-xl p-1" role="group" aria-label="이용 목적">
        {(Object.keys(modeLabels) as Purpose[]).map((mode) => (
          <button
            key={mode}
            type="button"
            aria-pressed={purpose === mode}
            onClick={() => setPurpose(mode)}
            className={cn(
              'rounded-lg px-4 py-2 text-sm font-semibold transition-colors',
              purpose === mode ? 'bg-surface text-ink' : 'text-ink-muted hover:text-ink',
            )}
          >
            {modeLabels[mode]}
          </button>
        ))}
      </div>
      <Link to="/my/settings">
        <Button variant="secondary" className="bg-surface gap-1.5">
          <Sparkles size={14} aria-hidden />홈 맞추기
        </Button>
      </Link>
    </div>
  )
}

function ApplyMode() {
  const applicable = opportunities.filter((item) => item.missingConditions === 0).slice(0, 4)
  const list = [...applicable, opportunities[5]]

  return (
    <div className="mt-8 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
      <Card className="p-0">
        <div className="flex items-center justify-between px-7 pt-7 pb-2">
          <h2 className="text-lg font-bold">
            지금 지원 가능 <span className="text-primary">{applicable.length}</span>
          </h2>
          <Link to="/explore" className="text-ink-muted hover:text-ink text-xs">
            전체 보기 ›
          </Link>
        </div>

        <ul className="px-7 pb-4">
          {list.map((item, index) => (
            <li
              key={item.id}
              className={cn('flex items-center gap-4 py-5', index > 0 && 'border-line border-t')}
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <Badge>{item.category}</Badge>
                  {item.missingConditions > 0 && (
                    <Badge tone="warning">조건 {item.missingConditions}개 부족</Badge>
                  )}
                </div>
                <p className="mt-2 truncate font-bold">
                  <Link to={`/opportunities/${item.id}`} className="hover:underline">
                    {item.title}
                  </Link>
                </p>
                <p className="text-ink-muted mt-1 truncate text-xs">{item.org}</p>
              </div>
              <span className="text-ink-muted shrink-0 text-xs">{item.dueDate} 마감</span>
              <Dday days={item.dday} />
              <Button variant={item.missingConditions > 0 ? 'secondary' : 'primary'}>
                {item.missingConditions > 0 ? '준비하기' : '지원하기'}
              </Button>
            </li>
          ))}
        </ul>
      </Card>

      <div className="space-y-5">
        <Card className="p-5">
          <Link to="/saved" className="flex items-center gap-4">
            <span className="bg-chip text-ink-muted flex size-10 shrink-0 items-center justify-center rounded-full">
              <Clock size={18} aria-hidden />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-sm font-bold">3일 안에 마감 2개</span>
              <span className="text-ink-muted mt-1 block truncate text-xs">
                청소년 디지털 봉사단 · 신청서만 내면 돼요
              </span>
            </span>
            <ChevronRight size={18} className="text-ink-muted shrink-0" aria-hidden />
          </Link>
        </Card>

        <Card>
          <h2 className="font-bold">작성 중인 지원서</h2>
          <p className="text-ink-muted mt-2 text-xs">광주 청소년 AI 캠프 · 3단계 중 2단계</p>
          <div className="bg-line mt-4 h-1.5 overflow-hidden rounded-full">
            <div className="bg-primary h-full w-2/3 rounded-full" />
          </div>
          <Link
            to="/opportunities/gwangju-youth-ai-camp"
            className="text-primary mt-4 inline-block text-xs font-bold"
          >
            이어서 작성하기 ›
          </Link>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <h2 className="font-bold">저장한 기회</h2>
            <Link to="/saved" className="text-ink-muted hover:text-ink text-xs">
              전체 ›
            </Link>
          </div>
          <ul className="mt-4">
            {savedOpportunities.map((item, index) => (
              <li
                key={item.id}
                className={cn(
                  'flex items-center justify-between gap-3 py-3',
                  index > 0 && 'border-line border-t',
                )}
              >
                <Link to={`/opportunities/${item.id}`} className="truncate text-sm hover:underline">
                  {item.title}
                </Link>
                <Dday days={item.dday} />
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  )
}

function GrowthChart() {
  const max = 44
  const min = 26
  const width = 640
  const height = 180
  const points = growthPoints.map((point, index) => ({
    ...point,
    x: (index * width) / (growthPoints.length - 1),
    y: height - ((point.count - min) / (max - min)) * height,
  }))

  return (
    <figure className="mt-6">
      <figcaption className="sr-only">준비 단계별로 열리는 기회 수</figcaption>
      <svg
        viewBox={`0 0 ${width} ${height + 40}`}
        className="h-auto w-full"
        role="img"
        aria-label="지금 29개에서 자기소개까지 끝내면 41개로 늘어나요"
      >
        {[0, 1, 2].map((line) => (
          <line
            key={line}
            x1="0"
            x2={width}
            y1={(line * height) / 2}
            y2={(line * height) / 2}
            stroke="var(--color-line)"
          />
        ))}
        <polyline
          points={points.map((point) => `${point.x},${point.y}`).join(' ')}
          fill="none"
          stroke="var(--color-primary)"
          strokeWidth="2"
        />
        {points.map((point) => (
          <g key={point.label}>
            <circle
              cx={point.x}
              cy={point.y}
              r="4"
              fill="white"
              stroke="var(--color-primary)"
              strokeWidth="2"
            />
            <text
              x={point.x}
              y={point.y - 14}
              textAnchor="middle"
              className="fill-ink text-[13px] font-bold"
            >
              {point.count}개
            </text>
            <text
              x={point.x}
              y={height + 30}
              textAnchor="middle"
              className="fill-ink-muted text-[12px]"
            >
              {point.label}
            </text>
          </g>
        ))}
      </svg>
    </figure>
  )
}

function PrepareMode() {
  return (
    <div className="mt-8 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
      <div className="space-y-6">
        <div className="bg-primary-soft rounded-2xl p-7">
          <p className="text-primary text-sm font-bold">이번 달 목표</p>
          <div className="mt-2 flex items-end justify-between">
            <h2 className="text-2xl font-bold">{monthlyGoal.title}</h2>
            <p className="text-primary text-2xl font-bold">{monthlyGoal.percent}%</p>
          </div>
          <div
            className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/70"
            role="progressbar"
            aria-valuenow={monthlyGoal.percent}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="이번 달 목표 진행률"
          >
            <div
              className="bg-primary h-full rounded-full"
              style={{ width: `${monthlyGoal.percent}%` }}
            />
          </div>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {monthlyGoal.tasks.map((task) => (
              <li
                key={task.label}
                className="bg-surface flex items-center gap-2 rounded-xl px-4 py-3 text-xs font-semibold"
              >
                <span
                  className={cn(
                    'flex size-4 shrink-0 items-center justify-center rounded-full text-[9px] text-white',
                    task.done ? 'bg-primary' : 'border-line border',
                  )}
                  aria-hidden
                >
                  {task.done && '✓'}
                </span>
                <span className={cn('truncate', !task.done && 'text-ink-muted')}>{task.label}</span>
              </li>
            ))}
          </ul>
        </div>

        <Card>
          <h2 className="text-lg font-bold">준비할수록 늘어나는 기회</h2>
          <p className="text-ink-muted mt-1 text-xs">지금 29개 → 목표를 끝내면 41개</p>
          <GrowthChart />
        </Card>
      </div>

      <div className="space-y-5">
        <Card>
          <h2 className="font-bold">
            오늘 할 일 <span className="text-primary">2</span>
          </h2>
          <ul className="mt-4">
            {todayTasks.map((task, index) => (
              <li
                key={task.label}
                className={cn('flex items-center gap-3 py-3', index > 0 && 'border-line border-t')}
              >
                <span
                  className={cn(
                    'flex size-5 shrink-0 items-center justify-center rounded-full text-[10px] text-white',
                    task.done ? 'bg-primary' : 'border-line border',
                  )}
                  aria-hidden
                >
                  {task.done && '✓'}
                </span>
                <span className={cn('flex-1 truncate text-sm', task.done && 'text-ink-muted')}>
                  {task.label}
                </span>
                {task.minutes && <span className="text-ink-muted text-xs">{task.minutes}</span>}
              </li>
            ))}
          </ul>
        </Card>

        <Card>
          <h2 className="font-bold">준비하면 열리는 기회</h2>
          <ul className="mt-4">
            {unlockedOpportunities.map((item, index) => (
              <li key={item.title} className={cn('py-4', index > 0 && 'border-line border-t')}>
                <Badge>{item.category}</Badge>
                <div className="mt-2 flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold">{item.title}</p>
                    <p className="text-warning mt-1 truncate text-xs">{item.condition}</p>
                  </div>
                  <Dday days={item.dday} />
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  )
}

export default function HomePage() {
  const purpose = useSettingsStore((state) => state.purpose)

  return (
    <div>
      <p className="text-ink-muted flex items-center gap-2 text-sm">
        <span className="bg-primary size-1.5 rounded-full" aria-hidden />
        {modeLabels[purpose]} 모드
      </p>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-4xl font-bold">
          {purpose === 'prepare'
            ? '한 걸음씩 준비하면 12개가 더 열려요'
            : '시우님이 지금 지원할 수 있는 기회예요'}
        </h1>
        <ModeSwitch />
      </div>

      {purpose === 'prepare' ? <PrepareMode /> : <ApplyMode />}
    </div>
  )
}
