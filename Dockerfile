FROM node:10

WORKDIR /var/app

COPY . .

RUN yarn install

EXPOSE 8000

CMD [ "yarn", "start" ]
