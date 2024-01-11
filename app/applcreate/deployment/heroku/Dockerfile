
FROM node:20

WORKDIR /usr/src/applcreate

COPY package*.json ./

RUN npm install

COPY . .

RUN touch src/log.txt

CMD [ "npm", "start"]