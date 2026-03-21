# Frontend build stage
FROM node:24.2.0-alpine AS frontend-build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# Backend production stage with nginx
FROM nginx:alpine AS frontend-production
COPY --from=frontend-build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]