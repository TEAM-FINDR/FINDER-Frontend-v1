import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Card from '@/components/ui/Card'
import SegmentedControl from '@/components/ui/SegmentedControl'
import { opportunities } from '@/data/opportunities'
import { cn } from '@/lib/cn'

type CalendarView = 'list' | 'calendar'

const savedLabels: Record<string, string> = {
  'youth-digital-volunteer': '봉사단',
  'highschool-app-hackathon': '해커톤',
  'ai-sw-talent-program': 'AI·SW',
  'gwangju-youth-ai-camp': 'AI 캠프',
  'youth-startup-idea-contest': '창업 공모전',
}

const savedOpportunities = opportunities.filter((item) => item.id in savedLabels)

const deadlineYear = 2026
const today = { year: 2026, month: 10, day: 1 }
const weekdays = ['일', '월', '화', '수', '목', '금', '토']

const alarmOptions = [
  { id: 'before-3-days', label: '3일 전', initial: true },
  { id: 'before-1-day', label: '하루 전', initial: true },
  { id: 'due-morning', label: '당일 아침', initial: false },
]

function buildWeeks(year: number, month: number) {
  const cells: (number | null)[] = Array.from(
    { length: new Date(year, month - 1, 1).getDay() },
    () => null,
  )
  const lastDay = new Date(year, month, 0).getDate()
  for (let day = 1; day <= lastDay; day += 1) cells.push(day)
  while (cells.length % 7 !== 0) cells.push(null)

  const weeks: (number | null)[][] = []
  for (let index = 0; index < cells.length; index += 7) weeks.push(cells.slice(index, index + 7))
  return weeks
}

function formatDate(month: number, day: number) {
  return `${String(month).padStart(2, '0')}.${String(day).padStart(2, '0')}`
}

export default function SavedPage() {
  const [view, setView] = useState<CalendarView>('calendar')
  const [cursor, setCursor] = useState({ year: today.year, month: today.month })
  const [alarms, setAlarms] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(alarmOptions.map((option) => [option.id, option.initial])),
  )

  const moveMonth = (step: number) =>
    setCursor((prev) => {
      const next = new Date(prev.year, prev.month - 1 + step, 1)
      return { year: next.getFullYear(), month: next.getMonth() + 1 }
    })

  const weeks = buildWeeks(cursor.year, cursor.month)

  const deadlinesOf = (day: number) =>
    cursor.year === deadlineYear
      ? savedOpportunities.filter((item) => item.dueDate === formatDate(cursor.month, day))
      : []

  return (
    <div>
      <p className="text-ink-muted flex items-center gap-2 text-xs">
        <span className="bg-primary size-1.5 rounded-full" aria-hidden />
        저장한 기회 {savedOpportunities.length}개
      </p>

      <div className="mt-2 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-4xl font-bold">이번 달 마감 일정</h1>
        <SegmentedControl<CalendarView>
          label="보기 방식"
          value={view}
          onChange={setView}
          options={[
            { value: 'list', label: '목록' },
            { value: 'calendar', label: '달력' },
          ]}
        />
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-[1fr_380px]">
        {view === 'calendar' ? (
          <Card className="p-7">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">
                {cursor.year}년 {cursor.month}월
              </h2>
              <div className="text-ink-muted flex items-center gap-2">
                <button
                  type="button"
                  aria-label="이전 달"
                  onClick={() => moveMonth(-1)}
                  className="hover:text-ink transition-colors"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  type="button"
                  aria-label="다음 달"
                  onClick={() => moveMonth(1)}
                  className="hover:text-ink transition-colors"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>

            <table className="mt-6 w-full table-fixed border-separate border-spacing-0.5">
              <caption className="sr-only">
                {cursor.year}년 {cursor.month}월 마감 일정
              </caption>
              <thead>
                <tr>
                  {weekdays.map((weekday) => (
                    <th
                      key={weekday}
                      scope="col"
                      className="text-ink-muted pb-2 text-sm font-medium"
                    >
                      {weekday}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {weeks.map((week, weekIndex) => (
                  <tr key={weekIndex}>
                    {week.map((day, index) => (
                      <td
                        key={index}
                        className="hover:bg-page h-21 rounded-xl p-1.5 align-top transition-colors"
                      >
                        {day !== null && (
                          <>
                            <span
                              className={cn(
                                'text-sm font-bold',
                                index === 0 && 'text-danger',
                                cursor.year === today.year &&
                                  cursor.month === today.month &&
                                  day === today.day &&
                                  'text-primary',
                              )}
                            >
                              {day}
                            </span>
                            {deadlinesOf(day).map((item) => (
                              <span
                                key={item.id}
                                title={item.title}
                                className={cn(
                                  'mt-1.5 block w-fit max-w-full truncate rounded-md px-1.5 py-1 text-xs font-semibold',
                                  item.dday <= 3
                                    ? 'bg-danger/10 text-danger'
                                    : 'bg-primary-soft text-primary',
                                )}
                              >
                                {savedLabels[item.id]}
                              </span>
                            ))}
                          </>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        ) : (
          <Card className="p-7">
            <h2 className="font-bold">저장한 기회</h2>
            <ul className="mt-2">
              {savedOpportunities.map((item, index) => (
                <li
                  key={item.id}
                  className={cn(
                    'flex items-center gap-4 py-4',
                    index > 0 && 'border-line border-t',
                  )}
                >
                  <span className="text-ink-muted w-12 shrink-0 text-xs">{item.dueDate}</span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-bold">{item.title}</span>
                    <span className="text-ink-muted mt-1 block truncate text-xs">{item.org}</span>
                  </span>
                  <span
                    className={cn(
                      'shrink-0 text-sm font-bold',
                      item.dday <= 3 ? 'text-danger' : 'text-primary',
                    )}
                  >
                    D-{item.dday}
                  </span>
                </li>
              ))}
            </ul>
          </Card>
        )}

        <div className="flex flex-col gap-5">
          <Card>
            <h2 className="font-bold">다가오는 마감</h2>
            <ul className="mt-2">
              {savedOpportunities.map((item, index) => (
                <li
                  key={item.id}
                  className={cn(
                    'flex items-center gap-4 py-3.5',
                    index > 0 && 'border-line border-t',
                  )}
                >
                  <span className="text-ink-muted w-10 shrink-0 text-xs">{item.dueDate}</span>
                  <span className="min-w-0 flex-1 truncate text-sm font-bold">{item.title}</span>
                  <span
                    className={cn(
                      'shrink-0 text-sm font-bold',
                      item.dday <= 3 ? 'text-danger' : 'text-primary',
                    )}
                  >
                    D-{item.dday}
                  </span>
                </li>
              ))}
            </ul>
          </Card>

          <Card>
            <h2 className="font-bold">마감 알림</h2>
            <ul className="mt-2">
              {alarmOptions.map((option) => (
                <li key={option.id}>
                  <label className="flex cursor-pointer items-center justify-between py-3 text-sm">
                    <span>{option.label}</span>
                    <input
                      type="checkbox"
                      checked={alarms[option.id]}
                      onChange={(event) =>
                        setAlarms((prev) => ({ ...prev, [option.id]: event.target.checked }))
                      }
                      className="peer sr-only"
                    />
                    <span
                      className={cn(
                        'relative h-7 w-12 shrink-0 rounded-full transition-colors',
                        'peer-focus-visible:outline-primary peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2',
                        alarms[option.id] ? 'bg-primary' : 'bg-line',
                      )}
                      aria-hidden
                    >
                      <span
                        className={cn(
                          'absolute top-1 size-5 rounded-full bg-white transition-all',
                          alarms[option.id] ? 'left-6' : 'left-1',
                        )}
                      />
                    </span>
                  </label>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </div>
  )
}
