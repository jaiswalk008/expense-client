# Use a lightweight Node.js image for the build stage
FROM node:20-alpine AS builder

# Install required tools (e.g., Git) in the container
RUN apk add --no-cache git

# Set the working directory
WORKDIR /app

# Clone the repository
RUN git clone https://github.com/jaiswalk008/expense-client.git repo

# Navigate to the root of the repo
WORKDIR /app/repo

# Install dependencies
RUN npm install

# Build the React application
RUN npm run build

# Use a lightweight Node.js image for the production environment
FROM node:20-alpine

# Install pm2 for process management and serve for static file serving
RUN npm install -g pm2 serve

# Set working directory in Node.js
WORKDIR /app

# Copy the built files from the builder stage
COPY --from=builder /app/repo/build /app/build

# Set environment variables to bind to all network interfaces and set the port
ENV HOST=0.0.0.0 PORT=3000

# Expose the application port
EXPOSE ${PORT}

# Start the app using serve to serve the static files
CMD ["serve", "-s", "build", "-l", "3000"]
