# ---------- Stage 1: Build Node backend ----------
FROM node:18-slim AS build

WORKDIR /app

# Copy package files first (cache optimization)
COPY package*.json ./

# Use mirror + install dependencies
RUN npm config set registry https://registry.npmmirror.com \
    && npm install --omit=dev


# Copy rest of the backend code
COPY . .

# Expose API port
EXPOSE 5000

# Run backend
CMD ["./wait-for-it.sh", "mysql:3306", "--", "npm", "start"]

