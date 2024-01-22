# Santé (습관 기반 건강관리 웹앱)

## 목차

1. 개요
2. 기능
3. 기술스택
4. 사용법
5. 향후계획

## 개요

### 목표
운동과 식단을 관리할 수 있고 이를 눈에 보이는 수치로 보여줄 수 있는 웹 어플리케이션 개발을 목표로 합니다.

### 주요 장점
목표를 세워도 뚜렷하게 눈에 보이는 결과가 없으면 지속하기 힘든 점에서 착안한 목표를 습관화해 눈에 보이는 수치로 보여주면서 관리할 수 있는 건강 관리 웹앱입니다.

## 기능
### 회원서비스
로그인과 회원가입이 있고 각 파트의 유효성을 검사

![sante-login](https://github.com/ChoiYeoJin/Sante/assets/17807025/417fa4d5-fdb5-467d-b818-38c62db1c50e)
![sante-register](https://github.com/ChoiYeoJin/Sante/assets/17807025/d8032579-5403-46bb-bc7a-3b6d5ce6b6f7)

### 메인
- 등록한 운동과 식단을 컬러칩으로 간단하게 한 달치를 확인할 수 있는 캘린더
- 운동과 식단을 일자별로 관리할 수 있는 카드
- 주간 달성률을 알려주는 주간 통계

![sante-main](https://github.com/ChoiYeoJin/Sante/assets/17807025/62cde3db-aebc-41d2-a5eb-440772c3a747)

### 운동/식단 관리
자유롭게 커스텀할 수 있는 운동과 식단 추가

![sante-ex](https://github.com/ChoiYeoJin/Sante/assets/17807025/89115cfc-fed5-4991-8be0-c6f825a5cf12)
![sante-food](https://github.com/ChoiYeoJin/Sante/assets/17807025/1e3d23bf-b33f-44fe-ae74-1120f0063c23)

### 한 눈에 보기
한 달 단위로 한 눈에 조회하고 수정할 수 있는 리스트 페이지

![sante-list](https://github.com/ChoiYeoJin/Sante/assets/17807025/c0850193-97fc-41c2-9c3c-9622eb4419dc)
### 수치로 확인
목표 달성을 위해 월간 데이터를 그래프를 통해 가시적으로 표시

![sante-st](https://github.com/ChoiYeoJin/Sante/assets/17807025/bc19da0e-d79e-4c00-b6b7-77f755a1524d)
### 모바일 접근성
반응형으로 처리하여 습관관리를 위해 어디서든 접근할 수 있도록 개발

![m1](https://github.com/ChoiYeoJin/Sante/assets/17807025/58bf8951-641b-4d54-add5-54c88e63b4c7)
![m2](https://github.com/ChoiYeoJin/Sante/assets/17807025/6f8fba0d-e35b-49db-b669-462378a18a93)
![m3](https://github.com/ChoiYeoJin/Sante/assets/17807025/f4926776-0ae1-4070-9087-5367cb9aca0c)

## 기술스택

### 프론트엔드
<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=black">
<img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white">
<img src="https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=Prettier&logoColor=black">
<img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=Axios&logoColor=white">
<img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=Vite&logoColor=white">
<img src="https://img.shields.io/badge/date-fns-770C56?style=for-the-badge&logo=date-fns&logoColor=white">
<img src="https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=EsLint&logoColor=white">
<img src="https://img.shields.io/badge/styled-components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white">
<img src="https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=Figma&logoColor=white">
<img src="https://img.shields.io/badge/Jira-0052CC?style=for-the-badge&logo=Jira&logoColor=white">
Zustand

### 백엔드
<img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=MONGODB&logoColor=white">
<img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white">
<img src="https://img.shields.io/badge/express-000000?style=for-the-badge&logo=express&logoColor=white">


## 사용법

### 로컬에서 사용하기
프로젝트를 사용하기에 앞서 `git`과 `npm`이 설치되어 있어야 합니다.
#### 클론
```
git clone https://kdt-gitlab.elice.io/sw_track/class_07/web_project_2/team4/frontend/sante.git
```
#### 패키지 설치
```
npm install
```
#### 실행
```
npm run dev
```
### 배포사이트 이용하기
#### 사이트 주소
```
http://kdt-sw-7-team04.elicecoding.com/
```
#### 테스트 계정
```
email : person@gmail.com
pw : as1234!@
```

## 향후계획

- PWA를 통한 앱 배포
