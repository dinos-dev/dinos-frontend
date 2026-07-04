# 오케스트레이션 판단 규칙

## Phase별 판단

### Phase 0: 입력 파싱

- 대상 앱이 `auto`면 Figma 화면 비율, navigation 패턴, 기존 유사 화면, repo 구조를 근거로 추정
- 불명확하면 앱 후보만 한 번 질문
- 에셋 정책 미지정 시 기본값: "Asset Manifest 확인 후 추가"
- 실행 범위 미지정 시 AskUserQuestion으로 질문

### Phase 1: 증거 수집

- repo-scout, figma-scout, api-scout 병렬 실행
- API 문서 경로가 없고 관련 API가 전혀 없을 가능성이 낮으면 api-scout은 제한 탐색
- 코드, 설정, package, 문서, asset 파일 수정 금지

### Phase 2: 종합 + 조건부 risk-reviewer

risk-reviewer 호출 조건 (하나 이상):

- Confirmed 근거끼리 충돌
- Figma와 API 계약 충돌
- common UI와 app-local UI 판단 어려움
- app-local asset과 shared asset 판단 어려움
- logo, custom illustration, brand asset 출처/권한 불명확
- auth, logout, account deletion, payment, permission, destructive action 포함
- 대상 앱이 여전히 불명확

**Codex 교차 검증 질문:**
종합 완료 후 AskUserQuestion으로 사용자에게 질문:

```text
"Codex 교차 검증을 실행할까요?"
- 예: evidence packet 생성 후 codex-crosscheck.sh 실행
- 아니요: 스킵
```

codex CLI가 미설치면 "Codex CLI가 설치되어 있지 않아 스킵합니다" 보고.

### Phase 3: 사용자 승인 Gate

보고 항목:

1. 기능 요약
2. 대상 앱 + 판단 근거
3. Figma 구조 + 핵심 시각 제약
4. 기존 UI/hook/API 재사용 후보
5. **Asset Manifest** (에셋 추가 시 반드시 포함)
6. API 계약 현황
7. Confirmed/Likely/Needs Confirmation 표
8. 필요한 결정 사항
9. 추천 구현 방향
10. 변경 예상 파일
11. 검증 계획
12. Codex 결과 (실행했으면)

불필요하게 "항상 두 가지 아키텍처"를 만들지 않음. 실제 결정 지점이 있을 때만 대안 제시.

### Phase 4: 개발 기획 문서 저장

**plan only인 경우:**

```text
"구현은 진행하지 않습니다. 개발 기획 문서를 md로 저장할까요?"
- 저장 → 경로 + 파일명 확인 후 Write
- 저장하지 않음 → 종료
```

**구현까지인 경우:**

```text
"개발 기획 문서를 md로 저장할까요?"
- 저장 → 경로 + 파일명 확인 후 Write → Phase 5 진행
- 저장하지 않음 → Phase 5 바로 진행
```

저장 경로: 기존 dev-plan 규칙 우선 (`apps/{project}/docs/`)

### Phase 5 진입 전: Agent Team 질문

아래 조건 중 하나 이상이면 AskUserQuestion:

- primary Figma 화면 3개 이상
- mobile과 web 동시 영향
- Figma, 코드, API 계약 간 충돌 가능성 높음
- 인증, 계정 삭제, 결제, 권한 등 정책 리스크
- 여러 앱/feature가 서로 다른 파일 집합을 독립 수정 가능
- 여러 화면에서 같은 logo/illustration/custom asset 공유, placement 복잡

```text
"복잡한 기능입니다. Agent Team으로 병렬 구현할까요?"
- Agent Team 사용: 팀원 간 직접 소통 가능, 최대 3명
- 단일 구현자: implementer 1명이 순차 작업
```

조건에 해당하지 않으면 질문 없이 단일 implementer로 진행.

### Phase 5: 구현

- 단일 모드: feature-implementer 단독
- Agent Team 모드: 팀원별 file/asset directory ownership 겹치지 않게 분리

Agent Team 규칙:

- 최대 3명
- 팀원별 file/asset directory ownership 겹치지 않게
- shared UI, 공통 token, 동일 screen, 동일 asset directory는 한 명만 수정
- asset import와 file 추가는 한 명의 구현자만 담당
- 충돌 예상 시 단일 implementer 방식으로 전환

### Phase 6: 검증

- ui-validator 실행
- Blocker/High → fixer 최대 1회 → validator 재실행
- 여전히 Blocker/High면 사용자에게 보고 (무한 반복 금지)

## Scout 결과 포맷

모든 scout은 아래 형식으로 짧게 반환:

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

## 금지 행위

- 동일 파일을 여러 scout이 전수 탐색
- Figma 원문 전체를 여러 agent에게 반복 전달
- 큰 Figma frame에 get_design_context 반복 호출
- docs, node_modules, build, dist를 제한 없이 재귀 탐색
- API 문서/source 전체를 결과에 복사
