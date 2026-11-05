---
title: 배포 가이드
description: Sonic 배포 가이드, Cloudflare Pages 엣지 게이트웨이와 Linux 로컬 엔진의 두 가지 방안, 환경 변수, 백업과 복구, 헬스 체크와 롤백.
---

**개정일: 2026년 11월 3일｜버전: 1.9**

이 페이지는 함께 구성하는 엣지 게이트웨이와 데이터 엔진, 환경 변수, 백업·복구를 설명합니다. 2026-11-02에 검토한 최신 공개 후보 브랜치(RC) `rc/sonic-20261031@a75f5cb`(2026-11-01 UTC)가 기준이며, 아래 명령은 해당 커밋에 고정합니다. 정식 GitHub Release가 아니며 실제 서비스 버전과 운영 결과는 확인되지 않았습니다. 이전 `main@ce443c8`(2026-10-27 UTC)과는 구성·인증·저장 처리가 다르므로 같은 절차나 보호를 가정할 수 없습니다. 소스 검토는 실제 배포나 운영 결과를 보증하지 않습니다. 처리 목적과 수단을 결정하는 실제 운영자는 자신의 고지와 의무를 이행해야 하며, 코드 작성자가 모든 배포의 운영자가 되는 것은 아닙니다([오픈 소스와 셀프 호스팅 법률](/ko/open-source/) 참조). 아래 명령은 설치 예시이지 공개 운영의 적법성 확인이 아닙니다. 세부 사항은 해당 버전의 `docs/OPERATIONS.md`와 대조하십시오.

## 1. 방안 A: Cloudflare Pages 엣지 게이트웨이

```bash
git clone git@github.com:shijianus/sonic.git
cd sonic
git checkout --detach a75f5cb54a2fe3593ba0da72b7ee9b1cc5c410a8
corepack enable
corepack prepare pnpm@10.34.5 --activate
npm ci
pnpm --dir player install --frozen-lockfile
npm run build
npx wrangler pages deploy dist --project-name YOUR_PROJECT_NAME
```

명령을 실행하기 전에 `YOUR_PROJECT_NAME`을 실제 Pages 프로젝트 이름으로 바꾸십시오. Cloudflare Pages 관리 화면에서 암호화 환경 변수를 구성합니다. `SONIC_SECRET`, `SONIC_ENGINE_SECRET`(VPS 측과 일치), `SONIC_LOCAL_ENGINE_URL`(사용자의 데이터 플레인 터널 도메인을 가리킴).

## 2. 방안 B: Linux 로컬 프로토콜 엔진(Docker Compose)

```bash
mkdir -p /opt/sonic && cd /opt/sonic
git clone git@github.com:shijianus/sonic.git .
git checkout --detach a75f5cb54a2fe3593ba0da72b7ee9b1cc5c410a8
cp .env.example .env
chmod 600 .env    # 강력한 무작위 SONIC_ENGINE_SECRET과 SONIC_SECRET을 기입
docker compose up -d --build
docker compose ps
curl -H "X-Sonic-Engine-Key: <YOUR_SECRET>" http://127.0.0.1:8080/api/sonic/engine/health
```

스택 구성: sonic-engine 메인 컨테이너(호스트에는 `127.0.0.1:8080`만 매핑), 내부망에 닫힌 ncm-api 보조 컨테이너, SQLite 영구 저장(네임드 볼륨 `sonic-data`). 데이터 플레인은 Cloudflare Tunnel로 연결되며 공인망에 직접 노출되지 않습니다.

## 3. 핵심 환경 변수

| 변수 | 설명 |
| --- | --- |
| `SONIC_SECRET` | API Key 서명 시크릿. 길이 32문자 이상(`openssl rand -base64 48`) |
| `SONIC_ENGINE_SECRET` | 서비스 간 시크릿. Pages와 VPS 양측에서 일치 |
| `SONIC_LOCAL_ENGINE_URL` | 데이터 플레인 터널 주소 |
| `SONIC_ENABLE_NETEASE/QQ/KUGOU/KUWO` | 내장 음원 프로토콜 스위치(기본 1) |
| `SONIC_ENABLE_AMLL/LRCLIB` | 가사 보완 스위치(기본 1) |
| `SONIC_ENABLE_GDSTUDIO/LYRIVA/UNBLOCK` | GDStudio는 코드에서 변수 미설정 시 ON, `.env.example`·Compose는 명시적으로 OFF입니다. 각 경로를 개별 확인하고 권한 없는 접근·보호 우회를 활성화하지 마십시오 |
| `SONIC_RECOMMEND_DB_PATH` | 추천 저장 경로. Compose는 `/app/data/sonic-recommend.sqlite`; 메모리 대체가 로그·원격 시스템의 무저장을 뜻하지는 않음 |
| `SONIC_RECOMMEND_RETENTION_DAYS` | 기본 90, 하한 7; 시작 시 일부 정리에 적용되나 1,500회 행동 쓰기 정리는 고정 90일 경로를 사용  |
| `SONIC_RATE_LIMIT_ANON_RPM / AUTH_RPM` | 요청 제한(기본 240/600); IP 기반 키도 처리됨 |
| `EPOMAIL_BASE_URL` 등 | Epomail OAuth(PKCE) 구성; 세션·토큰 기본 30일, 폐기 KV·스위치와 성공 응답 별도 확인  |

전체 목록은 해당 버전의 `.env.example`과 코드를 대조하십시오. 일부 KuGou·Kuwo 상류 요청은 HTTP를 사용하며, 엣지는 구성된 엔진에 클라이언트 IP·Cookie·Authorization·선호 맥락을 전달할 수 있습니다. 오디오 프록시와 별개로 Google Fonts, 이메일을 seed로 쓰는 DiceBear 아바타, MV·커버의 브라우저 직접 연결도 확인해야 합니다. Gorse·Meilisearch 등 선택적 외부 서비스의 실제 수신 데이터와 TLS 구성도 별도로 점검하십시오([제3자 공유 및 전송 목록](/ko/sub-processors/) 참조).

## 4. 백업과 복구

1. 백업: `npm run backup:db`의 `VACUUM INTO`는 전체 데이터베이스를 복사합니다. 가명 처리도 개인정보 보호 대상이며 통일된 백업 만료 작업은 확인되지 않았습니다. 접근 제한, 필요한 보존 기한과 폐기 절차를 별도로 수립하십시오.
2. 복구: 서비스를 중단하고 호환성을 확인한 뒤 `npm run restore:db`를 사용하십시오. 복구 전 스냅샷도 남을 수 있고, 삭제 기록의 자동 재적용은 확인되지 않았습니다. 과거에 삭제한 자료가 복원되어 다시 사용되지 않도록 절차를 마련해야 합니다.
3. 용량과 보존: 시작 시 구성값과 일부 쓰기 시 고정 90일 정리는 서로 다릅니다. 정기 타이머가 확인되지 않았고 레이더·검색 집계·외부 저장소는 전체 포함되지 않습니다. SQL 삭제는 WAL·빈 페이지·백업의 물리 파기를 뜻하지 않으므로 실제 정리 범위와 보존 기한을 검증하십시오.

## 5. 헬스 체크와 롤백

1. 헬스 체크: `GET /api/sonic/engine/health`(서비스 시크릿 필요)가 엔진과 서킷 브레이커 상태를 반환합니다. 엣지 측 서킷 브레이커는 데이터 플레인의 연속 실패에 자동으로 저하합니다.
2. 로그: 일반 Node 액세스 로그는 경로·메서드·상태·소요 시간 위주로 최소화하지만 `docker compose logs` 전체나 오류·sidecar·프록시·호스트·Cloudflare·제3자의 무기록을 보장하지 않습니다. IP 기반 요청 제한 키와 엔진 전달도 별도 처리이므로 실제 로그 항목·권한·회전·보존을 확인하십시오.
3. 롤백: Pages 측은 이전 배포 버전으로 롤백하면 됩니다. 데이터 플레인은 `git checkout`으로 이전 태그로 전환한 뒤 `docker compose up -d --build`를 다시 실행합니다. 롤백 전에 SQLite 스키마 호환성을 확인하십시오(마이그레이션 프레임워크 없음).

## 6. 배포자 점검 목록

서비스 시작 전에 항목별로 확인하십시오.

1. 두 시크릿을 강한 무작위 값으로 설정하고 키·파일 권한을 제한하십시오. PKCE·서명·기본 30일 세션과 별개로 실제 만료·폐기 및 복사된 토큰의 처리 결과를 확인하십시오.
2. 실제 활성 제3자 경로와 직접 로드되는 폰트·아바타·이미지를 확인하십시오. 필요 없는 경로를 중단하고 이메일 seed와 안전하지 않은 HTTP 전송을 개선하십시오.
3. 개인화·Auto DJ 기본 켜짐과 사전 동의 부재를 수정하고 필요한 선택 전에는 선택적 식별자 생성·전송을 막으십시오. 끄기·시크릿 모드·설정 초기화만으로 일반 검색·공개 검색어 재사용·모든 호출이 멈춘다고 가정하지 마십시오.
4. 실제 네트워크 노출과 노드 국가를 확인하십시오. 레이더는 원격 업로드를 시도하지만 표준 Node 라우트가 빠져 있어 성공 응답이나 SQLite 테이블만으로 영구 동기화를 보장할 수 없습니다.
5. 현재 신원만의 부분 삭제와 거짓 성공 표시를 개선하고 이전 익명 신원·레이더·검색 집계·외부 추천·백업의 삭제 및 복구 후 재적용을 마련하십시오. 로컬 삭제는 HttpOnly 쿠키 삭제나 로그아웃이 아니며 보존 설정도 정확한 시점의 파기 보장이 아닙니다.
6. 실제 운영자 신원·연락처·수신자·기한·이전 근거를 공개하십시오. GDPR 적용은 제3조에 따라 판단하고, EU 대표·DPO·DPIA·처리 기록은 각 요건을 검토하십시오. 필요한 조건이 갖춰지지 않은 선택적 처리는 중단해야 하며 정책 게시만으로 적법해지지 않습니다([오픈 소스와 셀프 호스팅 법률](/ko/open-source/) 참조).
