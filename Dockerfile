# Stage 1: Build
FROM node:24-alpine AS build-stage

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npx quarkup m -o ./src/data/articles -m main.md ./articles

RUN npm run build

# Stage 2: Serve
FROM node:24-alpine AS serve-stage

WORKDIR /app

COPY --from=build-stage /app/build ./build

COPY package*.json ./
RUN npm install --omit=dev

ENV PORT=3000

EXPOSE 3000
CMD ["npx", "react-router-serve", "./build/server/index.js"]
