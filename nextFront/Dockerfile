# 1. Node.js 환경 베이스 이미지
FROM node:20-alpine

# 2. 작업 디렉토리 설정
WORKDIR /app

# 3. 의존성 파일 복사 및 설치
COPY package*.json ./
RUN npm install

# 4. 소스 코드 복사 및 빌드
COPY . .
RUN npm run build

# 5. 서버 실행 (포트 3000)
EXPOSE 3000
CMD ["npm", "start"]