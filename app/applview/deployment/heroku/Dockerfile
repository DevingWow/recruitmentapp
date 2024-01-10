
FROM node:20

WORKDIR /usr/src/applview

COPY package*.json ./

RUN echo "RUNNING APPLVIEW DOCKERFILE"

RUN npm install

COPY . .

CMD [ "npm", "start"]