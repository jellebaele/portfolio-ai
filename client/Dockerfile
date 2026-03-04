# ---------- Stage 1: Build ----------

FROM node:25-alpine3.22 AS builder

WORKDIR /app

ARG VITE_BASE_URL_CHAT_API
ENV VITE_BASE_URL_CHAT_API=$VITE_BASE_URL_CHAT_API

# Copy dependency files first (better caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of project
COPY . .

# Build Vite app
RUN npm run build


# ---------- Stage 2: Production ----------
FROM nginx:alpine

# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf

COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built app
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]