---
name: feature
description: Figma, 기존 코드, API 계약, 프로젝트 에셋 구조를 근거로 기능을 설계하고 사용자 승인 후 구현·검증한다. 여러 Figma 링크, 선택적 API 문서 경로, 모노레포 앱 선택, Figma asset 추가가 필요한 기능 작업에 사용한다.
argument-hint: '<feature request>'
disable-model-invocation: true
---

# Feature Skill

## 입력 모드

| 모드      | 트리거                | 동작                                                |
| --------- | --------------------- | --------------------------------------------------- |
| 빈 입력   | `/feature`            | 기능명, Figma, API 문서, 대상 앱, 에셋 정책 등 질문 |
| 사전 입력 | `/feature [요구사항]` | 제공된 정보 파싱 후 누락 항목만 추가 질문           |

상세: [입력 방식](./references/intake-format.md)

## 실행 흐름

| Phase | 내용                                     | Agent                                | 대화형 분기                      |
| ----- | ---------------------------------------- | ------------------------------------ | -------------------------------- |
| 0     | 입력 파싱, 대상 앱 판단, 에셋 정책 확인  | 리더                                 |                                  |
| 1     | 병렬 증거 수집                           | repo-scout + figma-scout + api-scout |                                  |
| 2     | 종합 + 조건부 위험 검토                  | 리더 + risk-reviewer (조건부)        | "Codex 교차 검증을 실행할까요?"  |
| 3     | 사용자 승인 Gate (기능 + Asset Manifest) | 리더                                 | 분석 보고 + 승인 요청            |
| 4     | 개발 기획 문서 저장                      | 리더                                 | "md 문서로 저장할까요?"          |
|       | plan only면 여기서 종료                  |                                      |                                  |
| 5     | 구현 + 승인 에셋 추가                    | implementer                          | 복잡 시 "Agent Team 사용할까요?" |
| 6     | UI + 에셋 검증 + 수정 루프 (최대 1회)    | ui-validator + fixer                 |                                  |

상세: [오케스트레이션 판단 규칙](./references/decision-rules.md)

## 핵심 제약

- **사용자 승인 전에는 코드 수정, Figma asset 다운로드, 파일 Write 금지**
- API 문서가 없으면 endpoint, request, response를 추측해 확정하지 않음
- Figma custom icon/logo를 generic icon library로 임의 대체 금지
- Figma 원본 asset이 없으면 curl, scraping, screenshot crop, AI 생성으로 대체 금지
- 여러 agent가 같은 파일이나 같은 asset directory를 동시에 수정하지 않음
- git commit/push는 사용자 명시 요청 시에만

## References

- [입력 방식](./references/intake-format.md)
- [개발 기획 문서 양식](./references/plan-template.md)
- [오케스트레이션 판단 규칙](./references/decision-rules.md)
- [Figma 분석 규칙](./references/figma-analysis.md)
- [에셋 정책](./references/asset-policy.md)
- [UI + 에셋 검증](./references/visual-validation.md)
- [Codex 교차 검증](./references/codex-crosscheck.md)
- [비즈니스 로직 패턴](./references/business-logic-patterns.md)
