FROM daocloud.io/library/node:12.16.2-alpine as builder
WORKDIR /usr/src/app
ADD package-lock.json /usr/src/app
RUN npm ci
ADD . /usr/src/app
RUN npm run build

FROM daocloud.io/library/nginx:1.13.0-alpine
COPY --from=builder /usr/src/app/dist/ /usr/share/nginx/html/