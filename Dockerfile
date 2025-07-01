FROM node:22.14.0-alpine3.21@sha256:9bef0ef1e268f60627da9ba7d7605e8831d5b56ad07487d24d1aa386336d1944
WORKDIR /app
COPY package.json package-lock.json ./
RUN ls -la /app
RUN npm install
COPY . .
RUN chmod +x ./run_tests.sh 
CMD ["sh"]
