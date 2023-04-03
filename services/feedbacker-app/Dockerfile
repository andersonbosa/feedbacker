FROM node:18-alpine

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose port 8080
EXPOSE 8080

# Set the entrypoint to run the app with npm
ENTRYPOINT ["npm", "run", "dev"]
