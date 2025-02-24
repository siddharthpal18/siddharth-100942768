# Use an official Node.js runtime as the base image
FROM node:16

# Set the working directory in the container
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json .
RUN npm install

# Copy the application files
COPY . .

# Expose port 8080
EXPOSE 8080

# Start the application
CMD ["npm", "start"]
