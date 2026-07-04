---
name: feature
description: Figma 화면, 기존 코드, API 계약, 프로젝트 에셋 구조를 근거로 기능을 분석·설계하고 사용자 승인 후 구현과 검증까지 수행한다. 여러 Figma 링크, 선택적 API 문서, 모노레포 앱 선택, custom asset, 인증·결제·삭제 같은 위험 기능이 포함된 feature 작업이나 plan-only 기능 설계에 사용한다.
---

# Feature Workflow

기능 요구사항을 증거 기반 계획으로 변환하고 승인된 범위만 구현한다. 사용자 승인 전에는 tracked file 수정, 계획 문서 저장, Figma asset 다운로드, 패키지 설치, 외부 상태 변경을 수행하지 않는다.

## 시작

1. 저장소의 `AGENTS.md` 체인과 대상 앱의 로컬 지침을 먼저 읽는다.
2. 사용자 입력을 [입력 방식](./references/intake-format.md)에 따라 파싱한다.
3. 이미 제공된 항목은 다시 묻지 않는다.
4. 실행 범위가 없으면 `plan only` 또는 `승인 후 구현까지` 중 하나를 확인한다.
5. 에셋 정책이 없으면 `Asset Manifest 확인 후 추가`를 기본값으로 사용한다.
6. 사용자가 subagent, 병렬 조사, agent team을 명시하지 않았다면 Phase 1 전에 병렬 read-only scout 사용 여부를 한 번 확인한다. 명시했다면 바로 사용한다.

## Workflow

### Phase 0 — Intake

- 기능 목적, primary/reference Figma 링크, API 문서, 대상 앱, 제약, 실행 범위, 에셋 정책을 정리한다.
- 대상 앱이 `auto`면 저장소 구조, 화면 비율, navigation, 유사 화면으로 판단한다. 구현 범위가 달라질 정도로 불명확할 때만 후보를 제시해 확인한다.
- Figma 링크가 없으면 Figma 단계만 생략하고 코드/API 근거로 진행한다.

### Phase 1 — Read-only evidence

사용자가 병렬 agent 사용을 승인했거나 명시했다면 다음 custom agent를 독립 작업으로 병렬 실행한다.

- `feature-repo-scout`: 코드베이스, UI, 에셋, hook, 명령 조사
- `feature-figma-scout`: Figma 구조, nested asset, Asset Manifest 초안
- `feature-api-scout`: API 문서, backend source, hook, cache 계약 조사

해당 입력이 없는 scout는 생략한다. agent를 사용하지 않는 경우 동일 범위를 메인 agent가 read-only로 조사한다. 결과는 다음 형식으로 제한한다.

```text
- Confirmed:
- Likely:
- Needs Confirmation:
- Relevant paths / Figma nodes:
- Existing reusable pattern:
- Asset findings:
- Conflict or risk:
- Recommendation:
```

원본 코드, Figma 출력, API 문서를 결과에 장문 복사하지 않는다.

### Phase 2 — Synthesis and risk review

- 사용자 요구사항, Figma, 코드, API를 서로 다른 근거로 구분한다.
- 충돌하는 근거를 임의로 해소하지 말고 `Needs Confirmation`으로 올린다.
- 다음 중 하나면 `feature-risk-reviewer`에 scout summary와 제안 계획만 전달해 독립 second pass를 수행한다.
  - Confirmed 근거 충돌
  - Figma와 API 계약 충돌
  - 대상 앱 또는 shared/app-local ownership 불명확
  - logo, brand, custom illustration의 출처·권한 불명확
  - auth, logout, account deletion, payment, permission, destructive action 포함
- Claude workflow의 Codex CLI 교차검증은 실행하지 않는다. 현재 Codex 내부에서는 `feature-risk-reviewer`가 같은 목적을 담당한다.

### Phase 3 — Approval gate

구현 전 사용자에게 다음 내용을 한 번에 보고하고 승인을 요청한다.

1. 기능과 대상 앱
2. Figma 구조와 핵심 시각 제약
3. 재사용할 UI, hook, API
4. Asset Manifest
5. API 계약 상태
6. Confirmed / Likely / Needs Confirmation
7. 결정 필요 사항과 추천 방향
8. 변경 예상 파일
9. 검증 계획
10. 독립 위험 검토 결과

승인 전에는 어떤 구현 파일이나 asset도 작성하지 않는다. 승인 내용이 일부라면 승인된 범위만 다음 단계로 넘긴다.

### Phase 4 — Optional plan document

- [개발 계획서 양식](./references/plan-template.md)을 사용한다.
- 저장 경로는 기존 dev-plan 규칙을 우선하며 기본값은 `apps/{project}/docs/{kebab-case}.md`다.
- 사용자에게 경로와 파일명을 확인받은 뒤에만 저장한다.
- `plan only`이면 구현하지 않고 최종 계획과 blocker를 반환한다.

### Phase 5 — Implementation

- 기본값은 메인 agent 또는 `feature-implementer` 한 명의 순차 구현이다.
- 사용자가 Agent Team을 명시적으로 승인하고 write scope가 완전히 분리될 때만 여러 worker를 사용한다.
- worker마다 파일과 asset directory ownership을 지정한다. shared UI, 동일 screen, 동일 asset directory는 한 agent만 수정한다.
- 구현자는 승인된 계획, API 계약, Asset Manifest만 따른다.
- 기존 변경을 보존하고 승인하지 않은 package, API, bundler, migration, 대규모 refactor를 추가하지 않는다.
- git add, commit, push는 사용자가 명시한 경우에만 수행한다.

### Phase 6 — Validation

- [UI 및 에셋 검증](./references/visual-validation.md)을 따른다.
- 가능한 범위에서 typecheck, lint, 관련 test, runtime, asset loading을 확인한다.
- UI 작업이면 `feature-ui-validator`로 Figma screenshot과 실제 runtime 결과를 비교한다.
- Blocker 또는 High가 있으면 `feature-fixer`가 지적된 범위만 최대 1회 수정하고 validator를 한 번 더 실행한다.
- runtime screenshot 비교가 없으면 `PASS`, `pixel-perfect`, `완전히 일치`라고 표현하지 않는다.
- 완료된 subagent thread는 결과 취합 후 종료한다.

## 핵심 정책

- API 문서나 코드가 없으면 endpoint, request, response를 확정하지 않는다.
- Figma custom icon, logo, illustration을 generic icon, screenshot crop, 외부 검색 이미지, AI 생성물로 대체하지 않는다.
- Figma 원본 asset retrieval이 불가능하면 `BLOCKED`로 보고하고 필요한 사용자 조치를 적는다.
- 새 패키지, 외부 CDN, optimizer, converter는 승인 없이 추가하지 않는다.
- 동일 파일 또는 asset directory를 여러 agent가 동시에 수정하지 않는다.
- 실제 확인과 추정을 각각 `Confirmed`, `Likely`, `Needs Confirmation`으로 표시한다.

## References

- [입력 방식](./references/intake-format.md)
- [Codex 오케스트레이션](./references/orchestration-codex.md)
- [Figma 분석](./references/figma-analysis.md)
- [에셋 정책](./references/asset-policy.md)
- [개발 계획서 양식](./references/plan-template.md)
- [UI 및 에셋 검증](./references/visual-validation.md)
- [비즈니스 로직 패턴](./references/business-logic-patterns.md)
