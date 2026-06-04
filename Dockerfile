# Stage 1: Build
FROM node:24-alpine AS build-stage

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npx quarkup m -o ./src/data/articles -m main.md ./articles

RUN npm run build

# Stage 2: Serve
FROM nginx:alpine
COPY --from=build-stage /app/build/client /usr/share/nginx/html
# fix SPA redirecting
RUN sed -i 's/index  index.html index.htm;/index  index.html index.htm; try_files $uri $uri\/ \/index.html;/' /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
