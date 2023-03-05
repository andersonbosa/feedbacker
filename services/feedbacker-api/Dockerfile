FROM node:18-alpine

RUN mkdir -p /app

COPY ./package.json /app/package.json
COPY . /app

WORKDIR /app

RUN npm install --only=production --silent
CMD npm start
