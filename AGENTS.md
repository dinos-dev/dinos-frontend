# Dinos Frontend

## Project Overview

Turborepo 모노레포 프로젝트.

- apps/mobile: Expo SDK 56, React Native 0.85
- apps/web: Next.js 16, React 19
- packages/ui: 크로스플랫폼 공유 UI 컴포넌트
- packages/shared: 비즈니스 로직, 유틸리티, 타입
- packages/eslint-config: ESLint 설정
- packages/typescript-config: TypeScript 설정

## Tech Stack

- Runtime: Node >= 18, pnpm 9
- Language: TypeScript (strict mode)
- State: React Query (서버), Zustand (클라이언트 UI)
- Styling (mobile): NativeWind v4 (Tailwind for RN)
- Package Manager: pnpm
- Build: Turborepo

## Development Principles

### 먼저 확인하고, 그 다음 코딩

- 가정이 있으면 명시하고 물어본다
- 여러 해석이 가능하면 선택지를 제시한다
- 더 단순한 방법이 있으면 먼저 제안한다
- 불명확한 것이 있으면 멈추고, 무엇이 헷갈리는지 짚고 물어본다

### 최소 코드 원칙

- 요청된 것만 구현한다. 예방적 추상화 금지
- 한 번만 쓰이는 코드에 래퍼/헬퍼를 만들지 않는다
- 50줄로 가능한 것을 200줄로 쓰지 않는다
- 요청하지 않은 "유연성"이나 "설정 가능성"을 추가하지 않는다

### 외과적 수정

- 요청과 직접 관련 없는 코드를 건드리지 않는다
- 인접 코드의 포맷, 주석, 네이밍을 "개선"하지 않는다
- 내 변경으로 unused가 된 것만 정리한다. 기존 데드 코드는 언급만 한다
- 기준: 변경된 모든 줄이 요청 사항과 직접 연결되어야 한다

### 목표 기반 실행

- 작업을 검증 가능한 단계로 분해한다
- 각 단계마다 성공 기준을 명시한다
- 예: "버그 수정" → "재현 테스트 작성 → 수정 → 테스트 통과"
- 예: "기능 추가" → "인터페이스 정의 → 구현 → lint/type-check 통과"

## Architecture

### Feature 기반 구조 (apps 내부)

```
app/                         # 라우팅 진입점만, 로직 없음
src/
  features/[name]/
    screens/                 # 스크린 컴포넌트
    components/              # feature 전용 UI
    hooks/                   # 비즈니스 로직 훅
    api/                     # API/DB 쿼리 (index.ts + queries.ts)
    store/                   # 상태 관리 ([name].store.ts)
    types/                   # 타입 정의
    index.ts                 # barrel export (외부 공개 API만)
  components/                # 앱 전체 공통 UI
  hooks/                     # 앱 전체 공통 훅
  store/                     # 전역 상태
  services/                  # API 클라이언트 설정
  utils/                     # 순수 유틸리티
```

### Feature 내부 규칙

- 스크린은 반드시 screens/ 폴더에 위치
- api/, store/, types/는 파일이 1개여도 폴더로 관리
- store 파일명: [feature].store.ts (예: interview.store.ts)
- index.ts는 barrel export만, 로직 포함 금지

### 의존성 방향 (단방향 강제)

```
app/ → features/ → components/ | hooks/ | services/ | utils/
```

- features 간 직접 import 금지 → 공유 필요 시 공통 레이어로 승격
- feature 외부에서는 반드시 index.ts를 통해 접근
- 공통 레이어(components/, services/, utils/)는 features/를 import 불가

### 상태 관리 분리

- React Query: 서버/비동기 상태 (캐싱, 로딩, 에러, 백그라운드 갱신)
- Zustand: 클라이언트 UI 상태만 (세션 진행, 선택된 탭, 모달 등)
- Zustand에 서버 데이터 저장 금지
- 서버 연동 시 api/queries.ts에 React Query 훅 추가

### 비즈니스 로직 패턴 (React Query + Axios)

#### Feature API 레이어 구조

새 feature의 api/ 폴더는 반드시 3파일로 구성:

```
features/[name]/api/
  api.ts       # 순수 HTTP 호출 함수 (axios). React Query 의존 없음
  keys.ts      # Query Key Factory. 계층형 키 정의
  queries.ts   # useQuery/useMutation 래핑 훅. 외부에 export
```

- api.ts: apiClient를 사용한 HTTP 호출만. unwrapResult()로 응답 파싱. 사이드이펙트 없음
- keys.ts: TkDodo 패턴 — `all > list(params) > detail(id)` 계층
- queries.ts: React Query 훅 래핑만. 비즈니스 로직은 hooks/에서 조합

#### Query Key Factory 규칙

```typescript
export const reviewKeys = {
  all: ['reviews'] as const,
  list: (placeId: number) => [...reviewKeys.all, 'list', placeId] as const,
  detail: (id: number) => [...reviewKeys.all, 'detail', id] as const,
};
```

- queryFn에 전달하는 파라미터는 반드시 key에 포함
- invalidateQueries 시 계층 활용 (reviewKeys.all로 전체, reviewKeys.list(id)로 특정 목록)

#### 에러 핸들링

- 글로벌: MutationCache.onError가 자동으로 에러 토스트 표시
- opt-out: 인라인 에러 UI가 필요한 mutation만 `meta: { skipGlobalError: true }` 설정
- Query 에러: 컴포넌트에서 isError/error로 인라인 처리

#### Mutation 후 캐시 갱신

- 기본: `invalidateQueries` (서버에서 다시 가져옴)
- 즉각 피드백 필요 시만: optimistic update (좋아요, 북마크 등)
- setQueryData는 optimistic update 또는 이미 데이터를 동기적으로 보유할 때만

#### 명령형 fetch

- 서버에서 데이터를 가져와 캐시에 넣을 때: `queryClient.fetchQuery()` 사용
- API 함수 직접 호출 + `setQueryData()` 조합 금지 (캐시 라이프사이클 우회됨)

#### QueryClient 설정 (app/\_layout.tsx)

- queries.retry: 401/403은 제외 (Axios 인터셉터가 토큰 갱신 처리)
- mutations.retry: 0
- MutationCache.onError: 글로벌 에러 토스트 (meta.skipGlobalError로 opt-out)

## Code Conventions

- TypeScript strict, any 금지
- Named exports only (default export 금지)
- 컴포넌트 파일: PascalCase (LoginScreen.tsx)
- 일반 파일: kebab-case (use-auth.ts, auth.store.ts)
- 테스트: 소스 옆 배치 (login-screen.test.tsx)
- 커스텀 훅: use + 동사/명사 (useAuth, useLoginForm)
- 함수형 컴포넌트 + TypeScript interface로 Props 정의

## Git Conventions

- Commit: type(scope): message
  - types: feat, fix, docs, style, refactor, test, chore, build, ci
  - scope: mobile, web, ui, shared, config, deps
  - 소문자, 마침표 없이, 50자 이내
- Branch: type/description (feature/add-login, fix/button-color)
  - kebab-case, 영문, 간결하게
- PR: title < 70자, body에 Summary + Changes + Test Plan

## Commands

- pnpm dev / pnpm dev:mobile / pnpm dev:web
- pnpm build / pnpm lint / pnpm check-types
- pnpm format / pnpm format:check
