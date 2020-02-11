FROM node:13 AS build

WORKDIR /app

# Install app dependencies
COPY package.json package-lock.json ./

RUN npm ci

# Bundle app source
COPY . .

RUN npm run build:local


FROM nginx:1.16.1-alpine

# copy artifact build from the 'build environment'
COPY --from=build /app/dist/rvm /usr/share/nginx/html

EXPOSE 80
