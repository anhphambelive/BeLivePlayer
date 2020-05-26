# build stage
FROM node:lts-alpine as build-stage
WORKDIR /app
COPY /dist ./dist

# production stage
FROM nginx:stable-alpine as production-stage
COPY /docker/conf.d /etc/nginx/conf.d
COPY --from=build-stage /app/dist /app/sdk/dist
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]