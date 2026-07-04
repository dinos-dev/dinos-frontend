# 에셋 정책

## Asset Manifest 양식

| Asset | Figma node | Parent path | Type | Usage | Existing equivalent | Decision | Destination candidate | Status |
| ----- | ---------- | ----------- | ---- | ----- | ------------------- | -------- | --------------------- | ------ |

### Asset Type

logo / brand mark / custom product icon / generic UI icon / illustration / photo / background image / avatar placeholder / decorative asset / font / animation (lottie/video) / unknown

### Decision

Reuse existing asset / Reuse existing icon system / Import Figma original asset / Needs designer/user confirmation / Blocked / Out of scope

### Status

Confirmed / Likely / Needs Approval / Needs Confirmation / Blocked

## 판단 우선순위

1. 프로젝트에 Figma와 동일하거나 충분히 정합한 기존 asset 확인
2. Figma에 원본 asset, export 정보, vector, image fill, component source 확인
3. generic UI icon이며 기존 icon system으로 디자인 정합성 충분하면 기존 icon 사용
4. custom icon, logo, brand mark, illustration은 Figma 원본 사용 우선
5. Figma 원본도 없고 프로젝트 asset도 없으면 Needs Confirmation 또는 Blocked

### generic icon 재사용 조건

- 프로젝트에서 이미 해당 icon system 사용 중
- 기능적 의미 동일
- outline/filled 상태 동일 또는 허용 범위 내
- stroke width, roundedness, size, visual weight 충분히 근접
- Figma custom icon 아님
- 브랜드 정체성을 갖는 아이콘 아님

## 금지 행위

- Figma logo를 text, emoji, 유사 아이콘으로 대체
- Figma image를 screenshot crop으로 저장
- 외부 웹 검색으로 유사 image/icon 선택
- 새 icon package 설치
- 외부 CDN URL을 코드에 직접 추가
- 대형 image를 base64 또는 data URL로 코드 삽입
- 동일 이름이라는 이유로 기존 asset 덮어쓰기
- Figma custom icon을 semantic 유사성만으로 generic icon library 대체

## 에셋 정책 3종

| 정책                        | 설명                                                 |
| --------------------------- | ---------------------------------------------------- |
| 에셋 계획만 작성            | Asset Manifest만 작성, 파일 추가 없음                |
| Asset Manifest 확인 후 추가 | Manifest를 사용자에게 보여주고 승인 후 추가 (기본값) |
| 승인된 Figma 에셋 자동 추가 | 사용자가 사전 승인한 에셋을 implement에서 바로 추가  |

## 다운로드 및 추가 규칙

사용자 승인 후 implement 단계에서만 수행.

### import 순서

1. get_design_context + get_screenshot 확인
2. 필요 시 get_metadata로 child node와 asset source 확인
3. MCP 환경의 공식 asset retrieval 방식 확인
4. Figma 원본 SVG, PNG, JPG, WebP, font 등 사용
5. 기존 프로젝트 naming/placement/import 규칙 확인
6. 동일 asset 존재 여부 (파일명, 사용처, 시각적 용도)
7. 중복 없으면 승인 destination에 추가
8. 플랫폼 기존 import 방식으로 연결
9. typecheck, lint, bundle/runtime에서 로드 확인

### MCP 미지원 시

```text
Asset retrieval: BLOCKED
- Asset:
- Figma node:
- Required format:
- Why blocked:
- Required user action:
```

## SVG 보안 및 처리

- Figma 원본 viewBox와 aspect ratio 유지
- 프로젝트의 기존 SVG pipeline 우선 사용 (react-native-svg-transformer 등)
- 새 SVG optimizer/converter/bundler 승인 없이 추가 금지
- `<script>`, event handler, 외부 href, remote image reference 포함 시 사용 금지 → 보고
- logo, brand mark 색상/viewBox/ratio/path 임의 변형 금지
- giant inline SVG markup 코드 복사 금지
- 프로젝트가 inline SVG 방식을 명시적으로 쓸 때만 따름
- 네이밍: 기존 규칙 우선, 없으면 kebab-case

## Raster Image 규칙

- Figma 원본 asset과 intended crop 사용
- screenshot에서 image 잘라내기 금지
- 투명 배경 필요 시 alpha channel 유지
- 표시 크기와 source resolution 기획에 기록
- 기존 image optimization 규칙 따름
- 신규 image optimizer/CDN/hosting 승인 없이 추가 금지
- 플랫폼별 기존 Image component 방식 사용
- logo, 인물 사진 등 fidelity 자동 crop/압축으로 훼손 금지

## Monorepo Asset Placement

폴더 이름만 보고 위치를 정하지 않는다. 아래를 모두 판단:

1. shared asset 또는 shared UI package가 실제로 존재하는가
2. 해당 asset이 2개 이상 앱에서 실제로 쓰이는가
3. mobile과 web이 동일 format을 자연스럽게 사용할 수 있는가
4. 플랫폼별 bundling/import 방식이 다른가
5. 코드베이스가 app-local ownership을 선호하는가
6. 기존 유사 asset은 어디에 있는가

기본 규칙:

- 한 앱의 한 화면에서만 쓰이는 asset → app-local 우선
- 여러 앱이 같은 asset을 공유하고 shared 구조가 있으면 shared 검토
- asset 하나 때문에 새 shared package 금지
- RN과 web의 asset pipeline이 달라 비용이 높으면 플랫폼별 분리
- 기존 유사 asset 위치 패턴 우선

### 현재 프로젝트 현황

| 앱     | 에셋 위치             | Icon system                | 비고                       |
| ------ | --------------------- | -------------------------- | -------------------------- |
| mobile | `apps/mobile/assets/` | lucide-react-native (예정) | NativeWind v4, Expo SDK 56 |
| web    | `apps/web/public/`    | 미정                       | Next.js 16                 |

- shared asset package: packages/ui (현재 미사용, 컴포넌트는 apps/mobile/src/)
- 기존 패턴: app-local 관리
- SVG import: 추후 결정 (react-native-svg-transformer 등)
