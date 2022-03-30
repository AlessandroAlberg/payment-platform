FROM node:alpine

WORKDIR /usr/app

COPY package.json yarn.lock tsconfig.json tsconfig.build.json ./

COPY src/ src/

RUN yarn

COPY . ./

RUN yarn build