# Dinos Frontend

@AGENTS.md

## Commands

- Install: pnpm install
- Dev (mobile): pnpm dev:mobile
- Dev (web): pnpm dev:web
- Lint: pnpm lint
- Type check: pnpm check-types
- Format: pnpm format

## Monorepo Navigation

- Mobile app: apps/mobile/
- Web app: apps/web/
- Shared UI: packages/ui/
- Shared utils: packages/shared/
- ESLint config: packages/eslint-config/
- TS config: packages/typescript-config/

## Agent Workflow

/feature 스킬로 기능 요구사항을 전달하면 Agent Teams(cmux)가 구성된다.

에이전트:

- tech-lead (opus): 아키텍처 설계, 복수 방안 도출, 엣지케이스
- senior-dev (sonnet): 기존 코드 탐색 → 구현
- ui-ux (sonnet): 컴포넌트 설계, UI 상태 명세

흐름: Phase 1 분석 → Codex 검증 → Gate 1 유저 선택 → Phase 2 상세 설계 → Gate 2 유저 승인 → Phase 3 구현

## Verification

코드 변경 후 반드시: pnpm lint && pnpm check-types
packages/ 변경 시 의존하는 apps/ 영향도 확인
