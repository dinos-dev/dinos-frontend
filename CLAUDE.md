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

/feature 스킬로 기능 요구사항을 전달하면 에이전트 팀이 구성된다.

에이전트:

- tech-lead (opus): 아키텍처 + UI 설계, Codex와 교차 검증
- senior-dev (sonnet): 코드 탐색 → 구현, Figma→RN 변환

흐름: Phase 1 설계(tech-lead + Codex 병렬) → Gate 유저 승인 → Phase 2 구현(senior-dev) → Phase 3 디자인 자동 검증(Figma URL 있을 때)

## Verification

코드 변경 후 반드시: pnpm lint && pnpm check-types
packages/ 변경 시 의존하는 apps/ 영향도 확인
