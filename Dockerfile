FROM node:10

WORKDIR /usr/src/app

COPY . .

RUN npm install

EXPOSE 8012

CMD [ "node", "index.js" ]

