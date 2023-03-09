FROM node:18-alpine

WORKDIR /var/www/app


COPY . .
RUN npm install --only=production --silent


ENV PORT=8080
EXPOSE 8080


# CMD [ "npm" , "run", "dev"]
CMD [ "npm", "run", "start"]

