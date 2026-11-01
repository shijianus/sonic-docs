---
title: 오픈 플랫폼과 API 접속
description: Sonic 개방 API 접속, 공통 응답 구조, 엔드포인트 안내, API Key 인증과 전달 규범, 요청 제한과 폐기.
---

**시행일: 2026년 11월 2일｜버전: 1.5**

이 페이지는 Sonic 개방 API의 접속 방식을 설명합니다. 공통 응답 구조, 핵심 엔드포인트, API Key 인증과 전달 규범, 요청 제한과 폐기입니다. 접속 행위는 [이용약관](/ko/terms-of-service/)과 [허용 가능 사용 정책](/ko/acceptable-use/)의 구속을 받으며, 엔드포인트 사양에 대한 권위 있는 서술은 업스트림 저장소의 `API.md`에 있습니다.

## 1. 공통 응답 구조

모든 엔드포인트는 대외적으로 `brand: "Sonic"` 호환성 계약을 약속하며 표준 응답은 다음과 같습니다.

```json
{
  "brand": "Sonic",
  "data": { "id": "191254", "title": "红豆", "quality": "320k" },
  "meta": {
    "cached": true,
    "cacheLevel": "edge",
    "provider": "nexus",
    "degraded": false,
    "circuitState": "CLOSED"
  }
}
```

`meta` 필드는 캐시 계층, 제공자, 저하 상태와 서킷 브레이커 상태를 사실대로 표기하므로, 클라이언트는 이를 근거로 투명한 안내를 표시할 수 있습니다.

## 2. 핵심 엔드포인트 안내

| 분류 | 메서드 | 엔드포인트 | 기능 |
| --- | --- | --- | --- |
| 스마트 추천 | GET | `/api/sonic/recommend/for-you` | 당신을 위한 추천/Auto DJ |
| | GET | `/api/sonic/recommend/trending` | 트렌드 차트(24h/7d/surging/new) |
| | GET | `/api/sonic/recommend/similar` | 유사 곡/가수 탐색 |
| | GET | `/api/sonic/recommend/discover` | 장르 레이더 |
| 행동 이벤트 | POST | `/api/sonic/events` | 행동 이벤트 보고(한 배치 최대 50건) |
| | GET | `/api/sonic/events` | 추천 프로필 개요 조회 |
| | DELETE | `/api/sonic/events` | 원클릭 개인 프로필 삭제 |
| 애그리게이션 검색 | GET | `/api/sonic/search/smart` | 스마트 하이브리드 검색과 자동 완성 |
| | GET | `/api/sonic/search/nexus` | 전방위 멀티 소스 병렬 검색 |
| 동적 가사 | GET | `/api/sonic/lyrics/nexus` | 글자 단위 가사(YRC/QRC/KRC → AMLL → LRCLIB) |
| | GET | `/api/sonic/lyrics/sync` | 교차 플랫폼 싱크 가사(다중 형식 출력) |
| 오디오 미디어 | GET | `/api/music/stream` | 오디오 분할 프록시(Range/206, `?mode=redirect` 직접 연결) |
| | GET | `/api/music/cover` | 커버 프록시(고화질 우선, SVG 폴백) |
| | GET | `/api/music/palette` | 커버 색온도 분석 |
| 인증 | GET | `/api/auth/user` | 현재 세션 정보 |
| | GET/POST | `/api/auth/key` | API Key 조회/재발급 |
| | POST | `/api/auth/revoke` | 현재 키 폐기(명시적 키 헤더 필요) |
| | POST | `/api/auth/logout` | 로그아웃 및 세션 폐기 |

## 3. API Key 인증

1. 형식: `sonic_live_v2.<header>.<payload>.<signature>` 버전 관리 형식에 HMAC-SHA256 서명. 페이로드에는 `sub`(이메일), `iat`, `exp`, `jti`, `kid`, `role`, `uid`가 포함됩니다.
2. 발급: Epomail OAuth 로그인 후 `/api/auth/key`로 취득합니다. 발급 유효 기간은 30일, 검증 상한은 90일입니다.
3. 전달: 요청 헤더만 허용됩니다. `X-Sonic-Key: <key>` 또는 `Authorization: Bearer <key>`. URL 쿼리 매개변수 채널은 완전히 제거되어 키가 액세스 로그, 브라우저 기록, Referer로 유출되는 것을 막습니다.
4. 검증: 서버는 Web Crypto 상수 시간 비교를 사용하고 버전, `kid`, `iat`/`exp`, `jti`와 폐기 목록을 엄격히 검사합니다. 서명 없는 키와 구버전 키는 일괄 거부합니다(fail-closed).

## 4. 요청 제한과 폐기

| 항목 | 상한 |
| --- | --- |
| 익명 요청 | 분당 240회(기본값) |
| 인증 요청 | 분당 600회(기본값) |
| 인증 엔드포인트 | 분당 IP당 30회 |
| 행동 이벤트 보고 | 한 배치 최대 50건, 요청 본문 64 KB |

폐기 메커니즘: 로그아웃하면 현재 세션과 `jti`가 즉시 폐기됩니다. 배포자는 `SONIC_REVOKED_JTIS`/`SONIC_REVOKED_SUBS`/`SONIC_TOKEN_MIN_IAT` 정적 목록을 구성하거나 KV를 바인딩해 즉시 폐기를 켤 수 있습니다. 정상적인 개인 사용은 요청 제한에 닿지 않으며, 지속 초과 시 [허용 가능 사용 정책](/ko/acceptable-use/)의 집행 사다리로 진입합니다.

## 5. 접속자 의무

1. API Key는 개인 자격 증명이므로 제3자에게 넘기거나 공개 배포 클라이언트에 내장할 수 없습니다.
2. 자체 구축 클라이언트는 요청 제한을 존중하고 저하 안내(`X-Sonic-Degraded: 1`)를 표시하며 [허용 가능 사용 정책](/ko/acceptable-use/)의 금지 행위 목록을 준수해야 합니다.
3. 제3자 클라이언트 접속 시 최종 사용자에 대한 고지 의무는 접속자가 부담합니다. 셀프 호스팅 인스턴스의 API 사용자는 [오픈 소스와 셀프 호스팅 법률](/ko/open-source/)도 함께 읽어 주십시오.
