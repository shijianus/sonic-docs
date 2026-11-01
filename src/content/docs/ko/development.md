---
title: 개발 가이드
description: Sonic 개발 가이드, 저장소 구조, 빌드 명령, 테스트 스위트, 문서 일관성 검증과 기여 참여.
---

**시행일: 2026년 11월 1일｜버전: 1.4**

이 페이지는 개발 참여와 2차 개발을 하는 독자를 위해 저장소 구조, 빌드 명령, 테스트 스위트와 문서 일관성 검증을 설명합니다. 라이선스와 법적 경계는 [오픈 소스와 셀프 호스팅 법률](/ko/open-source/)을 참조하십시오.

## 1. 저장소 구조

| 경로 | 내용 |
| --- | --- |
| `player/` | Vue 3 웹 플레이어(zh/en/ja 3개 언어 i18n 내장) |
| `functions/` | Cloudflare Pages Functions 엣지 게이트웨이(라우팅, 요청 제한, 캐시, 서킷 브레이커) |
| `functions/_lib/sonic/` | 추천, 신원, 업스트림 프로토콜과 보안 공유 로직 |
| `server/` | 데이터 플레인 Node.js 22 엔진(`recommend-sqlite.ts` SQLite 저장 포함) |
| `Dockerfile` / `docker-compose.yml` | 데이터 플레인 컨테이너 스택(sonic-engine + ncm-api) |
| `docs/` | 운영, 컴플라이언스, 감사 개선과 알려진 문제 문서 |
| `tests/` | 보안, 게이트웨이, 추천과 릴리스 게이트 테스트 |

## 2. 빌드와 로컬 실행

```bash
npm ci                              # 루트 의존성
pnpm --dir player install --frozen-lockfile
npm run build                       # 플레이어 빌드 + dist로 복사
npx wrangler pages dev dist         # 로컬 엣지 게이트웨이(데이터 플레인이 없으면 자동 저하 모드)
npm run build:engine && npm run start:engine   # 로컬 데이터 플레인 엔진
```

## 3. 테스트 스위트

릴리스 전에 `npm test`로 실행되며 다음을 포괄합니다.

1. 게이트웨이 동작과 저하(`test-sonic-gateway.mjs`, `test-local-engine-and-degradation.mjs`);
2. 인증 호환성과 OAuth 보안(`test-auth-compatibility.mjs`, `tests/oauth-security.test.ts`);
3. SSRF와 보안 하드닝(`tests/ssrf-security.test.ts`, `tests/security*.test.ts`);
4. 추천과 검색(`tests/recommendation-and-search.test.ts`);
5. 프런트엔드 XSS(`tests/frontend-xss.test.ts`);
6. 구성 일관성. `.env.example`과 코드가 읽는 환경 변수를 항목별로 대조합니다(`tests/config-parity.test.ts`);
7. 릴리스 P0/P1 게이트(`tests/release-p0-p1-gate.test.ts`).

## 4. 문서 일관성 검증

본 사이트(sonicdocs)는 버전 발전에 따라 소스 코드와 대조되며, 검증 도구 체인은 다음과 같습니다.

```bash
pnpm validate    # 빌드 + 페이지 내 앵커 단절 링크 검사 + 다국어 구조 대칭 검증
```

1. `scripts/validate-anchors.cjs`: 사이트 전체의 페이지 내 앵커와 이미지 참조 단절 링크 0건;
2. `scripts/check-structure.py`: 다국어 버전의 제목/표/이미지/콜아웃 구조 1:1;
3. `doc/legal-reference.md`: GDPR 조 번호 인용 화이트리스트(EUR-Lex 검증 대장). 문서에 화이트리스트 밖의 조 번호가 나타나서는 안 됩니다;
4. 기술적 사실은 버전마다 소스 코드(`.env.example`, `server/recommend-sqlite.ts`, `functions/_lib/sonic/security.ts`)와 대조하여 갱신하며, 불일치하면 소스 코드를 우선하여 문서를 수정합니다.

## 5. 기여 참여

1. 이슈와 토론: GitHub 저장소 Issue(`github.com/shijianus/sonic`);
2. 제출 전에 전체 테스트 스위트와 `npm run lint`를 실행합니다;
3. 데이터 처리와 관련된 변경(수집 항목 추가, 보존 정책 변경, 제3자 공유 추가)은 본 사이트의 해당 문서를 동시에 갱신하고 일관성 검증을 거쳐야 합니다;
4. 제3자 의존성 도입 시 `THIRD_PARTY_NOTICES.md`를 갱신하고 프라이버시와 라이선스 영향을 평가해야 합니다.

## 6. 문서 번역 기여

본 사이트는 다국어 대조 구조입니다. 어느 언어의 수정이든 나머지 언어와 동기화해야 합니다(구조 1:1은 스크립트가 검증합니다). 새 언어를 추가할 때는 locale을 등록하고 전체 문서를 완성하며, 구조 스크립트의 언어 목록에 추가하고 `doc/legal-reference.md`의 해당 언어 인용 형식에 따라 법조문 인용을 대조하십시오.
