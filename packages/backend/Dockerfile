FROM node:14.16.0-alpine
RUN mkdir -p /src
COPY package.json src/package.json
WORKDIR /src
RUN npm install --only=production --silent
COPY . /src
EXPOSE 3000
CMD ["npm", "start"]
