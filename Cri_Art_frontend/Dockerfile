# pull official base image
FROM node:14.17-alpine AS build-stage
WORKDIR ./app
COPY . .
RUN npm install
RUN npm run build

FROM nginx:1.20.0
COPY default.conf.template /etc/nginx/conf.d/default.conf.template
ARG BACKEND_ADDRESS
ENV BACKEND_ADDRESS ${BACKEND_ADDRESS}
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=build-stage /app/build .

CMD /bin/bash -c "envsubst '\$PORT:\$BACKEND_ADDRESS' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf" && nginx -g 'daemon off;'