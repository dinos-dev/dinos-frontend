---
name: feature
description: 기능 요구사항을 분석하고 에이전트 팀(cmux)을 구성하여 설계 및 구현
disable-model-invocation: true
argument-hint: 'feature description'
---

## 프로젝트 컨텍스트

!`head -30 AGENTS.md 2>/dev/null`

## 현재 구조

!`find apps/mobile/src apps/web/src packages -maxdepth 3 -name "*.ts" -o -name "*.tsx" 2>/dev/null | head -40`

## 요구사항

$ARGUMENTS

---

## 실행 지침

이 스킬은 Agent Teams (cmux)를 사용하여 3개 에이전트를 병렬로 스폰한다.
**아래 단계를 정확히 따라 실행하라.**

### Phase 1: 분석

Agent 도구를 사용하여 아래 3개 에이전트를 **하나의 메시지에서 동시에** 스폰한다.
각 에이전트는 별도 tmux 패널에서 실행된다.

**반드시 3개 Agent 도구 호출을 하나의 응답에 병렬로 포함할 것:**

에이전트 1 - tech-lead:

- subagent_type: tech-lead (`.claude/agents/tech-lead.md`)
- prompt: "요구사항: {$ARGUMENTS}. 아키텍처 방안 최소 2개 도출, 엣지케이스 3개 이상, 의존성 규칙 체크. 산출물 형식은 에이전트 정의의 형식을 따른다."
- name: "tech-lead"

에이전트 2 - ui-ux:

- subagent_type: ui-ux (`.claude/agents/ui-ux.md`)
- prompt: "요구사항: {$ARGUMENTS}. 컴포넌트 트리, UI 상태 매트릭스, 재사용 컴포넌트 파악, 접근성 체크리스트 작성. 산출물 형식은 에이전트 정의의 형식을 따른다."
- name: "ui-ux"

에이전트 3 - senior-dev:

- subagent_type: senior-dev (`.claude/agents/senior-dev.md`)
- prompt: "요구사항: {$ARGUMENTS}. 기존 코드베이스 탐색하여 재사용 가능 컴포넌트/훅/유틸 목록, 기술적 제약사항 파악. Phase 1 분석 모드로 실행 (코드 작성 금지)."
- name: "senior-dev"

3개 에이전트 결과가 모두 돌아올 때까지 대기한다.

### Codex 검증

1. 3개 에이전트의 결과를 하나의 마크다운으로 취합하여 `/tmp/dinos-plan-draft.md`에 저장한다
2. Bash로 Codex CLI를 호출한다:
   ```
   codex -a full-auto -q "아래 기능 기획을 검토해줘. 부족한 부분, 놓친 엣지케이스, 아키텍처 개선점을 지적해줘:\n\n$(cat /tmp/dinos-plan-draft.md)"
   ```
3. Codex 응답을 분석하여 기획에 반영할 포인트를 정리한다

### Gate 1: 유저에게 보고

아래 내용을 종합하여 유저에게 보고한다:

- **방안 비교표** (tech-lead 산출물 기반)
- **UI 설계 요약** (ui-ux 산출물 기반)
- **재사용 가능 코드** (senior-dev 산출물 기반)
- **Codex 피드백 반영 사항**
- **추천 방안과 근거**

**유저가 방안을 선택할 때까지 대기한다. 승인 없이 Phase 2로 넘어가지 않는다.**

### Phase 2: 상세 설계

유저가 선택한 방안을 기반으로, 다시 3개 에이전트를 **동시에** 스폰한다.

tech-lead: "선택된 방안 X를 기반으로 상세 인터페이스, 타입 정의, API 계약을 작성하라."
ui-ux: "선택된 방안 X를 기반으로 상세 컴포넌트 명세, 인터랙션 스펙을 작성하라."
senior-dev: "선택된 방안 X를 기반으로 파일별 구현 계획, 변경 내용, 테스트 계획을 작성하라."

기존 에이전트가 아직 실행 중이면 SendMessage로 메시지를 보내고,
종료된 경우 새로 스폰한다.

### Gate 2: 유저 최종 승인

- 구현할 파일 목록 + 각 파일의 변경 내용 한 줄 요약
- 테스트 계획
- 예상 영향 범위

**유저 승인 없이 구현 진행 금지.**

### Phase 3: 구현

senior-dev 에이전트에게 구현을 지시한다:

- isolation: worktree (격리된 환경에서 구현)
- ui-ux 명세 기반 컴포넌트 구현
- tech-lead 설계 기반 로직 구현
- 구현 후 `pnpm lint && pnpm check-types` 통과 확인
- 변경 파일 목록과 검증 결과 보고
