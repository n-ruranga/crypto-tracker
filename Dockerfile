# Use Node base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and install deps
COPY package*.json ./
RUN npm install

# Copy the rest of the code
COPY . .

# Expose port
EXPOSE 80

# Start the app
CMD ["node", "server.js"]
