FROM node:18-alpine

WORKDIR /app


COPY . .
RUN npm install
RUN npm run postinstall


# ENV PORT=8080
# EXPOSE 8080


CMD ["npm", "run", "dev"]
