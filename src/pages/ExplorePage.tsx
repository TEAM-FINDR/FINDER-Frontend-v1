import { useMemo, useState } from 'react'
import { Bookmark, Check, Search, Share2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import SegmentedControl from '@/components/ui/SegmentedControl'
import { opportunities } from '@/data/opportunities'
import { cn } from '@/lib/cn'
import { useSettingsStore, type ViewMode } from '@/stores/useSettingsStore'

const categories = ['전체', '교육', '공모전', '장학금', '인턴', '봉사', '대회'] as const

const myConditions = ['나이 · 만 17세', '거주 지역 · 광주', '학년 · 고등학생', '관심 분야 · AI']

export default function ExplorePage() {
  const viewMode = useSettingsStore((state) => state.viewMode)
  const setViewMode = useSettingsStore((state) => state.setViewMode)
  const [keyword, setKeyword] = useState('')
  const [category, setCategory] = useState<(typeof categories)[number]>('전체')
  const [onlyMatching, setOnlyMatching] = useState(true)
  const [selectedId, setSelectedId] = useState(opportunities[3].id)

  const filtered = useMemo(() => {
    const text = keyword.trim()
    return opportunities.filter((item) => {
      if (category !== '전체' && item.category !== category) return false
      if (onlyMatching && item.missingConditions > 0) return false
      if (!text) return true
      return `${item.title} ${item.org} ${item.category}`.includes(text)
    })
  }, [keyword, category, onlyMatching])

  const selected = filtered.find((item) => item.id === selectedId) ?? filtered[0]
  const metCount = selected ? myConditions.length - selected.missingConditions : 0

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-4xl font-bold">기회 탐색</h1>
        <div className="flex items-center gap-3">
          <span className="text-ink-muted text-sm">보는 방식</span>
          <SegmentedControl<ViewMode>
            label="보는 방식"
            value={viewMode}
            onChange={setViewMode}
            options={[
              { value: 'simple', label: '간단히' },
              { value: 'detail', label: '자세히' },
            ]}
          />
        </div>
      </div>

      <Card className="mt-6 flex items-center gap-4 py-5">
        <Search size={18} className="text-ink-muted shrink-0" aria-hidden />
        <input
          type="search"
          value={keyword}
          onChange={(event) => setKeyword(event.target.value)}
          placeholder="공고명, 기관명, 분야로 검색해보세요"
          aria-label="기회 검색"
          className="placeholder:text-ink-muted min-w-0 flex-1 text-sm outline-none"
        />
        <label className="flex shrink-0 cursor-pointer items-center gap-3 text-sm">
          <span className="text-ink-muted">내 조건만</span>
          <input
            type="checkbox"
            checked={onlyMatching}
            onChange={(event) => setOnlyMatching(event.target.checked)}
            className="peer sr-only"
          />
          <span
            className={cn(
              'relative h-7 w-12 rounded-full transition-colors',
              'peer-focus-visible:outline-primary peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2',
              onlyMatching ? 'bg-primary' : 'bg-line',
            )}
            aria-hidden
          >
            <span
              className={cn(
                'absolute top-1 size-5 rounded-full bg-white transition-all',
                onlyMatching ? 'left-6' : 'left-1',
              )}
            />
          </span>
        </label>
      </Card>

      <div className="mt-5 flex flex-wrap gap-2">
        {categories.map((item) => (
          <button
            key={item}
            type="button"
            aria-pressed={category === item}
            onClick={() => setCategory(item)}
            className={cn(
              'rounded-full px-4 py-2 text-sm font-semibold transition-colors',
              category === item ? 'bg-primary text-white' : 'bg-surface text-ink-muted',
            )}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card className="p-0">
          <p className="text-ink-muted px-7 pt-7 pb-3 text-xs">
            지금 지원 가능 {filtered.length}개 · 마감 순
          </p>
          {filtered.length === 0 ? (
            <p className="text-ink-muted px-7 pb-7 text-sm">조건에 맞는 기회가 없어요.</p>
          ) : (
            <ul className="pb-4">
              {filtered.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    aria-pressed={selected?.id === item.id}
                    onClick={() => setSelectedId(item.id)}
                    className={cn(
                      'flex w-full items-center gap-4 px-7 py-4 text-left transition-colors',
                      selected?.id === item.id ? 'bg-chip' : 'hover:bg-page',
                    )}
                  >
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center gap-2">
                        <Badge>{item.category}</Badge>
                        {item.missingConditions > 0 ? (
                          <Badge tone={item.missingConditions > 1 ? 'danger' : 'warning'}>
                            조건 {item.missingConditions}개 부족
                          </Badge>
                        ) : (
                          <Badge tone="success">지원 가능</Badge>
                        )}
                      </span>
                      <span className="mt-2 block truncate text-sm font-bold">{item.title}</span>
                      <span className="text-ink-muted mt-1 block truncate text-xs">
                        {item.org} · {item.dueDate} 마감
                      </span>
                    </span>
                    <span
                      className={cn(
                        'shrink-0 text-sm font-bold',
                        item.dday <= 3 ? 'text-danger' : 'text-primary',
                      )}
                    >
                      D-{item.dday}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </Card>

        {selected && (
          <Card key={selected.id} className="animate-fade-up h-fit">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-2">
                <Badge>{selected.category}</Badge>
                {selected.missingConditions === 0 && <Badge tone="success">지원 가능</Badge>}
              </div>
              <div className="text-ink-muted flex shrink-0 gap-3">
                <button type="button" aria-label="저장">
                  <Bookmark size={18} />
                </button>
                <button type="button" aria-label="공유">
                  <Share2 size={18} />
                </button>
              </div>
            </div>

            <h2 className="mt-4 text-2xl font-bold">{selected.title}</h2>
            <p className="text-ink-muted mt-2 text-xs">
              {selected.org} · {selected.dueDate} 마감 · D-{selected.dday}
            </p>

            <dl className="bg-chip mt-6 rounded-xl px-6 py-2">
              {(
                [
                  ['누가', selected.summary.who],
                  ['언제', selected.summary.when],
                  ['어떻게', selected.summary.how],
                ] as const
              ).map(([label, value], index) => (
                <div
                  key={label}
                  className={cn('flex gap-6 py-4', index > 0 && 'border-line border-t')}
                >
                  <dt className="text-ink-muted w-12 shrink-0 text-sm">{label}</dt>
                  <dd className="text-sm font-bold">{value}</dd>
                </div>
              ))}
            </dl>

            <h3 className="mt-6 font-bold">
              내 조건{' '}
              <span className="text-primary">
                {metCount}/{myConditions.length} 충족
              </span>
            </h3>
            <ul className="mt-3">
              {myConditions.map((condition, index) => {
                const met = index < metCount
                return (
                  <li key={condition} className="flex items-center justify-between py-2">
                    <span className="text-sm">{condition}</span>
                    <span
                      className={cn(
                        'flex items-center gap-1.5 text-sm font-semibold',
                        met ? 'text-success' : 'text-warning',
                      )}
                    >
                      {met && <Check size={14} aria-hidden />}
                      {met ? '충족' : '미충족'}
                    </span>
                  </li>
                )
              })}
            </ul>

            <div className="mt-6 flex gap-3">
              <Button variant="secondary" size="lg" className="px-8">
                저장
              </Button>
              <Link to={`/opportunities/${selected.id}`} className="flex-1">
                <Button size="lg" className="w-full">
                  신청하러 가기
                </Button>
              </Link>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}
