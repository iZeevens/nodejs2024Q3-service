FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 4000

FROM base as dev
CMD ["npm", "run", "start:dev"]

FROM base as prod
RUN npm run build
CMD ["npm", "run", "start:prod"]
