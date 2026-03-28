# Root Dockerfile (base for all builds)

FROM node:20-alpine AS base

WORKDIR /app

# Enable corepack (important for turborepo)
RUN corepack enable

# Copy only root configs first (better caching)
COPY package.json package-lock.json turbo.json ./

# Install dependencies
RUN npm install

# Copy full repo
COPY . .

CMD ["sh"]