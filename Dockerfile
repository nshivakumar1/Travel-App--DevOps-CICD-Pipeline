# Build stage
FROM node:18-alpine AS builder

# Install Trivy
RUN apk add --no-cache wget tar && \
    wget https://github.com/aquasecurity/trivy/releases/download/v0.45.0/trivy_0.45.0_Linux-ARM64.tar.gz && \
    tar -xzf trivy_0.45.0_Linux-ARM64.tar.gz && \
    mv trivy /usr/local/bin/ && \
    rm trivy_0.45.0_Linux-ARM64.tar.gz && \
    apk del wget tar

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM nginx:alpine

# Install Trivy
RUN apk add --no-cache wget tar && \
    wget https://github.com/aquasecurity/trivy/releases/download/v0.45.0/trivy_0.45.0_Linux-ARM64.tar.gz && \
    tar -xzf trivy_0.45.0_Linux-ARM64.tar.gz && \
    mv trivy /usr/local/bin/ && \
    rm trivy_0.45.0_Linux-ARM64.tar.gz && \
    apk del wget tar

# Copy built assets from builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s \
    CMD wget --quiet --tries=1 --spider http://localhost:80/ || exit 1

# Run as non-root user
USER nginx 