FROM node:22-alpine

# Set working directory
WORKDIR /app

# Set default NODE_ENV, allow override via --build-arg or env
ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV

# Install dependencies
COPY package*.json ./
RUN if [ "$NODE_ENV" = "development" ]; then npm install; else npm install --omit=dev; fi

# Copy the full source
COPY . .

# Build the app
RUN npm run build

# Expose API port
EXPOSE 3000

# Start the correct command based on the NODE_ENV
CMD ["/bin/sh", "-c", "if [ \"$NODE_ENV\" = 'development' ]; then npm run start:dev; else npm run start:prod; fi"]
