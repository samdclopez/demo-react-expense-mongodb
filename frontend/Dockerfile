FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install && npm i -g serve

COPY . .

RUN npm run build

EXPOSE 3002

CMD ["serve", "-s", "dist", "-l", "3002"]
