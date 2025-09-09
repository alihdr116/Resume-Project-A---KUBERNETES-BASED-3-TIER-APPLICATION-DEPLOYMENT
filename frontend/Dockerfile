# ---------- Stage 1: Build React app ----------
FROM node:18-slim AS build

WORKDIR /app

# Copy package files first (cache optimization)
COPY package*.json ./

# Use mirror + install dependencies
RUN npm config set registry https://registry.npmmirror.com \
    && npm install --omit=dev


# Copy rest of the frontend code
COPY . .

# Build React static files
RUN npm run build

# ---------- Stage 2: Serve with Nginx ----------
FROM nginx:1.25-alpine

COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
