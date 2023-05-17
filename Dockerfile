FROM node:16-alpine

WORKDIR /Frontend

COPY package.json

RUN npm install

COPY . /app

RUN npm run build

CMD ["serve", "-s", "build"]
