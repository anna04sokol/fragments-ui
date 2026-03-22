# Frontend build stage
FROM node:24.2.0-alpine AS frontend-build
WORKDIR /app
ARG AWS_COGNITO_POOL_ID
ARG AWS_COGNITO_CLIENT_ID
ARG OAUTH_SIGN_IN_REDIRECT_URL
ARG API_URL

RUN printf "AWS_COGNITO_POOL_ID=%s\nAWS_COGNITO_CLIENT_ID=%s\nOAUTH_SIGN_IN_REDIRECT_URL=%s\nAPI_URL=%s\n" "$AWS_COGNITO_POOL_ID" "$AWS_COGNITO_CLIENT_ID" "$OAUTH_SIGN_IN_REDIRECT_URL" "$API_URL" > .env
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# Backend production stage with nginx
FROM nginx:alpine AS frontend-production
RUN rm -rf /usr/share/nginx/html/* && mkdir -p /usr/share/nginx/html
COPY --from=frontend-build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]