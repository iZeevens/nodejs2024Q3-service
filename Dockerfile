FROM node:22-alpine3.18

WORKDIR /app

COPY package*.json ./
RUN npm ci --production && npm cache clean --force

COPY . .

RUN npm run build

EXPOSE 4000

CMD ["sh", "-c", "npm run migration:run && npm run start:dev"]
