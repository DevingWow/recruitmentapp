
FROM node:20

WORKDIR /usr/src/applview

COPY package*.json ./

RUN npm install

COPY . .

CMD [ "npm", "start"]