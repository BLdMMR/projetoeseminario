# pull official base image
FROM node:13.12.0-alpine AS build-stage
WORKDIR ./app
COPY . .
RUN npm install
RUN npm run build

FROM nginx:1.20.0
COPY /cri_art_website_nginx.conf /etc/nginx/conf.d/cri_art_website_nginx.conf
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=build-stage /app/build .

CMD /bin/bash -c "envsubst '\$PORT' < /etc/nginx/conf.d/cri_art_website_nginx.conf > /etc/nginx/conf.d/cri_art_website_nginx.conf" && nginx -g 'daemon off;'