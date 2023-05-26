FROM node:latest AS client
ENV NODE_ENV client
WORKDIR /client
COPY . . 
RUN npm i
RUN npm i -g serve
RUN npm run build

# FROM httpd:alpine
# WORKDIR /var/www/html
# COPY --from=build /build/build/ .