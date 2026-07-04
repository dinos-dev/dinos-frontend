# 개발 기획 문서 양식

기존 dev-plan 양식(`apps/{project}/docs/`)을 기반으로 하되 Figma, 에셋, API 계약 섹션을 추가한다.

## 저장 규칙

- 기존 dev-plan 저장 경로 우선: `apps/{project}/docs/{kebab-case}.md`
- 저장 전 반드시 사용자 확인 (경로 + 파일명)
- 승인 전 Write 금지

## 문서 양식

```markdown
# {기능명} 개발 기획

> 작성일: {YYYY-MM-DD}
> 브랜치: {현재 브랜치}
> 대상 앱: {실제 앱 경로}
> 플랫폼: {mobile | web | shared}
> 상태: Draft | Confirmed

## 입력 및 근거

### 사용자 요구사항

- ...

### Figma 소스

| 역할 | Figma node | 화면/섹션 | 사용 목적 |
| ---- | ---------- | --------- | --------- |

### API / 백엔드 소스

| 소스 | 경로 | 신뢰도 | 비고 |
| ---- | ---- | ------ | ---- |

## 배경 및 목표

- **배경**:
- **목표**:
- **이번 작업 범위**:
- **스코프 외 항목**:

## 화면 및 UX 분석

### 화면 구조

- ...

### Figma 핵심 제약

- layout, spacing, typography, image ratio
- navigation, scroll behavior
- destructive action, accessibility

### 화면 상태

| 상태 | UI 처리 | 데이터 조건 | 비고 |
| ---- | ------- | ----------- | ---- |

## Asset Manifest

| Asset | Figma node | Parent path | 유형 | 기존 자산 | 처리 방식 | 최종 위치 | 상태 |
| ----- | ---------- | ----------- | ---- | --------- | --------- | --------- | ---- |

### Asset 처리 원칙

- 기존 asset 재사용 여부:
- Figma 원본 추가 필요 여부:
- user/designer 확인 필요:
- logo/brand asset 주의사항:
- app-local/shared placement 근거:

## 데이터 및 API 계약

### 기존 API 재사용

| 기능 | API / Hook | 요청 | 응답 | 처리 방식 |
| ---- | ---------- | ---- | ---- | --------- |

### 확인 필요 또는 신규 계약

| 기능 | 필요 이유 | 현재 상태 | 백엔드 확인 사항 |
| ---- | --------- | --------- | ---------------- |

## 구현 내용

### 변경 파일

| 파일 | 변경 내용 | 근거 |
| ---- | --------- | ---- |

### 상세 구현

각 파일/컴포넌트별:

- 무엇을, 왜 변경하는지
- 기존 패턴 재사용
- Figma 요소 연결
- 사용할 asset
- API/상태 처리 순서
- edge case
- 확장성 고려

## 검증

### 기능 검증

- [ ] ...

### UI 검증

- [ ] Figma primary node 기준 구조 확인
- [ ] spacing, typography, image ratio
- [ ] icon, logo, image, SVG 정합성
- [ ] 작은 화면/대상 viewport
- [ ] loading/empty/error/disabled
- [ ] destructive action

### Asset 검증

- [ ] 새 asset 실제 로드 확인
- [ ] SVG viewBox, fill, stroke 렌더링
- [ ] logo 비율/색상 보존
- [ ] image crop/aspect ratio
- [ ] duplicate/unused asset 없음

### 코드 품질

- [ ] typecheck
- [ ] lint
- [ ] 관련 test
- [ ] 기존 화면 회귀

## 주의사항

- 리스크:
- 사용자/백엔드 확인 필요:
- 가정:
- 향후 확장:
```

## 최종 결과 형식

```markdown
## Feature Summary

- 기능:
- 대상 앱:
- 플랫폼:
- 현재 브랜치:
- 실행 범위:

## Evidence

### Figma

| 역할 | Node | 분석 상태 | 용도 |

### Codebase

| 항목 | 실제 경로 | 발견 내용 |

### API / Backend

| 기능 | 상태 | 근거 | 처리 |

### Assets

| Asset | 상태 | 처리 방식 | 최종 경로 |

## Decisions

| 항목 | 결정 | 근거 | 신뢰도 |

## Plan

- 구현 순서 / 변경 파일 / UI 및 상태 / Asset 처리 / API 및 캐시 / 리스크 / Needs Confirmation

## Validation

- lint / typecheck / test / runtime / asset loading / Figma visual / Codex cross-check

## Remaining Blockers

- ...
```
