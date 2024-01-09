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

![sante-login](/uploads/a3b23521a7dbe3fef496ffd4aad74741/sante-login.png)
![sante-register](/uploads/687b3f2d0818ee8b45395d299bc0b5f8/sante-register.png)

### 메인
- 등록한 운동과 식단을 컬러칩으로 간단하게 한 달치를 확인할 수 있는 캘린더
- 운동과 식단을 일자별로 관리할 수 있는 카드
- 주간 달성률을 알려주는 주간 통계

![sante-main](/uploads/1296f2b681dd5b5edcffdf17d7700fea/sante-main.png)
### 운동/식단 관리
자유롭게 커스텀할 수 있는 운동과 식단 추가

![sante-ex](/uploads/041dad9c767be5a98d887a1f3dc26e13/sante-ex.png)

![sante-food](/uploads/f4d9dc775a964f6b72fa65dbc0e1758e/sante-food.png)
### 한 눈에 보기
한 달 단위로 한 눈에 조회하고 수정할 수 있는 리스트 페이지

![sante-list](/uploads/ed1984c8364e0896a458dbf177d457b2/sante-list.png)
### 수치로 확인
목표 달성을 위해 월간 데이터를 그래프를 통해 가시적으로 표시

![sante-st](/uploads/bd44e26e92aa9cbbe8f95af9571896c4/sante-st.png)
### 모바일 접근성
반응형으로 처리하여 습관관리를 위해 어디서든 접근할 수 있도록 개발

![m1](/uploads/a167a38da668f0cea9178aaf377518ef/m1.png)

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
