FROM node:20-alpine
WORKDIR /usr/src/app
# Copy root package.json and lockfile
COPY package.json ./
# Copy the api package.json
# COPY apps/shell/package.json ./apps/shell/package.json
RUN npm install -g vite turbo
RUN npm install --force
# Copy app source
COPY . .
# EXPOSE 4000
CMD ["vite", "preview", "--port", "4000", "--host", "0.0.0.0"]