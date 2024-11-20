# Use Node.js Alpine as the base image
FROM node:lts-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application code
COPY . .

# Expose the port Vite uses
EXPOSE 8080

# For development
CMD ["npm", "run", "dev"]
