# syntax=docker/dockerfile:1.7

############################
# Build stage
############################
FROM node:22.12.0-slim AS build

WORKDIR /app

# Install dependencies using a clean, reproducible lockfile install
COPY package*.json ./
RUN npm ci

# Copy the rest of the app and build
COPY . .
RUN npm run build

############################
# Runtime stage (static hosting)
############################
FROM nginx:1.27-alpine AS runner

# Nginx config with SPA fallback to index.html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the Angular build output
COPY --from=build /app/dist/frontend-angular-Journey-Timeline /usr/share/nginx/html

EXPOSE 80

# Default command provided by nginx image
