FROM node:14-alpine
WORKDIR /usr/src/app

COPY ./package.json ./
COPY ./package-lock.json ./

RUN npm install

COPY . .

EXPOSE 8000

CMD [ "app.js" ]