# 입력 방식

## 방식 A. 빈 입력

Codex의 `$feature` 또는 Claude의 `/feature`만 실행하면 리더가 사용 가능한 사용자 입력 도구 또는 간결한 질문으로 아래 항목을 한 번에 수집한다.

```text
1. 기능명 또는 작업 목적
2. Figma 링크 목록
3. 링크별 역할
   - primary: 실제 구현 기준 화면
   - reference: UI/UX/interaction 패턴 참고
4. 백엔드 또는 API 문서 경로 (없으면 "없음")
5. 대상 앱 (auto / mobile / web / 기타)
6. 추가 요구사항, 정책, 제한 사항
7. 실행 범위
   - plan only (분석 + 설계만)
   - 승인 후 구현까지
8. Figma 에셋 정책
   - 에셋 계획만 작성
   - Asset Manifest 확인 후 추가
   - 승인된 Figma 에셋 자동 추가 허용
```

## 방식 B. 사전 입력

사용자가 요구사항을 함께 전달하면 파싱 후 누락 항목만 추가 질문한다.

예시:

```text
$feature  # Codex
# /feature  # Claude

기능: 홈 화면 리뉴얼

Figma:
- primary: https://www.figma.com/design/FILE_KEY/file?node-id=45-5356
  - 홈 화면
- reference: https://www.figma.com/design/FILE_KEY/file?node-id=...
  - 설정 화면의 버튼/리스트/간격 패턴 참고

백엔드 문서: 없음
대상 앱: auto
에셋 정책: Asset Manifest 확인 후 추가
실행 범위: plan only
```

## 파싱 규칙

- 이미 제공된 정보는 재질문하지 않음
- 동일 Figma URL 또는 동일 file key + node id는 중복 분석하지 않음
- Figma 역할 미지정 시 사용자 설명, 화면 구조, 이름, hierarchy 기준으로 잠정 분류
- 구현에 영향을 줄 만큼 모호할 때만 한 번 질문
- 에셋 정책 미지정 시 기본값: "Asset Manifest 확인 후 추가"
- 실행 범위 미지정 시 Phase 0에서 질문

## Figma URL 파싱

```text
figma.com/design/:fileKey/:fileName?node-id=:nodeId
  → nodeId의 "-"를 ":"로 변환
figma.com/design/:fileKey/branch/:branchKey/:fileName
  → branchKey를 fileKey로 사용
figma.com/board/:fileKey/:fileName?node-id=:nodeId
  → FigJam, get_figjam 사용
```
