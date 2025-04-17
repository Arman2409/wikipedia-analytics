# Start with the lightweight Alpine image
FROM oven/bun:latest

# Set the working directory
WORKDIR /app

# Copy your application files
COPY . .

# Install project dependencies using Bun
RUN bun install

# Run the application
CMD ["bun", "server.ts"]
