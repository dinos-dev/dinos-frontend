---
name: commit
description: Conventional Commits 형식으로 커밋 생성
disable-model-invocation: true
argument-hint: [type(scope): message]
allowed-tools: Bash(git *)
---

## 현재 상태

!`git status --short`

## Staged 변경

!`git diff --cached --stat`

## 최근 커밋

!`git log --oneline -5`

## Instructions

1. staged 변경사항이 없으면 관련 파일을 `git add`
2. Conventional Commits 형식:
   - types: feat, fix, docs, style, refactor, test, chore, build, ci
   - scope: mobile, web, ui, shared, config, deps (변경된 패키지 기반)
   - format: `type(scope): description` (소문자, 마침표 없이, 50자 이내)
3. 인자가 주어지면: `git commit -m "$ARGUMENTS"`
4. 인자가 없으면: diff를 분석해 적절한 커밋 메시지를 생성하고 커밋
5. 커밋 메시지에 Co-Authored-By 추가:
   `Co-Authored-By: Claude <noreply@anthropic.com>`
6. 커밋 후 `git log --oneline -1`로 확인
