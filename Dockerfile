# Step 1: Build stage
FROM node:22-alpine3.18 AS build

WORKDIR /app

COPY package*.json ./

RUN npm install && npm cache clean --force

COPY . .

RUN npm run build

FROM node:22-alpine3.18 AS production

WORKDIR /app

COPY package*.json ./

RUN npm install --omit=dev && npm cache clean --force

COPY --from=build /app/dist ./dist

EXPOSE 4000

CMD ["sh", "-c", "npm run migration:run && npm run start:prod"]
