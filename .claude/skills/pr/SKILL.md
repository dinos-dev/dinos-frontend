---
name: pr
description: PR 생성 (자동 요약, 테스트 계획 포함)
disable-model-invocation: true
argument-hint: [title]
allowed-tools: Bash(git *) Bash(gh *)
---

## 현재 브랜치

!`git branch --show-current`

## main 대비 커밋

!`git log origin/main..HEAD --oneline`

## 변경 파일

!`git diff origin/main..HEAD --stat`

## Instructions

1. 현재 브랜치를 push:
   `git push -u origin $(git branch --show-current)`
2. 커밋 히스토리와 diff를 분석해 PR 내용 작성
3. `gh pr create` 실행:

```
gh pr create --title "$ARGUMENTS" --body "$(cat <<'EOF'
## Summary
- [변경사항 요약 1-3줄]

## Changes
- [주요 변경 파일/기능 나열]

## Type
- [ ] Feature
- [ ] Bug fix
- [ ] Refactor
- [ ] Chore

## Test Plan
- [ ] [테스트 항목]

## Checklist
- [ ] pnpm lint 통과
- [ ] pnpm check-types 통과
- [ ] 관련 테스트 추가/수정
EOF
)"
```

4. PR URL 출력
