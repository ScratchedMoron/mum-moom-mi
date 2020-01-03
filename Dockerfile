FROM node:10

WORKDIR /usr/src/app

COPY . .

RUN npm install

EXPOSE 8011

CMD [ "node", "index.js" ]

