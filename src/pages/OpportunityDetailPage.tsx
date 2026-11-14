import { useState } from 'react'
import { Check, Globe, Mail, Phone } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import SegmentedControl from '@/components/ui/SegmentedControl'
import { findOpportunity, opportunities } from '@/data/opportunities'
import { cn } from '@/lib/cn'
import { useSettingsStore, type ViewMode } from '@/stores/useSettingsStore'

const tabs = ['상세 정보', '지원 자격', '일정', '문의처'] as const

const myConditions = ['나이 · 만 17세', '거주 지역 · 광주', '학년 · 고등학생', '관심 분야 · AI']

const contactIcons = {
  phone: Phone,
  email: Mail,
  site: Globe,
}

export default function OpportunityDetailPage() {
  const { id } = useParams()
  const opportunity = id ? findOpportunity(id) : undefined
  const viewMode = useSettingsStore((state) => state.viewMode)
  const setViewMode = useSettingsStore((state) => state.setViewMode)
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>('상세 정보')

  if (!opportunity) {
    return (
      <div>
        <h1 className="text-2xl font-bold">기회를 찾을 수 없어요</h1>
        <Link to="/explore" className="text-primary mt-4 inline-block text-sm font-bold">
          기회 탐색으로 돌아가기 ›
        </Link>
      </div>
    )
  }

  const detail = opportunity.detail
  const metCount = myConditions.length - opportunity.missingConditions
  const similar = opportunities.filter((item) => item.id !== opportunity.id).slice(0, 2)

  return (
    <div>
      <nav aria-label="현재 위치" className="text-ink-muted text-sm">
        <Link to="/explore" className="hover:text-ink">
          탐색
        </Link>
        <span className="mx-2">›</span>
        <span>{opportunity.category}</span>
        <span className="mx-2">›</span>
        <span className="text-ink">{opportunity.title}</span>
      </nav>

      <div className="mt-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge>{opportunity.category}</Badge>
            {detail?.tags.map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
            {opportunity.missingConditions === 0 && <Badge tone="success">지원 가능</Badge>}
          </div>
          <h1 className="mt-3 text-4xl font-bold">{opportunity.title}</h1>
          <p className="text-ink-muted mt-2 text-sm">
            {opportunity.org} · {detail?.period ?? `${opportunity.dueDate} 마감`}
          </p>
        </div>

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

      <div className="border-line mt-8 flex gap-8 border-b" role="tablist" aria-label="기회 상세">
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            role="tab"
            aria-selected={activeTab === tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              '-mb-px border-b-2 pb-3 text-sm font-bold transition-colors',
              activeTab === tab
                ? 'border-ink text-ink'
                : 'text-ink-muted hover:text-ink border-transparent',
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <div className="space-y-6" role="tabpanel">
          {activeTab === '상세 정보' && (
            <Card>
              <h2 className="text-lg font-bold">모집 개요</h2>
              <dl className="mt-5">
                {(
                  detail?.overview ?? [
                    { label: '누가', value: opportunity.summary.who },
                    { label: '언제', value: opportunity.summary.when },
                    { label: '어떻게', value: opportunity.summary.how },
                  ]
                ).map((row) => (
                  <div key={row.label} className="flex gap-6 py-3">
                    <dt className="text-ink-muted w-24 shrink-0 text-sm">{row.label}</dt>
                    <dd className="text-sm font-semibold">{row.value}</dd>
                  </div>
                ))}
              </dl>
            </Card>
          )}

          {activeTab === '지원 자격' && (
            <Card>
              <h2 className="text-lg font-bold">지원 자격</h2>
              <p className="mt-4 text-sm font-semibold">{opportunity.summary.who}</p>
              <ul className="mt-5">
                {myConditions.map((condition, index) => {
                  const met = index < metCount
                  return (
                    <li
                      key={condition}
                      className={cn(
                        'flex items-center justify-between py-3',
                        index > 0 && 'border-line border-t',
                      )}
                    >
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
            </Card>
          )}

          {(activeTab === '상세 정보' || activeTab === '일정') && detail && (
            <Card>
              <h2 className="text-lg font-bold">프로그램</h2>
              <ul className="mt-5">
                {detail.program.map((item, index) => (
                  <li
                    key={item.day}
                    className={cn('flex gap-8 py-4', index > 0 && 'border-line border-t')}
                  >
                    <span className="text-primary w-12 shrink-0 text-sm font-bold">{item.day}</span>
                    <span>
                      <span className="block text-sm font-bold">{item.title}</span>
                      <span className="text-ink-muted mt-1 block text-xs">{item.desc}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </Card>
          )}

          {activeTab === '일정' && !detail && (
            <Card>
              <h2 className="text-lg font-bold">일정</h2>
              <p className="mt-4 text-sm font-semibold">{opportunity.summary.when}</p>
            </Card>
          )}

          {(activeTab === '상세 정보' || activeTab === '문의처') && (
            <Card>
              <h2 className="text-lg font-bold">문의처</h2>
              <ul className="mt-5">
                {(detail?.contacts ?? [{ type: 'site' as const, value: opportunity.org }]).map(
                  (contact, index) => {
                    const Icon = contactIcons[contact.type]
                    return (
                      <li
                        key={contact.value}
                        className={cn(
                          'flex items-center gap-4 py-4',
                          index > 0 && 'border-line border-t',
                        )}
                      >
                        <Icon size={16} className="text-ink-muted shrink-0" aria-hidden />
                        <span className="flex-1 text-sm">{contact.value}</span>
                        <span className="text-ink-muted" aria-hidden>
                          ›
                        </span>
                      </li>
                    )
                  },
                )}
              </ul>
            </Card>
          )}
        </div>

        <div className="space-y-5">
          <Card>
            <p className="flex items-baseline gap-3">
              <span className="text-danger text-3xl font-bold">D-{opportunity.dday}</span>
              <span className="text-ink-muted text-sm">{opportunity.summary.how}</span>
            </p>
            <Button size="lg" className="mt-5 w-full">
              신청하러 가기
            </Button>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <Button variant="secondary" size="lg">
                저장
              </Button>
              <Button variant="secondary" size="lg">
                공유
              </Button>
            </div>
            {detail && <p className="text-ink-muted mt-4 text-xs">{detail.applyNote}</p>}
          </Card>

          <Card>
            <h2 className="font-bold">
              내 조건{' '}
              <span className="text-primary">
                {metCount}/{myConditions.length}
              </span>
            </h2>
            <ul className="mt-4">
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
          </Card>

          <Card>
            <h2 className="font-bold">비슷한 기회</h2>
            <ul className="mt-4">
              {similar.map((item, index) => (
                <li key={item.id} className={cn('py-3', index > 0 && 'border-line border-t')}>
                  <Badge>{item.category}</Badge>
                  <div className="mt-2 flex items-center justify-between gap-3">
                    <Link
                      to={`/opportunities/${item.id}`}
                      className="truncate text-sm font-bold hover:underline"
                    >
                      {item.title}
                    </Link>
                    <span
                      className={cn(
                        'shrink-0 text-sm font-bold',
                        item.dday <= 3 ? 'text-danger' : 'text-primary',
                      )}
                    >
                      D-{item.dday}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </div>
  )
}
