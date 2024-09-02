FROM node:12-alpine as build-step

RUN mkdir -p /app

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

RUN npm run build --prod

FROM nginx:1.17.1-alpine

COPY --from=build-step /app/dist/nasa-technical-test /usr/share/nginx/html

#ejecutar para descargar imagen(https://hub.docker.com/repository/docker/zkato/asa-frontend-angular-test/general)
#docker pull zkato/asa-frontend-angular-test:1.3

#ejecutar para iniciar contenedor
#docker run --name asa-frontend-angular-test-container -d -p 8080:80 zkato/asa-frontend-angular-test:1.3

#url
#http://localhost:8080/
