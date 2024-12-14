# Use a lightweight Node.js image for the build stage
FROM node:20-alpine AS builder

# Install required tools (e.g., Git) in the container
RUN apk add --no-cache git

# Set the working directory
WORKDIR /app

# Clone the repository
RUN git clone https://github.com/jaiswalk008/complete-expense-tracker.git repo

# Navigate to the client folder
WORKDIR /app/repo/client

# Install dependencies
RUN npm install

# Build the React application
RUN npm run build

# Use a lightweight Node.js image for the production environment
FROM node:20-alpine

# Install pm2 for process management
RUN npm install -g pm2

# Set working directory in Node.js
WORKDIR /app

# Copy the built files from the builder stage
COPY --from=builder /app/repo/client/build /app/build

# Install a simple static server (e.g., serve) to serve the build files
RUN npm install -g serve

# Expose the application port (adjust if needed, typically port 5000 for serve)
EXPOSE 5000

# Start the app using pm2 and serve
CMD ["pm2", "start", "serve", "--name", "client", "--", "-s", "build", "-l", "5000"]
