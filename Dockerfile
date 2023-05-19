FROM node:16-alpine

WORKDIR /build

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

RUN npm run build

CMD ["serve", "-s", "build"]
