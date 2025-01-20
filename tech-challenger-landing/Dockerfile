FROM node:20-alpine AS builder
WORKDIR /app
COPY . . 
RUN npm install && npm run build

FROM nginx:alpine AS runner
WORKDIR /app
COPY --from=builder /app/out /usr/share/nginx/html
EXPOSE 3002
CMD ["nginx", "-g", "daemon off;"]