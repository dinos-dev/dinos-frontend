# Codex 교차 검증 정책

## 기본 상태

비활성. Phase 2 종합 후 리더가 사용자에게 "Codex 교차 검증을 실행할까요?" 질문. 사용자가 승인한 경우에만 실행.

## 목적

전체 설계를 다시 생성하는 것이 아니라, Claude가 만든 기획의 누락과 위험을 검토.

## 검토 범위

- 잘못된 가정
- API 계약 누락
- UI state와 edge case 누락
- 변경 파일 범위 과다/부족
- Figma 요구사항과 구현 방안 불일치
- destructive action, auth, cache invalidation, navigation 위험
- asset duplication
- app-local / shared asset placement 위험

## Evidence packet 구성

Codex에 전달하는 정보 (전체 코드/Figma/API 문서가 아닌 요약만):

```text
- 기능 요구사항 요약
- primary/reference Figma node 목록
- Figma 핵심 제약 요약
- Asset Manifest 요약
- 관련 파일 경로와 기존 패턴 요약
- 확인된 API 계약 요약
- 가정과 미확인 사항
- 제안된 변경 파일 목록
```

## 실행 규칙

- Codex CLI 존재 시에만 실행
- read-only sandbox
- approval: never
- `--yolo`, danger-full-access, workspace-write 금지
- 사용자 입력을 shell command substitution으로 실행 금지
- repository 수정 금지

## 실패 처리

```text
Codex cross-check: SKIPPED
Reason: codex CLI unavailable or execution failed
```

Feature workflow 전체를 실패시키지 않음.

## 스크립트

`scripts/codex-crosscheck.sh` 참조.
