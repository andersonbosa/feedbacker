FROM node:14-alpine

RUN mkdir -p /src
COPY package.json src/package.json
WORKDIR /src
RUN yarn --only=production --silent
COPY . /src

CMD yarn start
