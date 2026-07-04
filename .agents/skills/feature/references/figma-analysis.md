# Figma 분석 규칙

## 필수 분석 순서

Figma URL이 제공되면 아래 순서를 강제한다.

```text
1. URL에서 file key와 node id 추출
2. primary node에 get_design_context 호출
3. 동일 node에 get_screenshot 호출
4. 아래 중 하나면 get_metadata 호출:
   - 화면이 크거나 응답이 잘림
   - 하위 icon/image/logo 정보 부족
   - 사용자가 특정 layer name을 언급
5. metadata에서 구현 단위 child node와 parent path 식별
   - Header, Card, List Row, Banner, Modal, Navigation, Icon 등
6. 필요한 child node만 get_design_context + get_screenshot 재조회
7. asset, icon, image, typography, component variant, layout, state 정리
8. 기존 코드 패턴과 매핑
```

**Figma MCP 도구명을 추측해서 hardcode하지 않는다. 사용 가능한 도구를 먼저 확인한다.**

## Nested Asset Discovery

큰 부모 Frame만 받았을 때 하위 asset 탐색 규칙:

- 하위 asset이 첫 응답에 모두 포함된다고 가정 금지
- screenshot에 보이는 icon/logo/image가 design context에 없으면 metadata로 layer tree 확인
- 사용자가 layer name을 알려주면 name + parent path + visual role로 child node 탐색
- 같은 이름 asset은 parent path와 화면 위치로 구분
- layer name만 보고 SVG 단정 금지
  - node type, vector 여부, component instance 여부, image fill 여부, export 가능 여부를 먼저 확인
- 찾은 child asset은 필요할 때만 별도 design context / screenshot 조회

## 정보 역할 분류

```text
- 사용자 요구사항: 기능 목적과 우선순위의 근거
- Figma screenshot / design context: 화면 구조와 시각적 제약의 근거
- 기존 코드와 API 문서: 데이터 계약 및 구현 패턴의 근거
- Figma Description: 보조 설명
- 추정: Assumption 또는 Needs Confirmation으로 반드시 표시
```

## 충돌 처리

Figma, 사용자 요구사항, API 계약이 충돌하면:

- 임의로 하나를 선택하지 않음
- 충돌 내용을 개발 기획에 분리 기록
- 구현 전에 확인 질문 생성

## reference Figma node 처리

- reference node는 전수 분석하지 않음
- UI/UX 패턴, spacing, component variant 등 필요한 요소만 선택 분석
- primary와 중복되는 node는 재분석하지 않음
