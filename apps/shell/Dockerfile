FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files first (better caching)
COPY package.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy rest of the app
COPY . .

# Expose Vite port
EXPOSE 4002

# Run Vite dev server
CMD ["npm", "run", "dev"]