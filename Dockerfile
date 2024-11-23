# Use Node.js Alpine as the base image
FROM mcr.microsoft.com/playwright:v1.48.2-focal

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci && npx playwright install --with-deps

# Copy the rest of the application code
COPY . .

# Expose the port Vite uses
EXPOSE 8080

# For development
CMD ["npm", "run", "dev"]
