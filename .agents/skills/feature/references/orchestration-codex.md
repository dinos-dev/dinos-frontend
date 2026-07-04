# Codex 오케스트레이션

## Agent 실행 조건

Codex는 사용자가 subagent 또는 병렬 agent 작업을 명시했을 때만 agent를 생성한다.

- `$feature` 기본 프롬프트처럼 read-only parallel scouts가 명시되면 Phase 1 agent를 바로 실행한다.
- 사용자 자유 입력에 병렬 실행 요청이 없으면 Phase 0에서 사용 여부를 한 번 확인한다.
- agent 실행이 거절되거나 도구가 없으면 메인 agent가 같은 범위를 순차 조사한다.

## Phase별 Agent

| Phase | Agent                   | Sandbox          | 실행 조건                                  |
| ----- | ----------------------- | ---------------- | ------------------------------------------ |
| 1     | `feature-repo-scout`    | read-only        | 항상                                       |
| 1     | `feature-figma-scout`   | read-only        | Figma 링크가 있을 때                       |
| 1     | `feature-api-scout`     | read-only        | API 문서 또는 데이터 계약 조사가 필요할 때 |
| 2     | `feature-risk-reviewer` | read-only        | 위험 조건이 하나 이상일 때                 |
| 5     | `feature-implementer`   | parent inherited | 승인 후 단일 구현을 위임할 때              |
| 6     | `feature-ui-validator`  | read-only        | UI 또는 asset 변경이 있을 때               |
| 6     | `feature-fixer`         | parent inherited | Blocker/High가 있을 때, 최대 1회           |

## 병렬 실행

- 서로 독립적인 scout를 같은 round에 생성하고 모두 완료된 뒤 결과를 합친다.
- agent prompt에 기능 요약, 조사 범위, 출력 형식, 금지 행위를 포함한다.
- 전체 대화나 큰 문서를 복제하지 말고 필요한 경로와 근거만 전달한다.
- 완료된 agent는 결과를 취합한 직후 종료해 thread limit을 회수한다.

## 구현 위임

- 기본 구현자는 한 명이다.
- 여러 구현 agent는 사용자가 Agent Team을 승인하고 파일 집합이 겹치지 않을 때만 사용한다.
- 각 worker prompt에 소유 파일, 책임 범위, 다른 작업자의 변경을 되돌리지 말라는 지침을 명시한다.
- shared component, 공통 token, 동일 screen, 동일 asset directory는 병렬 분할하지 않는다.

## 승인과 실패

- subagent는 parent의 sandbox와 approval 정책을 상속한다.
- read-only agent가 write 또는 새로운 승인을 요구하면 해당 작업을 실패로 처리하고 메인 agent에 보고한다.
- agent 실패는 전체 workflow를 자동 중단하지 않는다. 누락 근거가 안전한 계획을 막는 경우에만 blocker로 올린다.
- 사용자 승인 gate는 반드시 메인 agent가 수행한다.
