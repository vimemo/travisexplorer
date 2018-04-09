FROM node:slim

WORKDIR /usr/app

COPY package.json .
RUN yarn --quiet

COPY . .
EXPOSE 3000

CMD ["yarn", "dev"]
