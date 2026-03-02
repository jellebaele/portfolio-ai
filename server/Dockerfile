# ---------- Stage 1: Build ----------
FROM node:25-alpine3.22 AS builder

WORKDIR /app

# Copy dependency files first (better layer caching)
COPY package*.json ./

# Install ALL dependencies (including devDeps for TypeScript)
RUN npm install

# Copy rest of the project
COPY . .

# Build TypeScript → dist/
RUN npm run build


# ---------- Stage 2: Production ----------
FROM node:25-alpine3.22

WORKDIR /app

# Copy only production dependencies
COPY package*.json ./
RUN npm install --omit=dev

# Copy compiled output from builder
COPY --from=builder /app/dist ./dist

# Expose API port
EXPOSE 5000

# Start the app
CMD ["node", "dist/index.js"]