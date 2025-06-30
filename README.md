# React + TypeScript + Vite 프로젝트

이 프로젝트는 React와 TypeScript를 사용한 Vite 기반의 최소 설정으로, HMR(핫 모듈 리플레이스먼트)과 ESLint를 포함합니다. 다국어 지원, 사용자 인증, 가맹점 및 관광객을 위한 기능을 제공하는 웹 애플리케이션입니다.

## 목차
- [프로젝트 개요](#프로젝트-개요)
- [설치 및 설정](#설치-및-설정)
- [디렉토리 구조](#디렉토리-구조)
- [빌드 및 실행 명령어](#빌드-및-실행-명령어)
- [ESLint 설정](#eslint-설정)
- [레이아웃](#레이아웃)
- [header footer](#header-footer)
- [가맹점 고객](#가맹점-고객)
- [Tourist](#Tourist)

## 프로젝트 개요
이 프로젝트는 다국어 웹사이트를 위한 React + TypeScript 애플리케이션으로, Vite를 사용하여 빠른 개발 환경을 제공합니다. 주요 기능은 다음과 같습니다:
- **다국어 지원**: 한국어(`ko`), 영어(`en`), 중국어(`zh`), 일본어(`ja`)를 `i18n`으로 지원.
- **사용자 인증**: `localStorage`를 활용한 세션 관리.
- **가맹점 기능**: 인증된 사용자만 접근 가능한 메뉴(공지사항, 소모품 신청, 매뉴얼).
- **관광객 기능**: 환급 신청 및 조회.

## 설치 및 설정
프로젝트를 실행하기 위한 설치 절차는 다음과 같습니다:

1. **Node.js 설치**:
    - Node.js 18 이상을 사용합니다. `nvm`으로 설치:
      ```bash
      nvm install 18.20.5
      nvm use 18.20.5
      ```
1. **환경설정**:     
    - src/env-config.ts 파일에 환경 변수를 설정:
   ```
    - Google Maps API 키
    - GA 키
    - api url
    ```
## 빌드 및 실행 명령어
package.json에 정의된 스크립트를 사용하여 프로젝트를 빌드하고 실행할 수 있습니다:
 ``` json
{
"scripts": {
    "dev": "vite --mode development",
    "dev:local": "vite --mode local",
    "dev:dev": "vite --mode development",
    "dev:prod": "vite --mode production",
    "build": "tsc -b && vite build --mode development",
    "build:local": "tsc -b && vite build --mode local",
    "build:dev": "tsc -b && vite build --mode development",
    "build:prod": "tsc -b && vite build --mode production",
    "lint": "eslint .",
    "preview": "vite preview"
    }
}
  ``` 
# 개발 환경 실행 
``` bash
    npm run dev:local
```
# 프로덕션 빌드:
``` bash
    npm run build:prod
```
## 디렉토리 구조 
```plain
src/
├── api/
│   └── services/           # 도메인별 API 서비스
├── components/
│   ├── auth/
│   │   └── AuthComponent.tsx  # 인증 컴포넌트 (로그인 모달 제어)
│   └── layout/
│       ├── default/
│       │   ├── header.tsx  # 공통 헤더 컴포넌트
│       │   └── footer.tsx  # 공통 푸터 컴포넌트
├── hooks/                 # 커스텀 훅
├── i18n/
│   └── locales/           # 다국어 JSON 파일 (ko.json, en.json, zh.json, ja.json)
├── pages/
│   ├── index.tsx          # 루트 페이지 (리다이렉션 처리)
│   └── [lang]/            # 다국어 동적 라우팅 (ko, en, zh, ja)
│       ├── company/
│       │   └── notice/    # 회사 공지사항
│       ├── contact/       # 문의 페이지
│       ├── footer/
│       │   └── ethics-guide/  # 신문고 페이지
│       ├── franchise/
│       │   └── notice/    # 가맹점 공지사항 (한국어 전용)
│       ├── main/          # 메인 페이지
│       ├── pub/
│       │   └── components/
│       │       ├── common/   # 공통 컴포넌트 (Shadcn 사용)
│       │       └── layouts/
│       │           ├── main_layout.tsx    # 기본 레이아웃
│       │           ├── noinner_layout.tsx # 내부 콘텐츠 없는 레이아웃
│       │           └── set_layout.tsx     # 특수 레이아웃
│       ├── tax-refund/    # 세금 환급 서비스
│       └── traveler/
│           └── apply-refund/  # 환급 조회 및 신청
├── routes/                # 라우팅 설정
├── stores/                # Zustand 상태 관리 스토어
├── types/                 # TypeScript 타입 정의
├── utils/                 # 유틸리티 함수
├── env-config.ts          # 환경 설정 (Google Maps, GA, API URL)
├── app.tsx                # 메인 앱 컴포넌트
└── main.tsx               # 엔트리 포인트
```
## 레이아웃
레이아웃 컴포넌트를 사용 (src/pages/[lang]/pub/components/layouts/):
 - main_layout.tsx: 메인 레이아웃.
 - noinner_layout.tsx
 - set_layout.tsx

## header, footer
### 헤더 (src/components/layout/default/header.tsx)
 - 메뉴 노출 : 관리자 메뉴 관리에서 "노출"로 설정된 메뉴만 표시.
 - 가맹점 공지사항, 소모품 신청, 매뉴얼: ko로만 제공 
### 푸터 (src/components/layout/default/footer.tsx)
 - 메뉴 노출 : 관리자 메뉴 관리에서 "노출"로 설정된 메뉴만 표시.
 - 노출 규칙
   1. 1뎁스 : 노출 순서 1~3번째까지
   2. 2뎁스 : 노출 순서 4번째부터 표시.
 - 약관 처리: 약관 구분에 따라 페이지 분기.
## 가맹고객
 - 제한된 메뉴: 다음 메뉴는 로그인한 사용자만 접근 가능:
   1. 가맹점 공지사항
   2. 소모품 신청
   3. 매뉴얼
 - 로그인시 localStorage에 저장 : 
```javascript
   localStorage.setItem("authToken", response.data.jwtToken);
   localStorage.setItem("mbrName", response.data.mbrName);
   localStorage.setItem("mbrAddr", response.data.mbrAddr);
   localStorage.setItem("rptAuthFlag", response.data.rptAuthFlag);
   localStorage.setItem("userId", response.data.userId);
```
 - BI 리포트 권한: rptAuthFlag가 true인 사용자는 퀵메뉴 다운로드 권한 보유.
 - dev 테스트 계정 
```plain
   id: homepage1, pwd: home1234
   id: homepage2, pwd: home1234 (rptAuthFlag=true, BI 리포트 권한 보유)
```

## Tourist
 - 환급 가능 여권 정보 
```plain
   여권번호: 012345678
   국적: UTO
   성명: BANDERAS LILIAN
   생년월일: 1980-01-01
   성별: 여성
 ```
 - 테스트 전표 (dev 기준)
```plain
   505232092260, 33,333
   505232092253, 33,333
   505232092246, 33,333
   505232092239, 33,333
   505232092277, 33,333
   505232092284, 33,333
   505232092291, 33,333
   505232092308, 33,333
   505232092315, 33,333
   505232092322, 33,333
   505232092339, 33,333
   505232092346, 33,333
   505232092353, 33,333
   505232092360, 33,333
   505232092377, 33,333
   505232092384, 33,333
   505232092391, 33,333
   505232092408, 33,333
   505232092415, 33,333
   505232092422, 33,333
```
- 환급 신청 완료시 환급신청중으로 상태값이 변경되어 환급신청 테스트 전표로 사용 불가능. 위에 값들도 환급신청중인 전표가 있습니다.

## Company
 - 공지사항 : 해당 언어의 내용이 없으면 en, ko 순으로 내용 출력




