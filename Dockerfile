# Use official Node.js image
FROM node:16

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all project files
COPY . .

# Change to src directory where index.js exists
WORKDIR /app/src

# List files inside /app/src to verify index.js is present
RUN ls -l /app/src

# Expose port 8080 for Cloud Run
EXPOSE 8080

# Start the application
CMD ["npm", "start"]
