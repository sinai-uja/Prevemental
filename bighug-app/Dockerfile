FROM node:16.17.1 as build
WORKDIR "/app"
COPY . /app
RUN yarn
RUN yarn build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 8008
CMD ["nginx", "-g", "daemon off;"]