# pull official base image
FROM node:13.12.0-alpine AS build-stage

WORKDIR ./app
COPY . .
RUN npm install serve --s
RUN npm run build

FROM nginx:1.19.10-alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=build-stage /app/build .
CMD ["nginx", "-g", "daemon off;"]
