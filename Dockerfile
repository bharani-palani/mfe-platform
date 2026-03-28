FROM node:20-alpine as builder

# Set working directory
# WORKDIR /app

# Copy package files first (better caching)
COPY package.json package-lock.json turbo.json ./

# Install dependencies
RUN npm install --force
RUN npx turbo run build

# Copy rest of the app
# COPY . .
COPY --from=builder /app ./

# Expose Vite port
EXPOSE 3000

# Run Vite dev server
CMD ["npm", "run", "preview"]