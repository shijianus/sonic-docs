---
title: 오픈 플랫폼과 API 접속
description: Sonic 개방 API 접속, 공통 응답 구조, 엔드포인트 안내, API Key 인증과 전달 규범, 요청 제한과 폐기.
---

**개정일: 2026년 11월 2일｜버전: 1.8**

이 페이지는 Sonic API의 응답 예시, 엔드포인트, 인증·요청 제한·폐기를 설명합니다. 2026-11-02에 최신 공개 후보 브랜치(RC) `rc/sonic-20261031@a75f5cb`(2026-11-01 UTC)를 검토했습니다. 이는 정식 GitHub Release가 아니며 실제 배포·가용성·호환성을 보장하지 않습니다. 이전 `main@ce443c8`(2026-10-27 UTC)과는 API·인증 구현이 다르므로 같은 기능이나 보호 조치를 가정할 수 없고, 실제 서비스 버전은 알 수 없습니다. RC의 기본 세션 발급 유효 기간은 30일이며, 90일은 검증기의 허용 상한일 뿐 재발급 시 90일로 연장된다는 뜻이 아닙니다. 서비스 조건과 행동 경계는 [이용약관](/ko/terms-of-service/)과 [허용 가능 사용 정책](/ko/acceptable-use/)을 참조하십시오. API 접속이나 로그인만으로 모든 처리에 동의한 것으로 간주하지 않습니다. 상세 사양은 해당 버전의 `API.md`와 구현을 대조하십시오.

## 1. 공통 응답 구조

일부 JSON 엔드포인트는 `brand: "Sonic"`과 `data`·`meta` 필드를 사용합니다. 아래는 예시이며, 미디어·리다이렉트·인증 응답까지 같은 형식이나 영구 호환성을 보장하지는 않습니다.

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
| 행동 이벤트 | POST | `/api/sonic/events` | 행동 이벤트 보고(한 배치 최대 50건)  |
| | GET | `/api/sonic/events` | 현재 신원의 제한된 프로필 요약; 전체 사본·내보내기 아님  |
| | DELETE | `/api/sonic/events` | 현재 신원의 일부 이벤트·피드백 삭제 시도; 전체 삭제 아님  |
| 애그리게이션 검색 | GET | `/api/sonic/search/smart` | 스마트 검색; 검색어 집계와 공개 제안 경로가 있음 |
| | GET | `/api/sonic/search/nexus` | 전방위 멀티 소스 병렬 검색 |
| 동적 가사 | GET | `/api/sonic/lyrics/nexus` | 글자 단위 가사(YRC/QRC/KRC → AMLL → LRCLIB) |
| | GET | `/api/sonic/lyrics/sync` | 교차 플랫폼 싱크 가사(다중 형식 출력) |
| 오디오 미디어 | GET | `/api/music/stream` | 오디오 분할 프록시(Range/206, `?mode=redirect` 직접 연결) |
| | GET | `/api/music/cover` | 커버 프록시(고화질 우선, SVG 폴백) |
| | GET | `/api/music/palette` | 커버 색온도 분석 |
| 인증 | GET | `/api/auth/user` | 현재 세션 정보 |
| | GET/POST | `/api/auth/key` | API Key 조회/재발급 |
| | POST | `/api/auth/revoke` | 현재 키 폐기(명시적 키 헤더 필요) |
| | POST | `/api/auth/logout` | 현재 쿠키 정리와 서버 측 폐기 시도 |

HTTP 성공이나 `ok`만으로 완전한 처리를 확인할 수 없습니다. 이벤트 삭제는 이전 익명 신원·레이더·검색 집계·외부 추천·백업을 포괄하지 않으며, 로컬 대체 저장소만 정리된 경우에도 성공 응답이 나올 수 있습니다. 이벤트 API가 15종 action을 받는다고 해서 모든 프런트엔드 경로에서 전송한다는 뜻도 아닙니다. 레이더의 별도 동기화 경로는 표준 Node 디스패처에 등록되지 않아 영구 저장·기기 간 복원을 보장하지 않습니다. 전체 사본·원격 삭제는 `privacy@epocanvas.com`으로 요청하십시오.

## 3. API Key 인증

1. 형식: `sonic_live_v2.<header>.<payload>.<signature>` 형식에 HMAC-SHA256 서명을 사용합니다. 페이로드에는 `sub`(이메일), `iat`, `exp`, `jti`, `kid`, `role`, `uid`가 포함됩니다. 서명은 무결성 확인이지 암호화가 아니므로 토큰 전체를 비밀로 취급하십시오.
2. 발급: Epomail OAuth(PKCE) 로그인 후 `/api/auth/key`로 취득합니다. 확인한 공개 RC의 기본 발급 유효 기간은 30일이며, 90일은 검증기가 허용하는 상한이지 재발급 기간이 아닙니다. 실제 배포의 설정과 만료 필드를 별도로 확인해야 합니다.
3. 전달: `X-Sonic-Key: <key>` 또는 `Authorization: Bearer <key>` 요청 헤더를 사용합니다. 쿼리로 전달하는 방식은 지원하지 않습니다. 헤더 전용이라도 프록시·오류 로그나 클라이언트 코드에 노출되지 않도록 관리해야 합니다.
4. 검증: 버전, 서명, `kid`, `iat`/`exp`, `jti` 등을 검사하는 코드가 있습니다. 서버 측 폐기 확인은 KV·정적 목록 등 실제 설정에 달려 있으며 모든 인스턴스에서 즉시 무효화된다는 보장은 아닙니다.

## 4. 요청 제한과 폐기

| 항목 | 상한 |
| --- | --- |
| 익명 요청 | 분당 240회(기본값) |
| 인증 요청 | 분당 600회(기본값) |
| 인증 엔드포인트 | 분당 IP당 30회 |
| 행동 이벤트 보고 | 한 배치 최대 50건, 요청 본문 64 KB |

폐기 메커니즘: 로그아웃은 현재 쿠키 정리와 서버 측 폐기 시도를 구분해야 합니다. `SONIC_REVOKED_JTIS`/`SONIC_REVOKED_SUBS`/`SONIC_TOKEN_MIN_IAT` 정적 설정이나 KV와 폐기 스위치, 요청 결과 및 캐시 전파에 따라 복사된 토큰이 계속 유효할 수 있습니다. 로컬 데이터 삭제는 HttpOnly 쿠키 삭제나 로그아웃을 대신하지 않습니다. 요청 제한은 설정과 공유 IP 등에 영향을 받으므로 응답 상태를 확인하고 재시도 간격을 늘리십시오. 조치 기준은 [허용 가능 사용 정책](/ko/acceptable-use/)을 참조하십시오.

## 5. 접속자 의무

1. API Key는 개인 자격 증명이므로 제3자에게 넘기거나 공개 배포 클라이언트에 내장할 수 없습니다.
2. 자체 구축 클라이언트는 요청 제한을 존중하고 저하 안내(`X-Sonic-Degraded: 1`)를 표시하며 [허용 가능 사용 정책](/ko/acceptable-use/)의 금지 행위 목록을 준수해야 합니다.
3. 제3자 클라이언트는 자신의 처리 목적·전송·수신자·보존을 고지하고 필요한 선택을 별도로 받아야 합니다. 현재 기본 켜짐이나 서버의 `anonymous-opt-in` 표시는 동의의 증거가 아닙니다. 개인화를 꺼도 검색어 집계·공개 제안·일반 호출이 중단되지 않으며 검색어와 해시도 익명 데이터로 단정할 수 없습니다. 오디오 프록시 밖의 이미지·MV·폰트·이메일 아바타 연결과 일부 상류 HTTP 경로를 확인하십시오. 각 운영자의 실제 역할은 [오픈 소스와 셀프 호스팅 법률](/ko/open-source/)을 참조하십시오.
