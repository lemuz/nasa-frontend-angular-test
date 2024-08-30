FROM node:12-alpine as build-step

RUN mkdir -p /app

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

RUN npm run build --prod

FROM nginx:1.17.1-alpine

COPY --from=build-step /app/dist/nasa-technical-test /usr/share/nginx/html

#ejecutar luego de compilar imagen
#docker build -t asa-frontend-angular-test . 
#docker run --name asa-frontend-angular-test-container -d -p 8080:80 asa-frontend-angular-test