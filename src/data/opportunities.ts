export type OpportunityCategory = '교육' | '공모전' | '장학금' | '인턴' | '봉사' | '대회'

export interface Opportunity {
  id: string
  category: OpportunityCategory
  title: string
  org: string
  dueDate: string
  dday: number
  missingConditions: number
  region: string
  summary: { who: string; when: string; how: string }
}

export const opportunities: Opportunity[] = [
  {
    id: 'youth-digital-volunteer',
    category: '봉사',
    title: '청소년 디지털 봉사단',
    org: '광주광역시 자원봉사센터',
    dueDate: '10.03',
    dday: 2,
    missingConditions: 0,
    region: '광주',
    summary: {
      who: '광주에 사는 만 14~19세',
      when: '10월 중 주말 4회',
      how: '10월 3일까지 신청서 1장 내기',
    },
  },
  {
    id: 'highschool-app-hackathon',
    category: '대회',
    title: '전국 고교생 앱 개발 해커톤',
    org: '네이버 CONNECT',
    dueDate: '10.04',
    dday: 3,
    missingConditions: 2,
    region: '전국',
    summary: {
      who: '전국 고등학생 3인 팀',
      when: '11월 8~9일 (1박 2일)',
      how: '10월 4일까지 팀 신청서 내기',
    },
  },
  {
    id: 'ai-sw-talent-program',
    category: '교육',
    title: 'AI·SW 인재 양성 프로그램',
    org: '과학기술정보통신부',
    dueDate: '10.06',
    dday: 5,
    missingConditions: 0,
    region: '전국',
    summary: {
      who: '만 14~19세 청소년',
      when: '11월 ~ 12월 주 1회',
      how: '10월 6일까지 온라인 신청',
    },
  },
  {
    id: 'gwangju-youth-ai-camp',
    category: '교육',
    title: '광주 청소년 AI 캠프',
    org: '광주광역시교육청',
    dueDate: '10.08',
    dday: 7,
    missingConditions: 0,
    region: '광주',
    summary: {
      who: '광주에 사는 만 14~19세',
      when: '10월 24~26일 (2박 3일)',
      how: '10월 8일까지 신청서 1장 내기',
    },
  },
  {
    id: 'youth-career-scholarship',
    category: '장학금',
    title: '청소년 진로 장학금',
    org: '한국장학재단',
    dueDate: '10.12',
    dday: 11,
    missingConditions: 0,
    region: '전국',
    summary: {
      who: '고등학교 재학생',
      when: '연 1회 지급',
      how: '10월 12일까지 서류 제출',
    },
  },
  {
    id: 'youth-startup-idea-contest',
    category: '공모전',
    title: '2026 청소년 창업 아이디어 공모전',
    org: '중소벤처기업부',
    dueDate: '10.13',
    dday: 12,
    missingConditions: 1,
    region: '전국',
    summary: {
      who: '만 14~19세 · 팀원 2명 이상',
      when: '12월 본선 심사',
      how: '10월 13일까지 기획안 제출',
    },
  },
]

export function findOpportunity(id: string) {
  return opportunities.find((item) => item.id === id)
}
