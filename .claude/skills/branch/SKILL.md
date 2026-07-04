---
name: branch
description: 컨벤션에 맞는 브랜치 생성
disable-model-invocation: true
argument-hint: 'type/description'
allowed-tools: Bash(git *)
---

## 현재 브랜치

!`git branch --show-current`

## Instructions

1. 사용자에게 base 브랜치를 확인한다 (기본값: dev, 현재 브랜치에서 분기할 수도 있음)
2. base 브랜치의 최신 상태로 시작:
   `git fetch origin && git checkout <base> && git pull origin <base>`
3. 브랜치명 규칙:
   - feature/설명 (새 기능)
   - fix/설명 (버그 수정)
   - refactor/설명 (리팩토링)
   - chore/설명 (설정, 빌드 등)
   - docs/설명 (문서)
4. 설명은 kebab-case, 영문, 간결하게
5. 생성: `git checkout -b <브랜치명>`
6. 확인: `git branch --show-current`
