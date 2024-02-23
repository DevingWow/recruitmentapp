
FROM node:20

WORKDIR /usr/src/applcreate

COPY package*.json ./

RUN npm install
RUN npm install @azure/service-bus

COPY . .

RUN touch src/log.txt

CMD [ "npm", "start"]
