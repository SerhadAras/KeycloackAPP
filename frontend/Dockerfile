FROM node:latest as build
WORKDIR /usr/local/app
COPY ./ /usr/local/app/
RUN npm install
RUN npm run build
WORKDIR /usr/local/app/dist
FROM nginx:latest
COPY --from=build /usr/local/app/dist/frontend /usr/share/nginx/html
COPY /default.conf  /etc/nginx/conf.d/default.conf
EXPOSE 80



