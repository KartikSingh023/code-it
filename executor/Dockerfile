FROM node:14-alpine

WORKDIR /executor

RUN apk add python3

RUN apk add g++

ENV NODE_ENV=production

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production

COPY . .

CMD ["node", "app.js"]