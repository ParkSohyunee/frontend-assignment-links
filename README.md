## 프로젝트 설명
이 프로젝트는 사용자가 자주 방문하는 웹사이트 링크를 저장하고, 카테고리별로 정리하여 관리할 수 있는 웹 애플리케이션입니다. 
이를 통해 팀원 간 웹 링크를 공유하고, 읽기/쓰기 권한을 설정하여 협업 할 수 있습니다. React와 NestJS를 사용하여 프론트엔드와 백엔드를 개발했으며, TypeORM을 활용하여 MySQL과 연동합니다.

## 실행 방법

### 1. 프로젝트 클론
```
git clone https://github.com/ParkSohyunee/frontend-assignment-links.git
```

### 2. .env 파일을 frontend, server 폴더에 각각 추가
### (1) server 폴더 .env
```
# DB 정보를 넣어주세요.
DB_HOST=""
DB_USER=""
DB_PASSWORD=""
DB_PORT=
DB_DATABASE=""

# JWT 시크릿키 정보를 넣어주세요.
JWT_SECRET=
JWT_EXPIRES_IN_AT=30m
JWT_EXPIRES_IN_RT=7d
```
### (2) frontend 폴더 .env
```
# Domain
VITE_SERVER_DOMAIN='http://localhost:3000'
```

### 3. 백엔드 서버 실행
```
cd server
npm install
npm run start:dev

// 접속
http://localhost:3000
```

### 4. 프론트엔드 서버 실행
```
cd frontend
npm install
npm run dev

// 접속
http://localhost:5173 
```

### 5. sql 폴더 DDL문 실행
```
sql 폴더 DDL문을 실행해주세요.
(참고) TypeORM을 활용하여 MySQL과 연동하므로 초기 카테고리 데이터 삽입은 sql문 실행이 필요합니다.
```

## 폴더 구조
```
📦 프로젝트 폴더
├── 📂 frontend
│ ├── 📂 src
│ │ ├── 📂 api
│ │ ├── 📂 components
│ │ ├── 📂 constants
│ │ ├── 📂 hooks
│ │ ├── 📂 libs
│ │ ├── 📂 pages
│ │ ├── 📂 types
│ │ ├── 📂 utils
│ │ ├── 📄 App.tsx
│ │ ├── 📄 index.css
│ │ ├── 📄 main.tsx
│ ├── 📄 .env
├── 📂 server
│ ├── 📂 src
│ │ ├── 📂 auth
│ │ ├── 📂 category
│ │ ├── 📂 link
│ │ ├── 📂 shared-link
│ │ ├── 📄 app.module.ts
│ │ ├── 📄 main.ts
│ ├── 📄 .env
├── 📂 sql
│ ├── 📄 insert_category.sql
```

## 기술 스택 및 선택 이유
### 프론트엔드
- **React**: 컴포넌트 기반 UI 개발을 위해 사용
- **Tailwind CSS**: 유틸리티 클래스를 사용하여, 빠르고 효율적인 스타일링을 위해 선택
- **TypeScript**: 안정적인 코드 작성 및 가독성 향상을 위해 사용
### 백엔드
- **NestJS**: 모듈화된 구조로 유지보수 용이
- **TypeORM**: 데이터베이스 연동을 쉽게 하기 위해 선택
- **MySQL**: 관계형 데이터베이스 관리에 적합하므로 선택

## 설치한 주요 라이브러리
### 프론트엔드
- @tanstack/react-query: 서버 상태관리 라이브러리
- axios: HTTP 요청을 위한 라이브러리
- react-router-dom: 라우팅 라이브러리
- react-cookie: jwt토큰 저장 및 관리를 위해 선택
### 백엔드
- @nestjs/jwt: JWT 인증 관리
- bcryptjs: 비밀번호 해싱 암호화 및 보안 강화
- class-validator & class-transformer: DTO 유효성 검사 및 변환
- dotenv: 환경 변수 관리
- typeorm: MySQL과의 ORM 연동

## 주요 기능
- [x] **회원가입/로그인**
- [x] **로그아웃**
- [x] **링크 CRUD**: 웹 링크 추가, 수정, 삭제
- [x] **공유 및 권한 관리**: 링크를 다른 사용자와 공유하고, 접근 권한(읽기/쓰기) 설정
- [x] **검색 및 필터**: 키워드 검색(like 검색) 및 카테고리별 필터링
- [x] **JWT 토큰 기반 인증 방식 사용**
- [x] **권한 체크를 통한 인가 처리**

## 시연 영상
### 회원가입, 로그인
![회원가입, 로그인](https://github.com/user-attachments/assets/72a5bf38-20bf-466e-abf9-91cd21c95a20)

### 링크 생성
![링크 생성](https://github.com/user-attachments/assets/d5c54b31-55c0-4828-b5da-ca0b78904267)

### 링크 수정, 삭제
![링크 수정, 삭제](https://github.com/user-attachments/assets/53cb8473-7302-420a-b4f9-561c94d5d0d7)

### 카테고리 필터링, 링크 검색
![카테고리 필터링, 링크 검색](https://github.com/user-attachments/assets/1a81f086-e7b3-4e2e-933f-657dc2c547da)

### 링크 공유하기
#### 공유하기 플로우
![Feb-23-2025 10-49-32](https://github.com/user-attachments/assets/a09ad081-54ee-4a14-9758-65078ee9886d)

#### 공유받은 사용자 링크 수정 플로우
![Feb-23-2025 10-50-31](https://github.com/user-attachments/assets/458042f1-2bbf-49cd-a7f3-226f1898a33c)
