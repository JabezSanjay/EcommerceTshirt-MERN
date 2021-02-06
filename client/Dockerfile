
FROM node:14-slim

WORKDIR /usr/src/app

COPY ./package.json ./
COPY ./yarn.lock ./

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]