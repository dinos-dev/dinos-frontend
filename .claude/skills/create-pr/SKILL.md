---
name: create-pr
description: 현재 브랜치의 변경 내역을 분석해 PR을 생성. base 브랜치/개요/라벨을 사용자에게 받고 컨펌 후 gh pr create 실행.
---

# Create PR Skill

## Workflow

1. `git branch -r` 로 원격 브랜치 목록 조회
2. 사용자에게 머지 대상(base) 브랜치 선택 요청 (AskUserQuestion)
3. `git diff <base>...HEAD --stat` 로 변경 파일 목록 파악
4. 사용자에게 다음 수집 (AskUserQuestion):
   - PR 개요 (한 줄 설명)
   - 라벨: `fix` / `feature` / `refactor` / `chore`
5. git diff 기반으로 변경사항 자동 작성 → PR 초안 생성
6. 전체 PR 내용 사용자에게 컨펌 (AskUserQuestion)
7. 승인 → `gh pr create --base <선택한 브랜치>` 실행

## PR 제목 형식

```
<핵심 내용>
```

**PR 제목은 70자 이내, 한글로 작성**

## PR 본문 형식

```markdown
## 개요

<사용자 입력>

## 변경 사항

- `파일경로` 변경 내용 한 줄 설명
- ...

## 체크리스트

- [ ] pnpm lint 통과
- [ ] pnpm check-types 통과
```

## gh 명령어 템플릿

```bash
gh pr create \
  --title "<핵심 내용>" \
  --body "$(cat <<'EOF'
## 개요
...

## 변경 사항
...

## 체크리스트
- [ ] pnpm lint 통과
- [ ] pnpm check-types 통과
EOF
)" \
  --base <선택한 브랜치> \
  --label "<라벨>"
```

## 주의사항

- **머지 대상 브랜치는 반드시 사용자에게 선택 받기** (main 자동 가정 금지)
- 미push 커밋이 있으면 push 먼저 진행
- 이미 열린 PR이 있는지 `gh pr list` 로 확인
