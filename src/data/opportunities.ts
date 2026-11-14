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
  detail?: {
    period: string
    tags: string[]
    overview: { label: string; value: string }[]
    program: { day: string; title: string; desc: string }[]
    contacts: { type: 'phone' | 'email' | 'site'; value: string }[]
    applyNote: string
  }
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
    detail: {
      period: '모집 2026.10.01 ~ 10.08',
      tags: ['광주', '오프라인'],
      overview: [
        {
          label: '모집 대상',
          value: '광주광역시 거주 또는 재학 중인 만 14~19세 (학교 밖 청소년 포함)',
        },
        { label: '모집 인원', value: '40명 · 선착순 아님, 서류 검토 후 선발' },
        { label: '캠프 일정', value: '2026.10.24(금) ~ 10.26(일) · 2박 3일' },
        { label: '장소', value: '광주 AI 융합 캠퍼스 · 숙식 제공' },
        { label: '참가비', value: '무료 (교통비 일부 지원)' },
        { label: '제출 서류', value: '참가 신청서 1부, 보호자 동의서 1부' },
      ],
      program: [
        {
          day: '1일차',
          title: 'AI 기초와 데이터 다루기',
          desc: '파이썬으로 데이터 정리하기 · 팀 구성',
        },
        { day: '2일차', title: '팀 프로젝트', desc: '지역 문제를 AI로 풀어보는 미니 프로젝트' },
        { day: '3일차', title: '발표와 수료', desc: '팀별 발표 · 현직 개발자 피드백 · 수료증' },
      ],
      contacts: [
        { type: 'phone', value: '062-000-0000 · 평일 9시~18시' },
        { type: 'email', value: 'ai-camp@gen.go.kr' },
        { type: 'site', value: '광주광역시교육청 공식 홈페이지' },
      ],
      applyNote: '신청은 광주광역시교육청 사이트에서 진행돼요',
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
