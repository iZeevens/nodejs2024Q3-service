FROM node:22-alpine AS base

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 4000

FROM base AS dev
CMD ["npm", "run", "start:dev"]

FROM base AS prod
RUN npm run build
CMD ["npm", "run", "start:prod"]
