# UI + 에셋 검증 기준

## UI 검증 항목

### 레이아웃

- 전체 좌우 padding
- safe area / header 높이
- section spacing
- card width / height / radius
- fixed 영역과 scroll 영역
- horizontal list 여부
- bottom navigation 위치

### 타이포그래피

- font size / weight / line-height / line clamp
- font family (Pretendard 등)

### 이미지

- image aspect ratio와 crop
- background image 처리

### 상태

- loading / empty / error / disabled
- destructive action confirmation

## 에셋 검증 항목

- icon, SVG, logo, illustration이 Figma 원본과 일치하는지
- SVG viewBox, fill, stroke 렌더링 확인
- logo 비율 및 색상 보존
- image crop과 aspect ratio
- duplicate asset 없음
- unused asset 없음
- 새 asset이 실제 앱에서 로드되는지

## 플랫폼별 추가 검증

### Web

- 360px, 390px, target Figma viewport
- keyboard focus
- responsive width

### React Native

- iOS / Android safe area
- small width device
- font scaling
- keyboard avoidance
- touch target size (최소 44x44)

## 검증 방법

1. Figma screenshot을 기준 이미지로 유지
2. 프로젝트 기존 검증 수단 우선 (Playwright, Storybook, emulator, simulator)
3. Figma MCP screenshot 조회 시 사용 가능한 도구명 먼저 확인
4. 새 테스트 라이브러리는 사용자 승인 없이 설치하지 않음

## 결과 상태

| 상태       | 의미                                   |
| ---------- | -------------------------------------- |
| PASS       | 실제 runtime 비교 완료, 주요 차이 없음 |
| PARTIAL    | 일부 차이 있으나 Blocker 아님          |
| UNVERIFIED | runtime 확인 불가                      |
| BLOCKED    | Blocker 수준 차이 존재                 |

**실제 runtime screenshot 비교 없이 PASS, pixel-perfect, 완전히 일치 표현 금지**

## fixer 연계

- Blocker 또는 High → feature-fixer 최대 1회 실행
- 수정 후 validator 재실행
- 여전히 Blocker/High면 무한 반복 금지, 사용자에게 남은 차이 보고
