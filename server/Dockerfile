FROM node:14

ENV NODE_ENV=production

WORKDIR /server

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production

COPY . .

CMD [ "node", "app.js" ]