WORKDIR /app

COPY package.json

COPY . ./
run npm install

EXPOSE 3000

CMD ["npm", "start"]
