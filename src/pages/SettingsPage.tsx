import { Check, ChevronRight, Plus } from 'lucide-react'
import { useState } from 'react'
import Badge from '@/components/ui/Badge'
import Card from '@/components/ui/Card'
import SegmentedControl from '@/components/ui/SegmentedControl'
import { cn } from '@/lib/cn'
import {
  useSettingsStore,
  type FontSize,
  type Purpose,
  type ViewMode,
} from '@/stores/useSettingsStore'

const menuItems = [
  { label: '계정', active: false },
  { label: '프로필', active: false },
  { label: '이용 방식', active: true },
  { label: '알림', active: false },
  { label: '함께 보기', active: false },
]

const purposes: { value: Purpose; label: string; description: string }[] = [
  { value: 'apply', label: '바로 지원', description: '마감 임박·지금 가능한 기회부터' },
  { value: 'prepare', label: '준비', description: '할 일과 준비하면 열리는 기회부터' },
  { value: 'browse', label: '둘러보기', description: '오늘 하나와 분야별 목록' },
]

const previewClass: Record<FontSize, { title: string; description: string }> = {
  base: { title: 'text-base', description: 'text-sm' },
  large: { title: 'text-lg', description: 'text-base' },
  xlarge: { title: 'text-xl', description: 'text-lg' },
}

interface ToggleRowProps {
  id: string
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
}

function ToggleRow({ id, label, checked, onChange }: ToggleRowProps) {
  return (
    <div className="flex items-center justify-between gap-4 py-5">
      <label htmlFor={id} className="text-sm font-semibold">
        {label}
      </label>
      <input
        id={id}
        type="checkbox"
        role="switch"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="peer sr-only"
      />
      <label
        htmlFor={id}
        aria-hidden
        className={cn(
          'flex h-7 w-12 shrink-0 cursor-pointer items-center rounded-full p-1 transition-colors',
          'peer-focus-visible:outline-primary peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2',
          checked ? 'bg-primary' : 'bg-line',
        )}
      >
        <span
          className={cn(
            'block size-5 rounded-full bg-white transition-transform',
            checked && 'translate-x-5',
          )}
        />
      </label>
    </div>
  )
}

export default function SettingsPage() {
  const purpose = useSettingsStore((state) => state.purpose)
  const setPurpose = useSettingsStore((state) => state.setPurpose)
  const viewMode = useSettingsStore((state) => state.viewMode)
  const setViewMode = useSettingsStore((state) => state.setViewMode)
  const fontSize = useSettingsStore((state) => state.fontSize)
  const setFontSize = useSettingsStore((state) => state.setFontSize)

  const [deadlineAlarm, setDeadlineAlarm] = useState(true)
  const [newOpportunityAlarm, setNewOpportunityAlarm] = useState(false)

  const preview = previewClass[fontSize]

  return (
    <div>
      <h1 className="text-4xl font-bold">설정</h1>
      <p className="text-ink-muted mt-3 text-sm">
        앱과 웹이 같은 설정을 써요. 바꾸면 바로 홈 화면에 반영돼요.
      </p>

      <div className="mt-10 grid gap-6 lg:grid-cols-[220px_1fr]">
        <nav aria-label="설정 메뉴">
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.label}>
                {item.active ? (
                  <span
                    aria-current="page"
                    className="bg-surface block rounded-xl px-6 py-3 text-sm font-bold"
                  >
                    {item.label}
                  </span>
                ) : (
                  <button
                    type="button"
                    disabled
                    className="text-ink-muted block w-full cursor-not-allowed rounded-xl px-6 py-3 text-left text-sm"
                  >
                    {item.label}
                  </button>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="space-y-6">
          <Card className="p-7">
            <h2 className="text-lg font-bold">이용 목적</h2>
            <p className="text-ink-muted mt-1 text-xs">
              고른 목적에 따라 홈에서 먼저 보이는 것이 달라져요.
            </p>

            <fieldset className="mt-5">
              <legend className="sr-only">이용 목적</legend>
              {purposes.map((item, index) => {
                const isSelected = purpose === item.value
                return (
                  <label
                    key={item.value}
                    className={cn(
                      'flex cursor-pointer items-center justify-between gap-4 py-5',
                      index > 0 && 'border-line border-t',
                    )}
                  >
                    <span>
                      <span
                        className={cn(
                          'block text-sm font-bold',
                          isSelected ? 'text-primary' : 'text-ink',
                        )}
                      >
                        {item.label}
                      </span>
                      <span className="text-ink-muted mt-1 block text-xs">{item.description}</span>
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
                        'flex size-6 shrink-0 items-center justify-center rounded-full',
                        'peer-focus-visible:outline-primary peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2',
                        isSelected ? 'bg-primary text-white' : 'border-line border',
                      )}
                      aria-hidden
                    >
                      {isSelected && <Check size={14} strokeWidth={3} />}
                    </span>
                  </label>
                )
              })}
            </fieldset>
          </Card>

          <Card className="p-7">
            <h2 className="text-lg font-bold">보는 방식과 글자 크기</h2>
            <p className="text-ink-muted mt-1 text-xs">같은 정보라도 편한 방식으로 볼 수 있어요.</p>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <div>
                <p className="text-sm font-semibold">보기 방식</p>
                <SegmentedControl<ViewMode>
                  label="보기 방식"
                  value={viewMode}
                  onChange={setViewMode}
                  className="mt-3 w-full"
                  options={[
                    { value: 'simple', label: '간단히' },
                    { value: 'detail', label: '자세히' },
                  ]}
                />
                <p className="text-ink-muted mt-3 text-xs">
                  간단히: 누가·언제·어떻게 세 줄과 내 조건만 보여요.
                </p>
              </div>

              <div>
                <p className="text-sm font-semibold">글자 크기</p>
                <SegmentedControl<FontSize>
                  label="글자 크기"
                  value={fontSize}
                  onChange={setFontSize}
                  className="mt-3 w-full"
                  options={[
                    { value: 'base', label: '기본' },
                    { value: 'large', label: '크게' },
                    { value: 'xlarge', label: '아주 크게' },
                  ]}
                />
                <div className="bg-chip mt-3 rounded-xl px-5 py-4">
                  <p className={cn('font-bold', preview.title)}>광주 청소년 AI 캠프</p>
                  <p className={cn('text-ink-muted mt-1', preview.description)}>
                    10월 8일까지 신청서 1장 내기
                  </p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-7">
            <h2 className="text-lg font-bold">알림</h2>
            <p className="text-ink-muted mt-1 text-xs">
              필요한 만큼만 받아요. 조용한 시간에는 보내지 않아요.
            </p>

            <div className="mt-3">
              <ToggleRow
                id="deadline-alarm"
                label="마감 임박 알림"
                checked={deadlineAlarm}
                onChange={setDeadlineAlarm}
              />
              <div className="border-line border-t">
                <ToggleRow
                  id="new-opportunity-alarm"
                  label="새 기회 알림"
                  checked={newOpportunityAlarm}
                  onChange={setNewOpportunityAlarm}
                />
              </div>
              <div className="border-line flex items-center justify-between gap-4 border-t py-5">
                <p className="text-sm font-semibold">조용한 시간</p>
                <p className="text-ink-muted flex items-center gap-2 text-sm">
                  22:00~08:00
                  <ChevronRight size={16} aria-hidden />
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-7">
            <h2 className="text-lg font-bold">함께 보기</h2>
            <p className="text-ink-muted mt-1 text-xs">
              보호자·선생님과 연결하면 저장한 기회와 마감일만 공유돼요. 프로필과 활동 기록은
              공유되지 않아요.
            </p>

            <div className="mt-3">
              <div className="flex items-center gap-4 py-5">
                <span className="bg-chip block size-10 shrink-0 rounded-full" aria-hidden />
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-bold">보호자 1명 연결됨</span>
                  <span className="text-ink-muted mt-1 block text-xs">
                    저장한 기회와 마감일만 볼 수 있어요
                  </span>
                </span>
                <Badge>보기 전용</Badge>
              </div>
              <div className="border-line border-t pt-5">
                <button
                  type="button"
                  className="text-primary inline-flex items-center gap-2 text-sm font-bold"
                >
                  <Plus size={16} aria-hidden />
                  초대 링크 만들기
                </button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
