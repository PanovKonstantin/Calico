FROM node:latest AS server
ENV NODE_ENV server
WORKDIR /server
COPY . . 
RUN npm i
RUN npm run build