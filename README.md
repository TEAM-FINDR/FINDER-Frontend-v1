# FINDR Frontend

FINDR 웹 프론트엔드 저장소입니다.

![CI](https://github.com/TEAM-FINDR/FINDR-Frontend-v1/actions/workflows/ci.yml/badge.svg)

## 기술 스택

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-7-CA4245?logo=reactrouter&logoColor=white)
![TanStack Query](https://img.shields.io/badge/TanStack_Query-5-FF4154?logo=reactquery&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?logo=axios&logoColor=white)
![Vitest](https://img.shields.io/badge/Vitest-6E9F18?logo=vitest&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B32C3?logo=eslint&logoColor=white)
![Prettier](https://img.shields.io/badge/Prettier-F7B93E?logo=prettier&logoColor=black)

## 실행 방법

```bash
npm install
npm run dev
```

| 스크립트            | 설명                       |
| ------------------- | -------------------------- |
| `npm run dev`       | 개발 서버 실행             |
| `npm run build`     | 타입 검사 후 프로덕션 빌드 |
| `npm run preview`   | 빌드 결과 미리보기         |
| `npm run typecheck` | TypeScript 타입 검사       |
| `npm run lint`      | ESLint 검사                |
| `npm run format`    | Prettier 포맷 검사         |
| `npm test`          | Vitest 테스트 실행         |

## 환경변수

루트에 `.env.local` 파일을 만들고 `.env.example`을 참고해 값을 채웁니다.

| 변수                | 설명          |
| ------------------- | ------------- |
| `VITE_API_BASE_URL` | API 서버 주소 |

## 브랜치 전략

| 브랜치       | 용도                    |
| ------------ | ----------------------- |
| `main`       | 최종 배포               |
| `dev`        | 개발 통합 (기본 브랜치) |
| `feature/*`  | 기능 개발               |
| `fix/*`      | 버그 수정               |
| `design/*`   | UI 및 디자인 작업       |
| `refactor/*` | 리팩토링                |
| `release/*`  | 출시 준비               |
| `hotfix/*`   | 배포 후 긴급 수정       |

모든 작업은 `dev`에서 브랜치를 생성하고, 작업 완료 후 `dev`를 대상으로 PR을 생성합니다.

## Commit Convention

```
type :: 작업내용 #이슈번호
```

| Type       | 설명                          |
| ---------- | ----------------------------- |
| `feat`     | 새로운 기능 추가              |
| `fix`      | 오류 수정                     |
| `design`   | 디자인 요소 변경              |
| `style`    | 코드 스타일 변경              |
| `refactor` | 기능 변경 없는 코드 구조 개선 |
| `docs`     | 문서 수정                     |
| `revert`   | 이전 커밋 되돌리기            |
| `test`     | 테스트 코드 추가 및 수정      |
| `chore`    | 기타 작업                     |

## Issue / PR

- Issue 제목: `[type] 작업 내용`
- PR 제목: `[type/#이슈번호] 작업 내용`
- 모든 작업은 Issue를 먼저 생성하고, 작업 유형에 맞는 Label을 부착합니다.
- PR 본문에서 `Refs #이슈번호`로 Issue를 연결합니다.

## 프로젝트 구조

```
src/
├─ lib/      공통 설정 (API 클라이언트, QueryClient)
├─ pages/    라우트 단위 페이지
├─ App.tsx   라우팅 정의
└─ main.tsx  앱 진입점
```
