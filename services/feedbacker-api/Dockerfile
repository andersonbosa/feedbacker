FROM node:18-alpine

WORKDIR /var/www/app

COPY . .
# RUN npm install --only=production --silent
RUN npm install

# EXPOSE 3000

CMD [ "npm" , "run", "dev"]
# CMD [ "npm", "run", "start"]

