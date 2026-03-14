<img width="2102" height="598" alt="image" src="https://github.com/user-attachments/assets/0a3777d1-d0e4-42e1-a98b-ef7f4e555b87" />

# 💊 다약 - 스마트 복약 관리 및 의약품 정보 플랫폼

![Project Status](https://img.shields.io/badge/Status-Active-brightgreen) ![License](https://img.shields.io/badge/License-MIT-blue)

> **"복잡한 약, 잊지 말고 챙기세요."**
> 사용자의 복약 스케줄을 관리하고, 주변 약국 및 의약품 정보를 쉽고 빠르게 제공하는 헬스케어 웹 서비스입니다.


## 설치방법 
1. git clone 을 해주세요
2. 프론트에서 터미널을 열고 npm install 을 해주세요
3. 각각에 필요한 yml, Docker-compose 파일들은 첨부해 놓았습니다
4. yml, Docker-compose, Dokerfile 에서 연결할려는 서비스를 입력해주세요
5. Docker-compose 에서 서비스가 다르면 들어가는 시크릿키가 상이할 수 있습니다

---
## NEXT STEP ( 업데이트 예정 및 계획 ) 
1.Elasticsearch: "구글 같은 검색 기능" <br>
2.Prometheus & Grafana: "서버 모니터링 시각화" <br>


---

## 업데이트 (2026-03-11)
1.redis-cahching 업데이트 
<img width="975" height="329" alt="image" src="https://github.com/user-attachments/assets/0c22a479-a73e-404f-bebf-943d101acb76" /> <br>

-[Performance: Implementing Distributed Caching with Redis]

내용: 반복적인 DB 인덱스 스캔 및 쿼리 부하를 줄이기 위해 Redis 기반 Cache-aside 계층 구축. <br>
이점:
> 평균 쿼리 응답 속도 개선 (In-memory 조회). <br>
> DB(RDS) 커넥션 부하 분산.

관리: @CacheEvict를 통한 데이터 정합성 유지 및 TTL 설정을 통한 메모리 관리 자동화.



## 📖 목차
1. [프로젝트 개요](#-프로젝트-개요)
2. [기술 스택](#-기술-스택)
3. [핵심 기능](#-핵심-기능)
4. [시스템 아키텍처](#-시스템-아키텍처)
5. [🔥 기술적 도전 & 트러블슈팅 (핵심)](#-기술적-도전--트러블슈팅)

---

## 💡 프로젝트 개요
바쁜 현대인들이 처방받은 약을 제때 복용하지 못하는 문제를 해결하기 위해 기획했습니다. 단순한 알람을 넘어, **사용자 친화적인 캘린더 UI**를 통해 복용 현황을 시각화하고, **위치 기반 약국 찾기**와 **의약품 식별 검색** 기능을 통합하여 의약품 관련 올인원 솔루션을 목표로 개발했습니다.

* **개발 기간**: 2024.2.4 ~ 2026.2.24 (약 3주)
* **개발 인원**: 1명 (Full Stack 개발 주도)
* **배포 URL**: http://168.107.15.125/

---

## 🛠 기술 스택

### **Frontend**
* **Framework**: Next.js 14 (App Router)
* **Language**: TypeScript
* **Styling**: CSS Modules, Custom Responsive Design (Foldable Support)
* **State Management**: React Hooks (`useState`, `useEffect`, `Context API`)
* **Libraries**: Axios, jwt-decode, Moment.js

### **Backend**
* **Framework**: Spring Boot 3.x
* **Language**: Java 17
* **Database**: MySQL 8.0 (AWS RDS / Oracle Cloud)
* **Security**: Spring Security, JWT (Json Web Token)
* **ORM**: JPA (Hibernate)

### **DevOps & Infrastructure**
* **Server**: Oracle Cloud Infrastructure (OCI) Compute Instance
* **Container**: Docker, Docker Compose
* **Web Server**: Nginx (Reverse Proxy)
* **CI/CD**: GitHub Actions (Automated Deployment)

---

## 🌟 핵심 기능

1.  **💊 스마트 복약 캘린더**
  <img width="842" height="727" alt="image" src="https://github.com/user-attachments/assets/7c7cfbe3-5d29-428b-85b9-da2c54db3f6a" />

    * 월별/주별 복약 수행도 시각화
    * 복용 완료/미복용 상태 토글 기능
    * **폴더블폰(Galaxy Fold 6) 커버 디스플레이 대응 반응형 UI 구현**
2.  **🏥 위치 기반 약국 찾기**
  <img width="1023" height="1065" alt="image" src="https://github.com/user-attachments/assets/2aaef0df-3ed0-47d3-ba46-b06338eab684" />

    * 사용자 위치에 맞는 약국 도/시 군으로 분류해 DB 데이터에서 찾기 가능
    * 공공데이터포털 API 연동
3.  **🔍 의약품 통합 검색**
  <img width="1076" height="1064" alt="화면 캡처 2026-02-22 153844" src="https://github.com/user-attachments/assets/92d0bf77-001c-4675-83c6-b628c5987a3a" />

    * 낱알 식별 검색 (모양, 색상으로 약 찾기)
    * 일반/전문의약품 상세 정보 조회
      
4.  **🛡️ 관리자 대시보드 (RBAC) 및 회원관리**
    * 사용자(Member) / 관리자(Admin/Master) 권한 분리
    * 공지사항, 게시판, 회원 관리 및 의약품 데이터 동기화
    * 소프트 삭제를 통한 회원관리, DB에서는 isDelete로 삭제된 회원을 제어하고, 재가입방지, 또한 연계된 글 삭제도 같이 이루어짐 
<img width="165" height="137" alt="image" src="https://github.com/user-attachments/assets/820899e0-6fd0-47b5-a85c-97bb6e960adf" />

## 🚀 주요 업데이트 사항 (2026.03)

프로젝트의 안정성과 사용자 경험을 향상시키기 위해 **API 문서 자동화** 및 **실시간 상담 시스템**을 도입하였습니다.

### 1. API 문서 자동화 (Swagger / OpenAPI)
프론트엔드와 백엔드 간의 효율적인 협업을 위해 **Springdoc OpenAPI**를 구축하였습니다.

* **기술 스택**: Springdoc OpenAPI v2.8.5
* **주요 기능**:
    * **자동 문서화**: API 엔드포인트, 요청/응답 규격 자동 생성
    * **실시간 테스트**: Swagger UI를 통해 브라우저에서 즉시 API 호출 및 결과 확인
    * **JWT 인증 연동**: `Authorize` 설정을 통해 토큰이 필요한 보안 API도 직접 테스트 가능
<img width="787" height="863" alt="image" src="https://github.com/user-attachments/assets/5cc12f7b-3fdf-4d33-b8b8-199d6aab5c74" />



---

### 2. 웹소켓 기반 실시간 상담 시스템 (Admin Chat)
사용자와 관리자 간의 즉각적인 소통을 위해 **WebSocket**과 **STOMP** 프로토콜을 활용한 채팅 기능을 구현하였습니다.
<img width="400" height="597" alt="image" src="https://github.com/user-attachments/assets/ffdd1afe-ea85-4b0e-935a-b12491d132f9" />




#### 👤 사용자 인터페이스 (User-side)
* **회원 전용 서비스**: JWT 인증을 거친 로그인 사용자에게만 플로팅 상담 버튼이 활성화됩니다.
* **실시간 알림**: 새로운 메시지 수신 및 읽음 상태가 즉시 반영됩니다.
* **대화 이력 유지**: 채팅창을 닫거나 새로고침해도 과거 대화 내역이 자동으로 로드되어 연속성 있는 상담이 가능합니다.

#### 🛠 관리자 대시보드 (Admin-side)
* **상담 목록 관리**: 현재 접속 중인 모든 상담 요청 건을 리스트 형태로 관리합니다.
* **안 읽은 메시지 표시**: 유저별 미확인 메시지 개수를 실시간으로 노출하여 빠른 응대를 돕습니다.
* **상담 종료 제어**: 관리자가 상담을 종료하면 사용자 채팅창이 즉시 잠금 상태로 전환되는 운영 로직을 적용하였습니다.

#### ⚙️ 기술적 구현 특징
* **안정성**: `SockJS`를 사용하여 웹소켓을 지원하지 않는 환경에서도 안정적인 연결을 보장합니다.
* **UI/UX**: 카카오톡 테마를 모티브로 한 심플하고 직관적인 채팅 UI를 적용하였습니다.
* **보안**: CORS 설정을 통해 인가된 도메인(`http://168.107.15.125`)에서만 API 접근이 가능하도록 보안을 강화하였습니다.


---

## 🏗 시스템 아키텍처
<img width="1920" height="1080" alt="시스템 아키텍쳐" src="https://github.com/user-attachments/assets/ecd2492f-0abc-41a7-8c06-27a15e548173" />



---

## 🔥 기술적 도전 & 트러블슈팅

개발 과정에서 마주친 주요 기술적 난관과 이를 해결한 과정을 정리했습니다.

### 1. Nginx & Docker 환경에서의 413 Payload Too Large 문제
* **문제 상황**: 게시판에 고화질 이미지를 업로드할 때 `413 Request Entity Too Large` 에러 발생. Spring Boot 설정을 20MB로 늘렸음에도 해결되지 않음.
* **원인 분석**: 클라이언트 요청이 Spring Boot에 도달하기 전, **리버스 프록시인 Nginx의 기본 설정(1MB 제한)**에서 차단됨을 확인.
* **해결 과정**:
    1.  프로젝트 루트에 `nginx/default.conf` 파일을 생성하고 `client_max_body_size 20M;` 설정 추가.
    2.  `docker-compose.yml`에서 볼륨 마운트 설정 (`./nginx/default.conf:/etc/nginx/conf.d/default.conf`).
    3.  **Docker Volume 이슈 해결**: 초기 배포 시 호스트에 파일이 없어 Docker가 디렉토리로 인식하는 문제 발생 -> 컨테이너 재생성(`--build`) 및 파일 강제 생성으로 해결.
* **결과**: 대용량 이미지 업로드 기능 정상화 및 안정적인 Nginx 프록시 환경 구축.

### 2. JWT 토큰 기반 권한 관리(RBAC) 불일치 문제
* **문제 상황**: `MASTER` 권한을 가진 계정으로 로그인했음에도 프론트엔드 관리자 메뉴에 접근 권한이 없다는 메시지 출력.
* **원인 분석**:
    * 백엔드(Spring Security)는 권한 정보를 `auth` 키에 담아 보냄 (`auth: "MASTER"`).
    * 프론트엔드에서는 `jwt-decode`로 `decoded.role`을 참조하고 있어 `undefined`가 반환됨.
* **해결 과정**:
    1.  브라우저 콘솔에서 `JSON.parse(atob(token.split('.')[1]))`를 통해 페이로드 직접 분석.
    2.  `AdminDashboard.tsx` 및 `Header.tsx`의 권한 체크 로직을 `decoded.auth`를 참조하도록 수정.
    3.  `ROLE_` 접두사가 붙는 경우를 대비해 정규화 로직 추가.
* **결과**: 역할(Role)에 따른 메뉴 렌더링(Member, Admin, Master) 및 페이지 접근 제어 완벽 구현.

### 3. Next.js App Router와 Nginx 라우팅 충돌 해결
* **문제 상황**: `/admin/notice` 경로로 접근 시 404 에러 발생.
* **원인 분석**:
    * Next.js App Router 구조상 실제 파일 경로는 `/app/admin/notice/list/page.tsx`였으나, URL은 `/admin/notice`로 매핑 시도.
    * Nginx 설정에서 `try_files` 부재 및 Next.js의 클라이언트 사이드 라우팅 처리 미흡.
* **해결 과정**:
    * Nginx `location /` 블록에 `proxy_set_header` 설정을 강화하여 Next.js가 라우팅을 주도하도록 수정.
    * 대시보드 링크를 실제 물리적 경로인 `/admin/notice/list`로 수정하여 404 문제 해결.

## 주요 트러블슈팅 
### 🔐 OAuth 2.0 인증 및 외부 API 연동 이슈

서비스의 핵심인 '사용자 인증'과 '알림 기능'을 구현하며 마주친 문제들과 해결 과정입니다.

#### 1. 카카오 로그인: "증발하는 토큰을 잡아라" (Session Management)
> **문제 상황 (Problem)**
> 카카오 로그인을 구현했으나, Access Token의 수명이 다하면 사용자가 강제로 로그아웃되거나, 페이지 이동 시 인증이 풀리는 UX 저하 문제가 발생했습니다.
>
> **원인 분석 (Root Cause)**
> * OAuth 2.0의 인증 라이프사이클에 대한 이해 부족으로, 토큰 만료 시 **자동 갱신(Silent Refresh)** 로직이 누락됨.
> * 토큰을 단순히 로컬 스토리지에만 저장하여 보안 취약점(XSS) 존재.
>
> **해결 과정 (Solution)**
> * **Axios Interceptor 도입**: API 요청 시 `401 Unauthorized` 에러를 감지하면, 자동으로 Refresh Token을 사용해 Access Token을 재발급받고 요청을 재수행하는 인터셉터 구현.
> * **보안 강화**: Refresh Token을 탈취가 어려운 `HttpOnly Cookie`에 저장하도록 변경하여 보안성을 대폭 강화.
>
> **성과 (Result)**
> 끊김 없는(Seamless) 로그인 경험을 제공하고, 인증 보안 수준을 엔터프라이즈급으로 격상.

<br>

#### 2. 카카오톡 메시지: "보냈는데 왜 안 가니?" (API Scope & Permission)
> **문제 상황 (Problem)**
> 복약 알림 메시지를 카카오톡으로 전송하는 기능을 구현했으나, API 응답은 `200 OK`임에도 실제 메시지가 도착하지 않거나 `Permission Denied` 에러가 간헐적으로 발생했습니다.
>
> **원인 분석 (Root Cause)**
> * 카카오 개발자 센터(Developers Console) 내 **'동의 항목(Scope)'** 설정 누락.
> * '나에게 보내기'와 '친구에게 보내기' 권한이 분리되어 있음을 간과하고, 타겟 UUID 매핑을 잘못 설정함.
>
> **해결 과정 (Solution)**
> * **Scope 재설정**: `talk_message` 권한을 '사용 중'으로 변경하고, 사용자에게 추가 동의를 받도록 로그인 로직 수정.
> * **UUID 타겟팅 정교화**: 친구 목록 API를 통해 조회된 `uuid`를 정확히 바인딩하여, 메시지 발송 대상을 명확히 지정하는 로직으로 개선.
>
> **성과 (Result)**
> 복약 알림 메시지 전송 성공률 **99% 이상** 달성 및 안정적인 알림 서비스 구축.

<br>


#### 2. OCI 컴퓨팅과 로컬의 차이: "비동기작업의 도입" (API Scope & Permission)
> **문제 상황 (Problem)**
> 로컬 환경과 달리 자원이 제한된 OCI(Oracle Cloud Infrastructure) 환경에서 공공데이터 API를 통한 대량의 의약품/약국 데이터 동기화 시, 서버가 응답을 제때 주지 못해 Connection Timeout 에러가 빈번하게 발생함. <br>
> 동기(Synchronous) 방식으로 처리하다 보니 데이터베이스 쓰기 작업이 완료될 때까지 사용자의 HTTP 요청이 붙잡혀 있고, 결국 프론트엔드와 Nginx에서 설정된 타임아웃 시간을 초과하여 서비스가 중단되는 현상 확인.
>
> **원인 분석 (Root Cause)**
> 저사양 인스턴스의 CPU/메모리 한계로 인해 수천 건의 데이터 처리가 HTTP 응답 시간(보통 30~60초) 내에 완료되지 못함.<br>
> 사용자는 단순히 작업을 "요청"한 것인데, 시스템은 모든 처리가 "완료"될 때까지 응답을 주지 않는 구조적 결함 파악.<br>
>
> **해결 과정 (Solution)**
> 비동기(@Async) 도입: Spring의 @Async 어노테이션을 활용하여, 데이터 동기화 로직을 메인 요청 스레드가 아닌 별도의 백그라운드 스레드에서 처리하도록 구조 변경.<br>
> 사용자는 요청 즉시 "작업 시작" 응답을 받아 타임아웃 문제 해결.<br>
> 커스텀 AsyncConfig 구현: 저사양 서버의 안정성을 위해 스프링 기본 실행자 대신 ThreadPoolTaskExecutor를 직접 설정.<br>
> CorePoolSize(2), MaxPoolSize(5) 등 스레드 개수를 제한하여 CPU 과부하 방지.<br>
> QueueCapacity(50)를 설정하여 메모리(RAM) 부족(OOM)으로 인한 서버 다운 예방.<br>
>CallerRunsPolicy를 적용하여 큐가 꽉 찼을 때도 작업이 유실되지 않고 순차적으로 처리되도록 안전장치 마련.<br>
> 
> **성과 (Result)**
> 대용량 데이터 동기화 중에도 사용자 UI가 멈추지 않고 다른 기능을 정상적으로 이용 가능함.<br>
> 서버 리소스 점유율을 일정 수준 이하로 유지하며 안정적인 데이터 수집 환경 구축.<br>

<img width="1338" height="905" alt="화면 캡처 2026-02-21 170132" src="https://github.com/user-attachments/assets/75aa800f-9538-4d52-b1a5-389d18971adb" /><br>
<img width="1435" height="766" alt="화면 캡처 2026-02-22 145300" src="https://github.com/user-attachments/assets/62908c57-4e2a-446d-858b-98b27fe408ad" /><br>







