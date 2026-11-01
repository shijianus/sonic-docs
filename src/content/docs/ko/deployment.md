---
title: 배포 가이드
description: Sonic 배포 가이드, Cloudflare Pages 엣지 게이트웨이와 Linux 로컬 엔진의 두 가지 방안, 환경 변수, 백업과 복구, 헬스 체크와 롤백.
---

**시행일: 2026년 11월 1일｜버전: 1.4**

이 페이지는 Sonic 셀프 호스팅의 두 가지 방안, 핵심 환경 변수, 백업과 복구, 운영 요점을 설명합니다. 배포 시점부터 배포자는 자신의 사용자의 데이터 컨트롤러이며 관련 의무는 [데이터 처리 및 보안 유지](/ko/data-security/) 6절과 [오픈 소스와 셀프 호스팅 법률](/ko/open-source/)에 있습니다. 조작 세부 사항에 대한 권위 있는 서술은 업스트림 저장소 `docs/OPERATIONS.md`에 있습니다.

## 1. 방안 A: Cloudflare Pages 엣지 게이트웨이

```bash
git clone git@github.com:shijianus/sonic.git
cd sonic
corepack enable
corepack prepare pnpm@10.34.5 --activate
npm ci
pnpm --dir player install --frozen-lockfile
npm run build
npx wrangler pages deploy dist --project-name <프로젝트 이름>
```

Cloudflare Pages 관리 화면에서 암호화 환경 변수를 구성합니다. `SONIC_SECRET`, `SONIC_ENGINE_SECRET`(VPS 측과 일치), `SONIC_LOCAL_ENGINE_URL`(사용자의 데이터 플레인 터널 도메인을 가리킴).

## 2. 방안 B: Linux 로컬 프로토콜 엔진(Docker Compose)

```bash
mkdir -p /opt/sonic && cd /opt/sonic
git clone git@github.com:shijianus/sonic.git .
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
| `SONIC_ENABLE_GDSTUDIO/LYRIVA/UNBLOCK` | 제3자 애그리게이션과 유료 우회(기본 0, 실제로 필요한 경우가 아니면 반드시 꺼 둠) |
| `SONIC_RECOMMEND_DB_PATH` | 행동 데이터의 디스크 저장 경로. `memory`로 설정하면 디스크 저장 해제 |
| `SONIC_RECOMMEND_RETENTION_DAYS` | 행동 이벤트 보존 일수(기본 90, 하한 7) |
| `SONIC_RATE_LIMIT_ANON_RPM / AUTH_RPM` | 요청 제한(기본 240/600) |
| `EPOMAIL_BASE_URL` 등 | Epomail OAuth 구성 |

전체 목록은 업스트림 저장소의 `.env.example`에 있습니다. 프라이버시 관련 스위치의 고지 일치성 요건은 [데이터 처리 및 보안 유지](/ko/data-security/) 6절을 참조하십시오.

## 4. 백업과 복구

1. 백업: 일관성 스냅샷 스크립트로 `VACUUM INTO`를 무결성 검사와 함께 실행합니다(`npm run backup:db`). 백업 파일에는 가명 처리된 행동 데이터가 있으므로 운영 데이터와 동등한 수준으로 보호해야 합니다.
2. 복구: 서비스를 중단한 뒤 복구 스크립트로 스냅샷을 복원합니다(`npm run restore:db`). 저장소에는 버전 관리 마이그레이션 프레임워크가 없으므로 복구 대상 버전은 백업 버전과 일치해야 합니다.
3. 용량: 행동 이벤트는 90일 보존 주기로 자동 정리되며, 데이터베이스는 곡 표준 데이터와 함께 커지므로 볼륨 공간에 유의하십시오.

## 5. 헬스 체크와 롤백

1. 헬스 체크: `GET /api/sonic/engine/health`(서비스 시크릿 필요)가 엔진과 서킷 브레이커 상태를 반환합니다. 엣지 측 서킷 브레이커는 데이터 플레인의 연속 실패에 자동으로 저하합니다.
2. 로그: 엔진 측 액세스 로그에는 경로, 메서드, 상태 코드, 소요 시간만 포함됩니다(`docker compose logs`). 쿼리 문자열, IP, Cookie, 요청 본문은 기록하지 않습니다.
3. 롤백: Pages 측은 이전 배포 버전으로 롤백하면 됩니다. 데이터 플레인은 `git checkout`으로 이전 태그로 전환한 뒤 `docker compose up -d --build`를 다시 실행합니다. 롤백 전에 SQLite 스키마 호환성을 확인하십시오(마이그레이션 프레임워크 없음).

## 6. 배포자 점검 목록

서비스 시작 전에 항목별로 확인하십시오.

1. 두 시크릿이 모두 강력한 무작위 값이고 길이 32문자 이상이며 `.env` 권한이 600입니다.
2. 제3자 경로 스위치가 사용자의 프라이버시 고지와 일치합니다(켜지 않은 것은 고지에서 삭제).
3. 행동 이벤트 보존 일수와 디스크 저장 경로가 사용자의 정책 약속에 부합합니다.
4. 데이터 플레인은 터널로만 도달 가능하며 호스트 포트가 공인망에 열려 있지 않습니다.
5. 백업 계획과 복구 훈련을 수립했습니다.
6. 사용자에게 고지 문안을 게시했습니다(본 사이트 [개인정보 처리방침](/ko/privacy-policy/)을 기초로 삼을 수 있습니다).
