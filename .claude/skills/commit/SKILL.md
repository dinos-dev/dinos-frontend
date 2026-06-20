---
name: commit
description: 변경된 파일을 분석해 커밋 메시지 초안을 작성하고 사용자 컨펌 후 커밋 + 푸시. 커밋 시 사용.
---

# Commit Skill

## Workflow

1. `git diff --stat` + `git status --short` 로 변경 파일 전체 파악
2. 변경 내용 분석 → 커밋 메시지 초안 작성
3. 사용자에게 초안 제시 + 컨펌 요청 (AskUserQuestion)
4. 승인 → `git add` → `git commit` → `git push`
5. 수정 요청 → 메시지 수정 후 재확인

## 커밋 메시지 형식

```
<type>(<scope>): <핵심 내용>
```

### type

| type       | 용도             |
| ---------- | ---------------- |
| `feat`     | 새 기능          |
| `fix`      | 버그 수정        |
| `refactor` | 리팩토링         |
| `chore`    | 빌드/설정/의존성 |
| `docs`     | 문서             |
| `style`    | 포맷/UI 스타일   |
| `test`     | 테스트           |
| `build`    | 빌드 시스템      |
| `ci`       | CI 설정          |

### scope

변경된 앱/패키지: `mobile`, `web`, `ui`, `shared`, `config`, `deps`

### 예시

```
feat(mobile): implement login screen
fix(ui): resolve button disabled state
chore: update pnpm-lock.yaml dependencies
```

**커밋 메시지는 반드시 영어로 작성**

## 주의사항

- **Co-Authored-By 절대 포함 금지**
- `package-lock.json`, `pnpm-lock.yaml` 만 변경된 경우 별도 커밋 고려
- node_modules 절대 포함 금지
