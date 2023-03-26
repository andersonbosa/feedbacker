FROM node:18-alpine

WORKDIR /api

COPY . .
# RUN npm install --only=production --silent
RUN npm install

# EXPOSE 3000

CMD [ "npm" , "run", "dev"]
# CMD [ "npm", "run", "start"]

